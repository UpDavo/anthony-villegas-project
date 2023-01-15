import { Module } from '@nestjs/common';

//Controllers
import { EmulatedController } from './api/emulated/emulated.controller';
import { OrganizationController } from './api/organization/organization.controller';
import { MetricsController } from './api/metrics/metrics.controller';

//Services
import { EmulatedService } from './api/emulated/emulated.service';
import { ConnectionService } from '../common/connection.service';
import { OrganizationService } from './api/organization/organization.service';
import { MetricsService } from './api/metrics/metrics.service';

@Module({
  imports: [],
  controllers: [EmulatedController, OrganizationController, MetricsController],
  providers: [
    EmulatedService,
    ConnectionService,
    OrganizationService,
    MetricsService,
  ],
})
export class ApiModule {}
