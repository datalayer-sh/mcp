import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { apiGet } from '../lib/api.js';
import { formatHeadcount } from '../lib/format.js';

export function registerCompanyHeadcount(server: McpServer) {
  server.tool(
    'company_headcount',
    'Get headcount breakdown by department (15 departments) for a company.',
    {
      domain: z.string().describe('Company domain (e.g., stripe.com)'),
    },
    async (args) => {
      try {
        const data = await apiGet(`/v1/companies/${encodeURIComponent(args.domain)}/headcount`);
        return { content: [{ type: 'text' as const, text: formatHeadcount(data.data) }] };
      } catch (e: any) {
        return { content: [{ type: 'text' as const, text: `Error: ${e.message}` }], isError: true };
      }
    }
  );
}
