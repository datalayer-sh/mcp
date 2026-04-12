import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { apiGet } from '../lib/api.js';
import { formatTechnographics } from '../lib/format.js';

export function registerCompanyTechnographics(server: McpServer) {
  server.tool(
    'company_technographics',
    'Get the full tech stack of a company across 16 categories — CRM, cloud, marketing automation, analytics, and more.',
    {
      domain: z.string().describe('Company domain (e.g., stripe.com)'),
    },
    async (args) => {
      try {
        const data = await apiGet(`/v1/companies/${encodeURIComponent(args.domain)}/technographics`);
        return { content: [{ type: 'text' as const, text: formatTechnographics(data.data) }] };
      } catch (e: any) {
        return { content: [{ type: 'text' as const, text: `Error: ${e.message}` }], isError: true };
      }
    }
  );
}
