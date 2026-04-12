import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { apiGet } from '../lib/api.js';
import { formatCompany } from '../lib/format.js';

export function registerLookupCompany(server: McpServer) {
  server.tool(
    'lookup_company',
    'Find a specific company by domain, LinkedIn URL, or name.',
    {
      domain: z.string().optional().describe('Company domain (e.g., stripe.com)'),
      linkedin_url: z.string().optional().describe('Company LinkedIn URL'),
      name: z.string().optional().describe('Company name'),
      location: z.string().optional().describe('City/country to disambiguate name lookup'),
    },
    async (args) => {
      try {
        const params: Record<string, string> = {};
        if (args.domain) params.domain = args.domain;
        if (args.linkedin_url) params.linkedin_url = args.linkedin_url;
        if (args.name) params.name = args.name;
        if (args.location) params.location = args.location;

        const data = await apiGet('/v1/companies/lookup', params);
        return { content: [{ type: 'text' as const, text: formatCompany(data.data) }] };
      } catch (e: any) {
        return { content: [{ type: 'text' as const, text: `Error: ${e.message}` }], isError: true };
      }
    }
  );
}
