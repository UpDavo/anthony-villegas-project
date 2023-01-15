import { Test } from '@nestjs/testing';
import { MetricsService } from '../metrics.service';
import { ConnectionService } from '../../../../common/connection.service';
import { EmulatedService } from '../../emulated/emulated.service';

describe('MetricsController', () => {
  let metricsService: MetricsService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [],
      providers: [MetricsService, ConnectionService, EmulatedService],
    }).compile();

    metricsService = moduleRef.get<MetricsService>(MetricsService);
  });

  describe('get_metrics_per_repo_per_tribe', () => {
    it('Should show the complete string', async () => {
      const mock_result: any = {
        response: {
          repositories: [
            {
              id: '1',
              name: 'cd-common-utils',
              tribe: 'Centro Digital',
              organization: 'Banco Pichincha',
              coverage: '75%',
              codesmells: '0',
              bugs: '0',
              vulnerabilities: '0',
              hotspot: '0',
              state: 'Habilitado',
              verificationState: 'Verificado',
            },
            {
              id: '2',
              name: 'cd-common-text',
              tribe: 'Centro Digital',
              organization: 'Banco Pichincha',
              coverage: '75%',
              codesmells: '1',
              bugs: '0',
              vulnerabilities: '2',
              hotspot: '0',
              state: 'Habilitado',
              verificationState: 'En espera',
            },
          ],
        },
        validation: { error: false, description: '' },
      };

      jest
        .spyOn(metricsService, 'get_metrics_per_repo_per_tribe')
        .mockImplementation(() => mock_result);

      expect(await metricsService.get_metrics_per_repo_per_tribe(1)).toBe(
        mock_result,
      );
    });
  });
});
