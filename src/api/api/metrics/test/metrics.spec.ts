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
      //Considerando que la entrada es 1 debe responder con un arreglo completo

      const mock_result: any = [
        [
          {
            id: '1',
            name: 'cd-common-utils',
            tribe: 'Centro Digital',
            organization: 'Banco Pichincha',
            coverage: '75',
            codesmells: '0',
            bugs: '0',
            vulnerabilities: '0',
            hotspot: '0',
            state: 'E',
          },
          {
            id: '2',
            name: 'cd-common-text',
            tribe: 'Centro Digital',
            organization: 'Banco Pichincha',
            coverage: '75',
            codesmells: '1',
            bugs: '0',
            vulnerabilities: '2',
            hotspot: '0',
            state: 'E',
          },
        ],
        {
          repositories: [
            { id: 1, state: 604 },
            { id: 2, state: 605 },
            { id: 3, state: 606 },
            { id: 4, state: 604 },
          ],
        },
      ];
      const result: any = {
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

      expect(
        await metricsService.format_response(mock_result[0], mock_result[1]),
      ).toStrictEqual(result);
    });
  });

  describe('get_metrics_per_repo_per_tribe', () => {
    it('Should show the error name', async () => {
      //Considerando que la entrada es 1 debe responder con un arreglo completo

      const mock_result: any = [
        [],
        {
          repositories: [
            { id: 1, state: 604 },
            { id: 2, state: 605 },
            { id: 3, state: 606 },
            { id: 4, state: 604 },
          ],
        },
      ];
      const result: any = {
        response: {
          repositories: [],
        },
        validation: {
          error: true,
          description: 'La Tribu no se encuentra registrada',
        },
      };

      jest
        .spyOn(metricsService, 'get_metrics_per_repo_per_tribe')
        .mockImplementation(() => mock_result);

      expect(
        await metricsService.format_response(mock_result[0], mock_result[1]),
      ).toStrictEqual(result);
    });
  });
});
