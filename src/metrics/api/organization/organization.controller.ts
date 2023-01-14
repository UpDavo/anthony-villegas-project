import {
  Controller,
  Get,
  Post,
  Put,
  Res,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationModel } from '../../dto/organization.model';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/organization')
export class OrganizationController {
  constructor(private OrganizationService: OrganizationService) {}

  //Get path to list all organizations
  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  async get_organizations(@Res() response) {
    const data = await this.OrganizationService.get_organizations();
    return response.status(HttpStatus.OK).json(data);
  }

  //Post path to set one organization row
  @UseGuards(AuthGuard('jwt'))
  @Post('/setOrganization')
  async set_organization(@Body() request: OrganizationModel, @Res() response) {
    const data = await this.OrganizationService.set_organization_row(request);
    return response.status(HttpStatus.OK).json(data);
  }

  //Put path to update one organization row
  @UseGuards(AuthGuard('jwt'))
  @Put('/updateOrganization')
  async update_organization(
    @Body() request: OrganizationModel,
    @Res() response,
  ) {
    const data = await this.OrganizationService.update_organization_row(
      request,
    );
    return response.status(HttpStatus.OK).json(data);
  }

  //Delete one organization path
  @UseGuards(AuthGuard('jwt'))
  @Delete('/deleteOrganization/:id_organization')
  async delete_organization(
    @Param('id_organization', ParseIntPipe) id_organization: number,
    @Res() response,
  ) {
    const data = await this.OrganizationService.delete_organization_row(
      id_organization,
    );
    return response.status(HttpStatus.OK).json(data);
  }
}
