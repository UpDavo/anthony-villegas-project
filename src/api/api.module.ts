import { Module } from '@nestjs/common';

//Controllers
import { EmulatedController } from './api/emulated/emulated.controller';
import { OrganizationController } from './api/organization/organization.controller';
import { MetricsController } from './api/metrics/metrics.controller';

//Services
import { EmulatedService } from './api/emulated/emulated.service';
import { OrganizationService } from './api/organization/organization.service';
import { MetricsService } from './api/metrics/metrics.service';

//typeorm
import { TypeOrmModule } from '@nestjs/typeorm';
import { organization } from './entities/organization.entity';
import { tribe } from './entities/tribe.entity';
import { repository } from './entities/repository.entity';
import { metric } from './entities/metric.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([organization, tribe, repository, metric]),
  ],
  controllers: [EmulatedController, OrganizationController, MetricsController],
  providers: [EmulatedService, OrganizationService, MetricsService],
})
export class ApiModule {}
