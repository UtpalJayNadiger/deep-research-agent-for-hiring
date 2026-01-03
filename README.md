# Candidate Deep Research Agent

AI-powered candidate research agent for hiring decisions. Takes a LinkedIn URL or name + company and produces a comprehensive research dossier.

Built with the [Claude Agent SDK](https://platform.claude.com/docs/en/agent-sdk/overview).

## Output

The agent produces a structured markdown report with:

- **TL;DR** - 3 line summary: who they are, notable signal, any concerns
- **Career Timeline** - each role with context about the company (stage, funding, outcome)
- **Founder History** - any past startups, side projects, what happened
- **Public Presence** - GitHub, Twitter/X, blog, talks
- **Referral Paths** - people to ask for references based on their work history
- **Red Flags** - tenure patterns, gaps, concerning signals
- **Interview Questions** - specific questions based on their history

## Quickstart

### Prerequisites

- Node.js 18+
- [Claude Code](https://claude.ai/code) installed (the Agent SDK runtime)
- Anthropic API key

### 1. Install Claude Code

```bash
# macOS/Linux
curl -fsSL https://claude.ai/install.sh | bash

# Or via npm
npm install -g @anthropic-ai/claude-code
```

After installing, run `claude` once to authenticate.

### 2. Clone and install

```bash
git clone https://github.com/UtpalJayNadiger/deep-research-agent-for-hiring.git
cd deep-research-agent-for-hiring
npm install
```

### 3. Set your API key

```bash
export ANTHROPIC_API_KEY="your-api-key"
```

Get your API key from the [Anthropic Console](https://console.anthropic.com/).

### 4. Run

```bash
# By LinkedIn URL
npx tsx src/index.ts --url https://linkedin.com/in/someone

# By name + company
npx tsx src/index.ts --name "John Smith" --company "Acme Corp"

# By name only
npx tsx src/index.ts --name "Jane Doe"
```

## Usage Options

```bash
Options:
  -u, --url <url>        LinkedIn profile URL
  -n, --name <name>      Candidate name
  -c, --company <company> Current company (use with --name)
  -v, --verbose          Show research progress
  --json                 Output raw JSON instead of markdown
  -h, --help             Display help
```

### Examples

```bash
# Verbose mode - see the research happening in real-time
npx tsx src/index.ts --name "Jane Doe" -v

# Save report to file
npx tsx src/index.ts --name "Jane Doe" > report.md

# Get JSON output for programmatic use
npx tsx src/index.ts --name "Jane Doe" --json > report.json
```

## How It Works

The agent follows a 7-step research methodology:

1. **Profile Extraction** - Find and verify the candidate's identity
2. **Career History Deep Dive** - Research each company (stage, funding, outcomes)
3. **Founder Check** - Search for startup/founder history
4. **Public Presence Scan** - GitHub, Twitter, blog, talks
5. **Referral Mapping** - Identify reference paths
6. **Red Flag Detection** - Analyze tenure patterns, gaps, concerns
7. **Interview Question Generation** - Create specific questions based on findings

## Example Output

```markdown
# Candidate Research: Jane Doe

## TL;DR
Senior engineer with 8 years at high-growth startups. Strong open source presence.
Led infrastructure team at Series B company through 10x scale. No red flags detected.

## Career Timeline
| Years | Company | Role | Company Context |
|-------|---------|------|-----------------|
| 2021-now | Acme Corp | Staff Engineer | Series C, $50M raised, 200 employees |
| 2018-2021 | StartupX | Senior Engineer | Acquired by BigCo in 2021 for $100M |
...

## Red Flags
- No red flags detected

## Suggested Interview Questions
1. You were at StartupX during their acquisition by BigCo. What was your role in the transition?
2. Your GitHub shows contributions to distributed systems projects. Tell me about...
```

## Cost

The agent uses Claude's `WebSearch` tool which costs approximately:
- ~$0.01 per search
- ~10-25 searches per candidate
- **Estimated cost: $0.15-0.30 per candidate**

## License

MIT
