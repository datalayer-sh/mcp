# @datalayer/mcp

MCP server for DataLayer — B2B enrichment for AI agents. 60M companies, 300M contacts, intent signals.

## Quick Start

```bash
npx -y @datalayer/mcp
```

## Configuration

### Claude Desktop

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "datalayer": {
      "command": "npx",
      "args": ["-y", "@datalayer/mcp"],
      "env": {
        "DATALAYER_API_KEY": "sk_live_..."
      }
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "datalayer": {
      "command": "npx",
      "args": ["-y", "@datalayer/mcp"],
      "env": {
        "DATALAYER_API_KEY": "sk_live_..."
      }
    }
  }
}
```

## Available Tools

| Tool | Description | Credits |
|---|---|---|
| `enrich_company` | Full company profile with signals — industry, headcount, revenue, tech stack, funding, traffic, ad spend | 1 |
| `enrich_person` | Full contact profile — name, email, phone, title, seniority, LinkedIn, employer | 1 |
| `search_companies` | Search 60M+ companies by industry, location, size, tech stack, funding, traffic, growth | 1/result |
| `search_people` | Search 300M+ contacts by title, seniority, function, company, location | 1/result |
| `lookup_person` | Find a person by email, phone, LinkedIn URL, or name + company | 1 |
| `lookup_company` | Find a company by domain, LinkedIn URL, or name | 1 |
| `company_employees` | List employees at a company, filterable by seniority and function | 1 |
| `company_headcount` | Headcount breakdown by department (15 departments) | 1 |
| `company_technographics` | Full tech stack across 16 categories | 1 |
| `company_jobs` | Open job counts by department (hiring intent signal) | 1 |
| `find_intent_signals` | Companies showing buying intent — scored by traffic, ad spend, hiring, growth, funding | 5/result |

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATALAYER_API_KEY` | Yes | Your API key from [app.datalayer.dev](https://app.datalayer.dev) |
| `DATALAYER_API_URL` | No | Override API base URL (default: `https://api.datalayer.dev`) |

## Links

- [Dashboard & API Keys](https://app.datalayer.dev)
- [API Documentation](https://docs.datalayer.dev)
- [Website](https://datalayer.dev)

## License

MIT
