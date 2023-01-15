import { Injectable } from '@nestjs/common';
import { ConnectionService } from '../../../common/connection.service';
import { OrganizationModel } from '../../dto/organization.model';

@Injectable()
export class OrganizationService {
  constructor(private ConnectionService: ConnectionService) {}

  //Set a row in organizations
  async set_organization_row(organizationQuery: OrganizationModel) {
    const query = `INSERT INTO organization (id_organization, name, status) VALUES (${organizationQuery.id_organization}, '${organizationQuery.name}', '${organizationQuery.status}')`;
    const response: any = await this.ConnectionService.execute_query(query);
    return this.validation('Create', response, organizationQuery);
  }

  //Get all organizations
  async get_organizations() {
    const query = `SELECT * FROM organization`;
    const response: any = await this.ConnectionService.execute_query(query);
    return response.rows;
  }

  //Update a row in organizations
  async update_organization_row(organizationQuery: OrganizationModel) {
    const query = `UPDATE organization SET (name, status) = ('${organizationQuery.name}', '${organizationQuery.status}') WHERE id_organization = ${organizationQuery.id_organization};`;
    const response: any = await this.ConnectionService.execute_query(query);
    return this.validation('Update', response, organizationQuery);
  }

  //Delete a row in organizations by id
  async delete_organization_row(id_organization: number) {
    const query = `DELETE FROM organization WHERE id_organization = ${id_organization};`;
    const response: any = await this.ConnectionService.execute_query(query);
    return this.validation('Delete', response, { id: id_organization });
  }

  //Validate the response
  validation(process: string, response: any, organizationQuery: any) {
    let modified_response;
    if (response.name === undefined) {
      modified_response = {
        result: `${process} Row`,
        detail: organizationQuery,
      };
    } else {
      if (response.detail !== undefined) {
        modified_response = {
          result: 'Error in Query',
          detail: response.detail,
        };
      } else {
        modified_response = { result: 'Error in Query', detail: 'Json Error' };
      }
    }
    return modified_response;
  }
}
