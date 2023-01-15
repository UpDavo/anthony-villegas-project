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
import { ResponseValidation } from '../../dto/metrics_rows.model';

@Controller('api/metrics')
export class MetricsController {
  constructor(private MetricsService: MetricsService) {}

  //Get id tribe parameter to load results
  @UseGuards(AuthGuard('jwt'))
  @Get('/:id_tribe')
  async get_metrics_per_repo_per_tribe(
    @Param('id_tribe', ParseIntPipe) id_tribe: number,
    @Res() response?,
  ) {
    const querys: any[] =
      await this.MetricsService.get_metrics_per_repo_per_tribe(id_tribe);

    console.log(querys[0]);
    console.log(querys[1]);

    const data: ResponseValidation = this.MetricsService.format_response(
      querys[0],
      querys[1],
    );
    if (data.validation.error) {
      return response.status(HttpStatus.OK).json(data.validation.description);
    } else {
      return response.status(HttpStatus.OK).json(data.response);
    }
  }

  //Generates a csv file
  @UseGuards(AuthGuard('jwt'))
  @Get('/download/:id_tribe')
  async download_metrics_per_repo_per_tribe(
    @Param('id_tribe', ParseIntPipe) id_tribe: number,
    @Res() response,
  ) {
    const querys: any[] =
      await this.MetricsService.get_metrics_per_repo_per_tribe(id_tribe);

    const data: ResponseValidation = this.MetricsService.format_response(
      querys[0],
      querys[1],
    );

    if (!data.validation.error) {
      const csv = this.MetricsService.createCsv(data.response);
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
