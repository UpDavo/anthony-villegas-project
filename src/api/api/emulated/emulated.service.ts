import { Injectable } from '@nestjs/common';

interface test {
  repositories: repository[];
}

interface repository {
  id: number;
  state: number;
}

@Injectable()
export class EmulatedService {
  async getData() {
    const test_data: test = {
      repositories: [
        {
          id: 1,
          state: 604,
        },
        {
          id: 2,
          state: 605,
        },
        {
          id: 3,
          state: 606,
        },
        {
          id: 4,
          state: 604,
        },
      ],
    };
    return test_data;
  }
}
