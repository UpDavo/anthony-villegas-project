import {
  Controller,
  Get,
  Res,
  Param,
  ParseIntPipe,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { MetricsService } from './metrics.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/metrics')
export class MetricsController {
  constructor(private MetricsService: MetricsService) {}

  //Get id tribe parameter to load results
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id_tribe')
  async get_metrics_per_repo_per_tribe(
    @Param('id_tribe', ParseIntPipe) id_tribe: number,
    @Res() response,
  ) {
    const data = await this.MetricsService.get_metrics_per_repo_per_tribe(
      id_tribe,
    );
    return response.status(HttpStatus.OK).json(data);
  }

  //Generates a csv file
  @UseGuards(AuthGuard('jwt'))
  @Get('/download/:id_tribe')
  async download_metrics_per_repo_per_tribe(
    @Param('id_tribe', ParseIntPipe) id_tribe: number,
    @Res() response,
  ): Promise<any> {
    const data = await this.MetricsService.get_metrics_per_repo_per_tribe(
      id_tribe,
    );

    if (
      data !=
        'La Tribu no tiene repositorios que cumplan con la cobertura necesaria' ||
      'La Tribu no se encuentra registrada'
    ) {
      const csv = this.MetricsService.createCsv(data);
      response.setHeader(
        'Content-disposition',
        'attachment; filename=data.csv',
      );
      response.setHeader('Content-Type', 'text/csv');
      return response.status(HttpStatus.OK).send(csv);
    } else {
      return response.status(HttpStatus.OK).json(data);
    }
  }
}
