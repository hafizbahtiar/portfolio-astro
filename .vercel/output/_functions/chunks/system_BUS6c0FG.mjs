import { A as ApiClient } from './api-client_BtW8nPY3.mjs';

const API_BASE_URL = "http://localhost:8787/api/v1";
class SystemService extends ApiClient {
  constructor() {
    super(API_BASE_URL);
  }
  async getLogs() {
    return await this.get("/owner/system/logs").catch(() => null) ?? [];
  }
}
const systemService = new SystemService();

export { systemService as s };
