#!/usr/bin/env node

import { Command } from "commander";
import { researchCandidate } from "./agent.js";
import { formatMarkdownReport } from "./output.js";
import type { CandidateInput } from "./types.js";

const program = new Command();

program
  .name("candidate-research")
  .description("AI-powered candidate research agent for hiring decisions")
  .version("1.0.0")
  .option("-u, --url <url>", "LinkedIn profile URL")
  .option("-n, --name <name>", "Candidate name")
  .option("-c, --company <company>", "Current company (use with --name)")
  .option("-v, --verbose", "Show research progress")
  .option("--json", "Output raw JSON instead of markdown")
  .action(async (options) => {
    // Validate input
    if (!options.url && !options.name) {
      console.error("Error: Provide either --url or --name (with optional --company)");
      console.error("");
      console.error("Examples:");
      console.error("  candidate-research --url https://linkedin.com/in/someone");
      console.error('  candidate-research --name "John Smith" --company "Acme Corp"');
      console.error('  candidate-research --name "Jane Doe"');
      process.exit(1);
    }

    // Check for API key
    if (!process.env.ANTHROPIC_API_KEY) {
      console.error("Error: ANTHROPIC_API_KEY environment variable is required");
      console.error("");
      console.error("Set it with:");
      console.error('  export ANTHROPIC_API_KEY="your-api-key"');
      process.exit(1);
    }

    const input: CandidateInput = {
      linkedinUrl: options.url,
      name: options.name,
      company: options.company,
    };

    try {
      if (options.verbose) {
        console.error("Starting candidate research...");
        console.error(`Input: ${JSON.stringify(input)}`);
      }

      const research = await researchCandidate(input, {
        verbose: options.verbose,
      });

      if (options.json) {
        console.log(JSON.stringify(research, null, 2));
      } else {
        console.log(formatMarkdownReport(research));
      }
    } catch (error) {
      console.error("Error during research:", error);
      process.exit(1);
    }
  });

program.parse();
