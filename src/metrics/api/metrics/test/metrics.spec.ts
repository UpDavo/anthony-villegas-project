import { Test } from '@nestjs/testing';
import { MetricsController } from '../metrics.controller';
import { MetricsService } from '../metrics.service';
import { ConnectionService } from '../../../../common/connection.service';

describe('MetricsController', () => {
  let metricsController: MetricsController;
  let metricsService: MetricsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [ConnectionService],
      controllers: [MetricsController],
      providers: [MetricsService],
    }).compile();

    metricsService = moduleRef.get<MetricsService>(MetricsService);
    metricsController = moduleRef.get<MetricsController>(MetricsController);
  });

  describe('get_metrics_per_repo_per_tribe', () => {
    it('Should show the complete string', async () => {
      let result: Promise<
        | 'La Tribu no tiene repositorios que cumplan con la cobertura necesaria'
        | 'La Tribu no se encuentra registrada'
        | { repositories: any }
      >;

      jest
        .spyOn(metricsService, 'get_metrics_per_repo_per_tribe')
        .mockImplementation(() => result);

      expect(await metricsController.get_metrics_per_repo_per_tribe(1, 0)).toBe(
        result,
      );
    });
  });
});
