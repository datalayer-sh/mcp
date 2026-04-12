import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { apiGet } from '../lib/api.js';
import { formatJobs } from '../lib/format.js';

export function registerCompanyJobs(server: McpServer) {
  server.tool(
    'company_jobs',
    'Get open job counts by department — a hiring intent signal.',
    {
      domain: z.string().describe('Company domain (e.g., stripe.com)'),
    },
    async (args) => {
      try {
        const data = await apiGet(`/v1/companies/${encodeURIComponent(args.domain)}/jobs`);
        return { content: [{ type: 'text' as const, text: formatJobs(data.data) }] };
      } catch (e: any) {
        return { content: [{ type: 'text' as const, text: `Error: ${e.message}` }], isError: true };
      }
    }
  );
}
