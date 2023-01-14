import { Injectable } from '@nestjs/common';
import { ConnectionService } from '../../../common/connection.service';
import { MetricsRows } from '../../dto/metrics_rows.model';
import { EmulatedService } from '../emulated/emulated.service';
import * as json2csv from 'json2csv';

@Injectable()
export class MetricsService {
  constructor(
    private ConnectionService: ConnectionService,
    private EmulatedService: EmulatedService,
  ) {}

  //Get Repositories per tribe
  async get_metrics_per_repo_per_tribe(id_tribe: number) {
    const current_year = new Date().getFullYear();
    const query = `
    SELECT 
      repository.id_repository as id, 
      repository.name as name, 
      tribe.name as tribe, 
      organization.name as organization, 
      metrics.coverage as coverage, 
      metrics.code_smells as codeSmells, 
      metrics.bugs as bugs, 
      metrics.vulnerabilities as vulnerabilities, 
      metrics.hotspot as hotspot, 
      repository.state as state 
    FROM 
      repository 
      INNER JOIN tribe ON repository.id_tribe = tribe.id_tribe 
      INNER JOIN metrics ON repository.id_repository = metrics.id_repository 
      INNER JOIN organization ON organization.id_organization = tribe.id_organization 
    WHERE 
      repository.id_tribe = ${id_tribe} 
      AND EXTRACT(
        year 
        FROM 
          repository.create_time
      ) = ${current_year} 
      AND repository.state = 'E'
    `;
    const response: any = await this.ConnectionService.execute_query(query);
    const general_status: object = await this.EmulatedService.getData();

    return this.format_response(response.rows, general_status);
  }

  //Format the response per tribe
  format_response(response: Array<MetricsRows>, general_status: any) {
    if (response.length !== 0) {
      const formated_response = <any>[];
      let verificationState: string;
      response.forEach((row: MetricsRows) => {
        const temp: any = row;
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
        ? 'La Tribu no tiene repositorios que cumplan con la cobertura necesaria'
        : { repositories: formated_response };
    } else {
      return 'La Tribu no se encuentra registrada';
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
