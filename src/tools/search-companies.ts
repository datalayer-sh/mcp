import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { apiPost } from '../lib/api.js';
import { formatCompanyList } from '../lib/format.js';

export function registerSearchCompanies(server: McpServer) {
  server.tool(
    'search_companies',
    'Search 60M+ companies by industry, location, size, tech stack, funding, traffic, growth, and more. Returns paginated results.',
    {
      industries: z.array(z.string()).optional().describe('Industry names (e.g., Computer Software, Financial Services)'),
      country_codes: z.array(z.string()).optional().describe('ISO country codes (e.g., US, GB)'),
      employee_ranges: z.array(z.string()).optional().describe('Size ranges (e.g., "11 to 50", "51 to 200")'),
      crm_tech: z.array(z.string()).optional().describe('CRM tools (e.g., Salesforce, HubSpot)'),
      cloud_provider: z.array(z.string()).optional().describe('Cloud providers (e.g., AWS, GCP)'),
      min_monthly_traffic: z.number().optional().describe('Min monthly web traffic'),
      min_google_adspend: z.number().optional().describe('Min monthly Google ad spend ($)'),
      min_total_funding: z.number().optional().describe('Min total funding ($)'),
      min_employee_growth_rate: z.number().optional().describe('Min employee growth rate (0.1 = 10%)'),
      page: z.number().optional().describe('Page number (default 1)'),
      per_page: z.number().optional().describe('Results per page (max 100, default 25)'),
    },
    async (args) => {
      try {
        const data = await apiPost('/v1/companies/search', args);
        return { content: [{ type: 'text' as const, text: formatCompanyList(data.data, data.pagination) }] };
      } catch (e: any) {
        return { content: [{ type: 'text' as const, text: `Error: ${e.message}` }], isError: true };
      }
    }
  );
}
