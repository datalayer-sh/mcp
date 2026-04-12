const D = '—';

function num(v: unknown): string {
  if (v == null || v === '') return D;
  const n = Number(v);
  if (isNaN(n)) return String(v);
  if (n >= 1_000_000_000) return `${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return n.toLocaleString('en-US');
  return String(n);
}

function money(v: unknown): string {
  if (v == null || v === '') return D;
  const n = Number(v);
  if (isNaN(n)) return String(v);
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${n.toLocaleString('en-US')}`;
  return `$${n}`;
}

function pct(v: unknown): string {
  if (v == null || v === '') return D;
  const n = Number(v);
  if (isNaN(n)) return String(v);
  return `${n > 0 ? '+' : ''}${(n * 100).toFixed(1)}%`;
}

function s(v: unknown): string {
  if (v == null || v === '') return D;
  return String(v);
}

function loc(l: { city?: string | null; state?: string | null; country?: string | null; country_code?: string | null } | null): string {
  if (!l) return D;
  const parts = [l.city, l.state, l.country_code ?? l.country].filter(Boolean);
  return parts.length ? parts.join(', ') : D;
}

// ── Company ───────────────────────────────────────────────────────────────────

export function formatCompany(data: any): string {
  if (!data) return 'No company found.';
  const lines: string[] = [];
  lines.push(`## ${s(data.name)}`);
  lines.push(`**Domain**: ${s(data.domain)} | **Industry**: ${s(data.industry)} | **Size**: ${s(data.employee_count_range)}`);
  lines.push(`**Founded**: ${s(data.founded)} | **HQ**: ${loc(data.headquarters)} | **Revenue**: ${s(data.revenue_range)}`);
  if (data.linkedin_url) lines.push(`**LinkedIn**: ${data.linkedin_url}`);
  if (data.description) lines.push(`\n> ${String(data.description).slice(0, 300)}`);

  if (data.signals) {
    const sig = data.signals;
    lines.push('');
    lines.push('### Signals');
    lines.push(`- Google Ad Spend: ${money(sig.google_adspend)}/mo`);
    lines.push(`- Monthly Traffic: ${num(sig.monthly_traffic)} visits`);
    lines.push(`- Employee Growth: ${pct(sig.employee_growth_rate)}/yr`);
    lines.push(`- Total Funding: ${money(sig.total_funding)}${sig.last_funding_type ? ` (${sig.last_funding_type})` : ''}`);
    if (sig.lead_investors) lines.push(`- Lead Investors: ${sig.lead_investors}`);

    const techEntries = [
      ['CRM', sig.crm_tech],
      ['Cloud', sig.cloud_provider],
      ['Analytics', sig.analytics_tech],
      ['Marketing', sig.marketing_automation],
      ['Sales', sig.sales_automation],
      ['CMS', sig.cms_tech],
      ['E-commerce', sig.ecommerce_tech],
    ].filter(([, v]) => v);

    if (techEntries.length) {
      lines.push('');
      lines.push('### Tech Stack');
      lines.push(techEntries.map(([k, v]) => `- ${k}: ${v}`).join('\n'));
    }
  }

  return lines.join('\n');
}

// ── Person ────────────────────────────────────────────────────────────────────

export function formatPerson(data: any): string {
  if (!data) return 'No person found.';
  const lines: string[] = [];
  lines.push(`## ${s(data.full_name)}`);
  lines.push(`**Title**: ${s(data.job_title)} | **Level**: ${s(data.job_level)} | **Function**: ${s(data.job_function)}`);

  const contactParts: string[] = [];
  if (data.email) contactParts.push(`**Email**: ${data.email}`);
  if (data.phone) contactParts.push(`**Phone**: ${data.phone}`);
  if (contactParts.length) lines.push(contactParts.join(' | '));

  if (data.company) {
    const c = data.company;
    lines.push(`**Company**: ${s(c.name)}${c.domain ? ` (${c.domain})` : ''}`);
  }

  lines.push(`**Location**: ${loc(data.location)}`);
  if (data.linkedin_url) lines.push(`**LinkedIn**: ${data.linkedin_url}`);
  if (data.headline) lines.push(`> ${data.headline}`);

  return lines.join('\n');
}

// ── Company List ──────────────────────────────────────────────────────────────

export function formatCompanyList(data: any[], pagination: any): string {
  if (!data?.length) return 'No companies found.';
  const lines: string[] = [];
  lines.push(`**${num(pagination.total)} companies** (page ${pagination.page}, ${data.length} shown)\n`);
  lines.push('| Company | Domain | Industry | Size | HQ |');
  lines.push('|---|---|---|---|---|');
  for (const c of data) {
    lines.push(`| ${s(c.name)} | ${s(c.domain)} | ${s(c.industry)} | ${s(c.employee_count_range)} | ${loc(c.headquarters)} |`);
  }
  if (pagination.has_more) lines.push(`\n*More results available — request page ${pagination.page + 1}.*`);
  return lines.join('\n');
}

// ── People List ───────────────────────────────────────────────────────────────

export function formatPeopleList(data: any[], pagination: any): string {
  if (!data?.length) return 'No people found.';
  const lines: string[] = [];
  lines.push(`**${num(pagination.total)} contacts** (page ${pagination.page}, ${data.length} shown)\n`);
  lines.push('| Name | Title | Company | Email | Location |');
  lines.push('|---|---|---|---|---|');
  for (const p of data) {
    const email = p.email ? p.email : D;
    lines.push(`| ${s(p.full_name)} | ${s(p.job_title)} | ${s(p.company?.name)} | ${email} | ${loc(p.location)} |`);
  }
  if (pagination.has_more) lines.push(`\n*More results available — request page ${pagination.page + 1}.*`);
  return lines.join('\n');
}

// ── Headcount ─────────────────────────────────────────────────────────────────

export function formatHeadcount(data: any): string {
  if (!data) return 'No headcount data found.';
  const lines: string[] = [];
  lines.push('## Headcount by Department\n');
  lines.push('| Department | Count |');
  lines.push('|---|---|');

  const depts: [string, unknown][] = [
    ['Engineering', data.engineering],
    ['Sales', data.sales],
    ['Marketing', data.marketing],
    ['Operations', data.operations],
    ['IT', data.it],
    ['DevOps', data.devops],
    ['Customer Success', data.customer_success],
    ['Business Development', data.business_development],
    ['Android Dev', data.android_dev],
    ['iOS Dev', data.ios_dev],
    ['Mobile Dev', data.mobile_dev],
    ['QA', data.qa],
    ['Security', data.security],
    ['GRC', data.grc],
    ['Network Infrastructure', data.network_infrastructure],
  ];

  let total = 0;
  for (const [name, count] of depts) {
    const n = Number(count ?? 0);
    if (n > 0) {
      lines.push(`| ${name} | ${num(n)} |`);
      total += n;
    }
  }
  lines.push(`| **Total** | **${num(total)}** |`);

  return lines.join('\n');
}

// ── Technographics ────────────────────────────────────────────────────────────

export function formatTechnographics(data: any): string {
  if (!data) return 'No technographic data found.';
  const lines: string[] = [];
  lines.push('## Tech Stack\n');

  const categories: [string, unknown][] = [
    ['CRM', data.crm],
    ['Cloud Provider', data.cloud_provider],
    ['CMS', data.cms],
    ['Marketing Automation', data.marketing_automation],
    ['Sales Automation', data.sales_automation],
    ['Analytics', data.analytics],
    ['E-commerce', data.ecommerce],
    ['Email Hosting', data.email_hosting],
    ['Email Security', data.email_security],
    ['Cloud Security', data.cloud_security],
    ['Application Security', data.application_security],
    ['Conversation Intelligence', data.conversation_intelligence],
    ['ABM', data.abm],
    ['ERP', data.erp],
    ['Development', data.development],
    ['Martech Categories', data.martech_categories],
  ];

  for (const [name, value] of categories) {
    if (value) lines.push(`- **${name}**: ${value}`);
  }

  if (lines.length === 1) return 'No tech stack data available.';
  return lines.join('\n');
}

// ── Jobs ──────────────────────────────────────────────────────────────────────

export function formatJobs(data: any): string {
  if (!data) return 'No open roles data found.';
  const lines: string[] = [];
  lines.push(`## Open Roles (${num(data.total_open_roles)} total)\n`);

  if (!data.by_department) return lines[0];
  lines.push('| Department | Open Roles |');
  lines.push('|---|---|');

  const depts: [string, unknown][] = [
    ['Sales', data.by_department.sales],
    ['DevOps', data.by_department.devops],
    ['Marketing', data.by_department.marketing],
    ['IT', data.by_department.it],
    ['Security', data.by_department.security],
    ['Customer Success', data.by_department.customer_success],
    ['Business Development', data.by_department.business_development],
    ['Demand Generation', data.by_department.demand_generation],
    ['Operations', data.by_department.operations],
    ['Network Infrastructure', data.by_department.network_infrastructure],
    ['GRC', data.by_department.grc],
    ['Account Executive', data.by_department.account_executive],
  ];

  for (const [name, count] of depts) {
    const n = Number(count ?? 0);
    if (n > 0) lines.push(`| ${name} | ${n} |`);
  }

  return lines.join('\n');
}

// ── Intent Signals ────────────────────────────────────────────────────────────

export function formatIntentResults(data: any[], pagination: any): string {
  if (!data?.length) return 'No companies with matching intent signals found.';
  const lines: string[] = [];
  lines.push(`**${num(pagination.total)} companies with intent** (page ${pagination.page}, ${data.length} shown)\n`);
  lines.push('| Company | Domain | Score | Signals | Industry | Size |');
  lines.push('|---|---|---|---|---|---|');
  for (const c of data) {
    const signals = c.intent_signals?.join(', ') ?? D;
    lines.push(`| ${s(c.name)} | ${s(c.domain)} | ${c.intent_score ?? 0} | ${signals} | ${s(c.industry)} | ${s(c.employee_count_range)} |`);
  }
  if (pagination.has_more) lines.push(`\n*More results available — request page ${pagination.page + 1}.*`);
  return lines.join('\n');
}
