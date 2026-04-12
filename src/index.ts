#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { registerEnrichCompany } from './tools/enrich-company.js';
import { registerEnrichPerson } from './tools/enrich-person.js';
import { registerSearchCompanies } from './tools/search-companies.js';
import { registerSearchPeople } from './tools/search-people.js';
import { registerLookupPerson } from './tools/lookup-person.js';
import { registerLookupCompany } from './tools/lookup-company.js';
import { registerCompanyEmployees } from './tools/company-employees.js';
import { registerCompanyHeadcount } from './tools/company-headcount.js';
import { registerCompanyTechnographics } from './tools/company-technographics.js';
import { registerCompanyJobs } from './tools/company-jobs.js';
import { registerIntentSignals } from './tools/intent-signals.js';

const server = new McpServer(
  { name: 'datalayer', version: '0.1.0' },
  {
    capabilities: { logging: {} },
    instructions: `DataLayer MCP Server — B2B enrichment for AI agents.

Available actions:
- Enrich any company by domain → full profile with signals (tech stack, funding, traffic, ad spend, growth)
- Enrich any person by email → name, title, phone, LinkedIn, employer
- Search 60M companies and 300M contacts with rich filters
- Get company intelligence: employees, headcount, tech stack, open jobs
- Find companies with buying intent scored by signal strength

Tips:
- Use enrich_company first to get company details, then company_employees to find decision makers.
- Use search_companies with tech stack filters to find companies using specific tools.
- Intent signals (find_intent_signals) cost 5 credits per result — use sparingly.
- All lookups that return 404 are free (no credits consumed).`,
  }
);

registerEnrichCompany(server);
registerEnrichPerson(server);
registerSearchCompanies(server);
registerSearchPeople(server);
registerLookupPerson(server);
registerLookupCompany(server);
registerCompanyEmployees(server);
registerCompanyHeadcount(server);
registerCompanyTechnographics(server);
registerCompanyJobs(server);
registerIntentSignals(server);

const transport = new StdioServerTransport();
await server.connect(transport);
