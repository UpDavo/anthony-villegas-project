import { Controller, Get, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { EmulatedService } from './emulated.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/emulated')
export class EmulatedController {
  constructor(private EmulatedService: EmulatedService) {}

  //Gets template data
  @UseGuards(AuthGuard('jwt'))
  @Get()
  async send_basic_results(@Res() response) {
    const obtained_data = await this.EmulatedService.getData();
    // const server = await this.ConnectionService.test_connection();
    return response.status(HttpStatus.OK).json({ repositories: obtained_data });
  }
}
