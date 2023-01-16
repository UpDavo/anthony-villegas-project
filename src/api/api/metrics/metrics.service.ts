import { Injectable } from '@nestjs/common';
import { ResponseValidation } from '../../dto/metrics_rows.model';
import { EmulatedService } from '../emulated/emulated.service';
import * as json2csv from 'json2csv';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { repository } from '../../entities/repository.entity';

@Injectable()
export class MetricsService {
  constructor(
    private EmulatedService: EmulatedService,
    @InjectRepository(repository)
    private readonly repositoryRepository: Repository<repository>,
  ) {}

  //Get Repositories per tribe
  async get_metrics_per_repo_per_tribe(id_tribe: number) {
    // const current_year = new Date().getFullYear();

    const response = await this.repositoryRepository
      .createQueryBuilder('r')
      .select('r.id_repository', 'id')
      .addSelect('r.name', 'name')
      .addSelect('t.name', 'tribe')
      .addSelect('o.name', 'organization')
      .addSelect('m.coverage', 'coverage')
      .addSelect('m.code_smells', 'codeSmells')
      .addSelect('m.bugs', 'bugs')
      .addSelect('m.vulnerabilities', 'vulnerabilities')
      .addSelect('m.hotspot', 'hotspot')
      .addSelect('r.state', 'state')
      .innerJoin('tribe', 't', 'r.id_tribe = t.id_tribe')
      .innerJoin('metric', 'm', 'r.id_repository = m.id_repository')
      .innerJoin('organization', 'o', 'o.id_organization = t.id_organization')
      .where('r.id_tribe = ' + id_tribe + '')
      .andWhere("r.state = 'E'")
      .getRawMany();

    const general_status: object = await this.EmulatedService.getData();

    return [response, general_status];
  }

  //Format the response per tribe
  format_response(response: any, general_status: any): ResponseValidation {
    if (response.length !== 0) {
      const formated_response = [];
      let verificationState: string;

      response.forEach((row: any) => {
        const temp = row;
        const verificationStateObject = general_status.repositories.find(
          (item) => item.id == parseInt(row.id),
        );

        switch (verificationStateObject.state) {
          case 604:
            verificationState = 'Verificado';
            break;
          case 605:
            verificationState = 'En espera';
            break;
          case 606:
            verificationState = 'Aprobado';
            break;
          default:
            verificationState = 'Sin Verificación';
        }

        switch (row.state) {
          case 'E':
            temp.state = 'Habilitado';
            break;
          case 'D':
            temp.state = 'Desactivado';
            break;
          case 'A':
            temp.state = 'Archivado';
            break;
          default:
            temp.state = 'Sin Verificación';
        }
        temp.verificationState = verificationState;
        temp.coverage = row.coverage + '%';
        if (parseInt(row.coverage) >= 75) {
          formated_response.push(temp);
        }
      });

      return formated_response.length == 0
        ? {
            response: { repositories: [] },
            validation: {
              error: true,
              description:
                'La Tribu no tiene repositorios que cumplan con la cobertura necesaria',
            },
          }
        : {
            response: { repositories: formated_response },
            validation: {
              error: false,
              description: '',
            },
          };
    } else {
      return {
        response: { repositories: [] },
        validation: {
          error: true,
          description: 'La Tribu no se encuentra registrada',
        },
      };
    }
  }

  createCsv(data: any) {
    try {
      const fields = Object.keys(data.repositories[0]);
      const opts = { fields };
      const csv = json2csv.parse(data.repositories, opts);
      return csv;
    } catch (err) {
      console.error(err);
      return err;
    }
  }
}
