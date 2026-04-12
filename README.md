# DataLayer MCP Server

**Give your AI agent access to 60M+ companies and 300M+ verified contacts.** Enrich leads, find work emails, discover tech stacks, and identify buying intent — directly from Claude, Cursor, Windsurf, or any MCP-compatible AI agent.

[![npm version](https://img.shields.io/npm/v/@datalayer/mcp.svg)](https://www.npmjs.com/package/@datalayer/mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## What is this?

DataLayer is a B2B data enrichment API. This MCP server lets AI agents call it directly — no code, no HTTP requests, just natural language.

Ask your agent:

> "Find the VP of Engineering at Stripe and get their verified email"

> "Show me all SaaS companies in the US using Salesforce with 50+ employees that are actively hiring"

> "What's the tech stack at HubSpot? Do they use AWS or GCP?"

> "Find companies spending $10K+/mo on Google Ads with employee growth above 15%"

The agent calls the right DataLayer tool, gets structured data back, and reasons about it.

---

## Install

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) or `%APPDATA%\Claude\claude_desktop_config.json` (Windows):

```json
{
  "mcpServers": {
    "datalayer": {
      "command": "npx",
      "args": ["-y", "@datalayer/mcp"],
      "env": {
        "DATALAYER_API_KEY": "sk_live_your_key_here"
      }
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json` in your project root:

```json
{
  "mcpServers": {
    "datalayer": {
      "command": "npx",
      "args": ["-y", "@datalayer/mcp"],
      "env": {
        "DATALAYER_API_KEY": "sk_live_your_key_here"
      }
    }
  }
}
```

### Windsurf / Other MCP Clients

Same config pattern. Set the `DATALAYER_API_KEY` environment variable and run `npx -y @datalayer/mcp` via stdio.

### Get your API key

1. Sign up at [datalayer.dev](https://datalayer.dev) (free, no credit card)
2. Go to Dashboard → API Keys → Create key
3. Copy the `sk_live_...` key into your config

**100 free credits included** — enough to test every tool.

---

## What Can You Do?

### Find People & Emails

| Tool | What it does | Credits |
|------|-------------|---------|
| `enrich_person` | Get name, verified email, phone, job title, seniority, LinkedIn URL for any contact | 1 |
| `lookup_person` | Find a person by email, phone number, LinkedIn URL, or name + company | 1 |
| `search_people` | Search 300M+ contacts by title, seniority, function, company, location | 1/result |
| `company_employees` | List decision-makers at any company, filtered by role and seniority | 1 |

**Example**: *"Find all VPs of Engineering at Shopify with verified emails"*

### Research Companies

| Tool | What it does | Credits |
|------|-------------|---------|
| `enrich_company` | Full company profile — industry, headcount, revenue, funding, tech stack, traffic, ad spend | 1 |
| `lookup_company` | Find a company by domain, LinkedIn URL, or name | 1 |
| `search_companies` | Search 60M+ companies by industry, size, tech stack, funding, traffic, growth | 1/result |

**Example**: *"Show me Series A fintech companies in the US with 50-200 employees"*

### Company Intelligence

| Tool | What it does | Credits |
|------|-------------|---------|
| `company_technographics` | Full tech stack across 16 categories — CRM, cloud, marketing automation, analytics, etc. | 1 |
| `company_headcount` | Department breakdown (engineering, sales, marketing, etc. — 15 departments) | 1 |
| `company_jobs` | Open roles by department — a hiring intent signal | 1 |

**Example**: *"What CRM does Notion use? What about their marketing automation stack?"*

### Buying Intent Signals

| Tool | What it does | Credits |
|------|-------------|---------|
| `find_intent_signals` | Companies ranked by buying intent — web traffic, Google ad spend, hiring velocity, employee growth, recent funding | 5/result |

**Example**: *"Find companies in the SaaS industry that are spending heavily on Google Ads and growing fast"*

---

## Use Cases

### For Sales & GTM Teams
- **Build targeted lead lists**: "Find CTOs at SaaS companies with 50-500 employees using AWS"
- **Enrich CRM data**: Pipe company + contact data into HubSpot or Salesforce
- **Identify buying intent**: Find companies actively hiring + spending on ads = ready to buy
- **Competitor analysis**: "What tech stack does [competitor] use? Who are their key hires?"

### For Recruiters
- **Source candidates**: "Find senior engineers at companies using React and TypeScript in San Francisco"
- **Map org charts**: Get headcount by department for any company
- **Track hiring signals**: Companies with many open roles = growing = recruiting opportunities

### For Investors & Analysts
- **Due diligence**: Full company profile with funding history, growth rate, tech stack
- **Deal sourcing**: "Find recently funded AI companies with high employee growth"
- **Market mapping**: Search by industry, size, technology, and geography

### For Developers & AI Agents
- **Automate prospecting**: Build Claude Code pipelines that enrich leads automatically
- **n8n / Make workflows**: Trigger enrichment from any automation platform
- **CRM enrichment bots**: Agents that keep your CRM data fresh and complete

---

## Data Coverage

| Metric | Coverage |
|--------|---------|
| Companies | 60M+ worldwide |
| Contacts | 300M+ verified professionals |
| Emails | Verified with 90-day re-verification cycle |
| Phone numbers | Direct dials and mobile numbers |
| Tech stack | 16 categories (CRM, cloud, marketing, analytics, etc.) |
| Signals | Google Ad Spend, web traffic, employee growth, funding, hiring velocity |
| Geography | Global — US, EU, APAC, LATAM |

---

## How Credits Work

- **1 credit = 1 enrichment** (company or person)
- **Search results**: 1 credit per result returned
- **Intent signals**: 5 credits per result (premium data)
- **Failed lookups (404)**: Free — no credits consumed
- **Credits never expire** on top-up packs

100 free credits on signup. Plans from $49/mo.

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATALAYER_API_KEY` | Yes | Your API key from [datalayer.dev](https://datalayer.dev) |
| `DATALAYER_API_URL` | No | Override API base URL (default: `https://api.datalayer.dev`) |

---

## Why DataLayer?

| | DataLayer | Apollo | Clay | ZoomInfo |
|---|---|---|---|---|
| MCP server | **Yes** | Limited | No | No |
| REST API | **Yes** | Limited | No | Limited |
| Intent signals | **Yes** (unique) | Some | No | Yes |
| Pricing | **From $49/mo** | $49+/user/mo | $185+/mo | $6K+/yr |
| Credits expire | **Never** | Monthly | Monthly | Annual |
| Legal risk | **Licensed data** | OK | Varies | OK |
| Failed lookups | **Free** | Charged | Charged | Charged |

---

## Links

- [Website](https://datalayer.dev)
- [Live Demo](https://datalayer.dev/playground) — try the data, no signup required
- [API Documentation](https://api.datalayer.dev/docs)
- [Dashboard & API Keys](https://datalayer.dev/signup)

---

## FAQ

**Do I need to write code to use this?**
No. Install the MCP server, add your API key, and talk to your AI agent in natural language. The agent handles everything.

**What AI tools does this work with?**
Any MCP-compatible client: Claude Desktop, Claude Code, Cursor, Windsurf, Cline, Continue, and more.

**Is the data scraped from LinkedIn?**
No. DataLayer uses licensed, GDPR/CCPA-compliant data. No scraping, no legal risk. (ProxyCurl was shut down for scraping — we don't have that problem.)

**How fresh is the data?**
Contacts are re-verified on a 90-day cycle. Company data is refreshed monthly.

**What happens if a lookup returns no results?**
You're not charged. Failed lookups (404s) are free.

---

## Contributing

Issues and pull requests are welcome. Please open an issue first to discuss what you'd like to change.

## License

[MIT](LICENSE)
