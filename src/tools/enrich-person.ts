import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { apiPost } from '../lib/api.js';
import { formatPerson } from '../lib/format.js';

export function registerEnrichPerson(server: McpServer) {
  server.tool(
    'enrich_person',
    'Get a full contact profile — name, email, phone, job title, seniority, LinkedIn, current employer.',
    {
      email: z.string().optional().describe('Email address'),
      linkedin_url: z.string().optional().describe('LinkedIn profile URL'),
      first_name: z.string().optional().describe('First name (combine with domain)'),
      last_name: z.string().optional().describe('Last name'),
      domain: z.string().optional().describe('Company domain (use with first_name)'),
    },
    async (args) => {
      try {
        const data = await apiPost('/v1/enrich/person', args);
        return { content: [{ type: 'text' as const, text: formatPerson(data.data) }] };
      } catch (e: any) {
        return { content: [{ type: 'text' as const, text: `Error: ${e.message}` }], isError: true };
      }
    }
  );
}
