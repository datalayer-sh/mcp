import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { apiGet } from '../lib/api.js';
import { formatPerson } from '../lib/format.js';

export function registerLookupPerson(server: McpServer) {
  server.tool(
    'lookup_person',
    'Find a specific person by email, phone, LinkedIn URL, or name + company domain.',
    {
      email: z.string().optional().describe('Email address'),
      phone: z.string().optional().describe('Phone number'),
      linkedin_url: z.string().optional().describe('LinkedIn profile URL'),
      name: z.string().optional().describe('Full name (combine with domain)'),
      domain: z.string().optional().describe('Company domain (use with name)'),
    },
    async (args) => {
      try {
        const params: Record<string, string> = {};
        if (args.email) params.email = args.email;
        if (args.phone) params.phone = args.phone;
        if (args.linkedin_url) params.linkedin_url = args.linkedin_url;
        if (args.name) params.name = args.name;
        if (args.domain) params.domain = args.domain;

        const data = await apiGet('/v1/people/lookup', params);
        return { content: [{ type: 'text' as const, text: formatPerson(data.data) }] };
      } catch (e: any) {
        return { content: [{ type: 'text' as const, text: `Error: ${e.message}` }], isError: true };
      }
    }
  );
}
