import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { apiPost } from '../lib/api.js';
import { formatIntentResults } from '../lib/format.js';

export function registerIntentSignals(server: McpServer) {
  server.tool(
    'find_intent_signals',
    'Find companies showing buying intent — scored by web traffic, Google ad spend, hiring velocity, employee growth, and funding. Costs 5 credits per result.',
    {
      min_monthly_traffic: z.number().optional().describe('Min monthly web traffic'),
      min_google_adspend: z.number().optional().describe('Min monthly Google ad spend ($)'),
      min_open_roles: z.number().optional().describe('Min total open roles across departments'),
      min_employee_growth_rate: z.number().optional().describe('Min employee growth rate (0.1 = 10%)'),
      min_total_funding: z.number().optional().describe('Min total funding ($)'),
      industries: z.array(z.string()).optional().describe('Filter by industries'),
      country_codes: z.array(z.string()).optional().describe('ISO country codes'),
      page: z.number().optional().describe('Page number (default 1)'),
      per_page: z.number().optional().describe('Results per page (max 100, default 25)'),
    },
    async (args) => {
      try {
        const data = await apiPost('/v1/signal/intent', args);
        return { content: [{ type: 'text' as const, text: formatIntentResults(data.data, data.pagination) }] };
      } catch (e: any) {
        return { content: [{ type: 'text' as const, text: `Error: ${e.message}` }], isError: true };
      }
    }
  );
}
