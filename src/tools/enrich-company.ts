import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { apiPost } from '../lib/api.js';
import { formatCompany } from '../lib/format.js';

export function registerEnrichCompany(server: McpServer) {
  server.tool(
    'enrich_company',
    'Get a full company profile with signals — industry, headcount, revenue, tech stack, funding, traffic, Google ad spend, employee growth rate.',
    {
      domain: z.string().optional().describe('Company domain (e.g., stripe.com)'),
      linkedin_url: z.string().optional().describe('Company LinkedIn URL'),
      name: z.string().optional().describe('Company name'),
      location: z.string().optional().describe('City/country to disambiguate name lookup'),
    },
    async (args) => {
      try {
        const data = await apiPost('/v1/enrich/company', args);
        return { content: [{ type: 'text' as const, text: formatCompany(data.data) }] };
      } catch (e: any) {
        return { content: [{ type: 'text' as const, text: `Error: ${e.message}` }], isError: true };
      }
    }
  );
}
