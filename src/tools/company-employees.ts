import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { apiGet } from '../lib/api.js';
import { formatPeopleList } from '../lib/format.js';

export function registerCompanyEmployees(server: McpServer) {
  server.tool(
    'company_employees',
    'List employees at a company, filterable by seniority and function.',
    {
      domain: z.string().describe('Company domain (e.g., stripe.com)'),
      seniority: z.string().optional().describe('Filter by seniority (e.g., VP, Director, C-Suite)'),
      function: z.string().optional().describe('Filter by function (e.g., Engineering, Sales)'),
      has_email: z.boolean().optional().describe('Only return people with an email'),
      page: z.number().optional().describe('Page number (default 1)'),
      per_page: z.number().optional().describe('Results per page (max 100, default 25)'),
    },
    async (args) => {
      try {
        const params: Record<string, string> = {};
        if (args.seniority) params.seniority = args.seniority;
        if (args.function) params.function = args.function;
        if (args.has_email) params.has_email = 'true';
        if (args.page) params.page = String(args.page);
        if (args.per_page) params.per_page = String(args.per_page);

        const data = await apiGet(`/v1/companies/${encodeURIComponent(args.domain)}/employees`, params);
        return { content: [{ type: 'text' as const, text: formatPeopleList(data.data, data.pagination) }] };
      } catch (e: any) {
        return { content: [{ type: 'text' as const, text: `Error: ${e.message}` }], isError: true };
      }
    }
  );
}
