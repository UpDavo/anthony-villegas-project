import { Client } from 'pg';

export class ConnectionService {
  constructor(private client: any) {
    // this.client = new Client(process.env.DB);
    this.client = new Client(
      'postgresql://anthony:oIQd35eD0tjc17ghpoaOeg@ntt-data-8060.7tt.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full',
    );
    this.client.connect();
  }

  async get_client() {
    return this.client();
  }

  async stop_connection() {
    this.client.close();
  }

  async execute_query(query: string) {
    try {
      const results = await this.client.query(query);
      return results;
    } catch (err) {
      return err;
    }
  }
}
