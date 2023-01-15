import { Test } from '@nestjs/testing';
import { MetricsController } from '../metrics.controller';
import { MetricsService } from '../metrics.service';
import { ConnectionService } from '../../../../common/connection.service';
import { EmulatedService } from '../../emulated/emulated.service';

describe('MetricsController', () => {
  let metricsController: MetricsController;
  let metricsService: MetricsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [MetricsController],
      providers: [MetricsService, ConnectionService, EmulatedService],
    }).compile();

    metricsService = moduleRef.get<MetricsService>(MetricsService);
    metricsController = moduleRef.get<MetricsController>(MetricsController);
  });

  describe('get_metrics_per_repo_per_tribe', () => {
    it('Should show the complete string', async () => {
      let result: any;

      jest
        .spyOn(metricsService, 'get_metrics_per_repo_per_tribe')
        .mockImplementation(() => result);

      expect(await metricsController.get_metrics_per_repo_per_tribe(1, 0)).toBe(
        result,
      );
    });
  });
});
