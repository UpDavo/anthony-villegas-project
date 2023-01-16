import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { organization } from '../../entities/organization.entity';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(organization)
    private readonly organizationRepository: Repository<organization>,
  ) {}

  //Get all organizations
  async get_organizations(): Promise<organization[]> {
    const response: organization[] = await this.organizationRepository.find();
    return response;
  }

  //Set a row in organizations
  async set_organization_row(name: string, status: string) {
    const response: organization = await this.organizationRepository.create({
      name,
      status,
    });
    return this.organizationRepository.save(response);
  }

  //Update a row in organizations
  async update_organization_row(
    id_organization: number,
    name: string,
    status: string,
  ) {
    const response: organization = await this.organizationRepository.preload({
      id_organization,
      name,
      status,
    });

    if (!response) {
      throw new NotFoundException('Organization not found');
    }

    return response;
  }

  //Delete a row in organizations by id
  async delete_organization_row(id: number): Promise<void> {
    const response: organization = await this.organizationRepository.findOne({
      where: { id_organization: id },
    });
    if (!response) {
      throw new NotFoundException('Organization not found');
    }

    this.organizationRepository.remove(response);
    return;
  }
}
