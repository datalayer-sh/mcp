import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { apiPost } from '../lib/api.js';
import { formatPeopleList } from '../lib/format.js';

export function registerSearchPeople(server: McpServer) {
  server.tool(
    'search_people',
    'Search 300M+ contacts by title, seniority, function, company, location, and more. Returns paginated results.',
    {
      titles: z.array(z.string()).optional().describe('Job title keywords (e.g., VP Engineering, CTO)'),
      seniorities: z.array(z.string()).optional().describe('Seniority levels: C-Suite, VP, Director, Manager, Staff, Entry, Intern'),
      functions: z.array(z.string()).optional().describe('Job functions (e.g., Engineering, Sales)'),
      company_domains: z.array(z.string()).optional().describe('Filter by employer domain'),
      company_name: z.string().optional().describe('Company name (fuzzy match)'),
      country_codes: z.array(z.string()).optional().describe('ISO country codes (e.g., US, GB)'),
      has_email: z.boolean().optional().describe('Only return people with a verified email'),
      has_phone: z.boolean().optional().describe('Only return people with a phone number'),
      is_current: z.boolean().optional().describe('Only return people in their current role'),
      page: z.number().optional().describe('Page number (default 1)'),
      per_page: z.number().optional().describe('Results per page (max 100, default 25)'),
    },
    async (args) => {
      try {
        const data = await apiPost('/v1/people/search', args);
        return { content: [{ type: 'text' as const, text: formatPeopleList(data.data, data.pagination) }] };
      } catch (e: any) {
        return { content: [{ type: 'text' as const, text: `Error: ${e.message}` }], isError: true };
      }
    }
  );
}
