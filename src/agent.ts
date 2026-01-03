import { query } from "@anthropic-ai/claude-agent-sdk";
import type { CandidateInput, CandidateResearch } from "./types.js";
import { RESEARCH_SYSTEM_PROMPT, buildUserPrompt } from "./prompts.js";

/**
 * Research a candidate using the Claude Agent SDK with WebSearch
 */
export async function researchCandidate(
  input: CandidateInput,
  options?: { verbose?: boolean }
): Promise<CandidateResearch> {
  const verbose = options?.verbose ?? false;
  const userPrompt = buildUserPrompt(input);

  let resultText = "";

  // Use the Agent SDK's query function - it handles the agentic loop automatically
  for await (const message of query({
    prompt: userPrompt,
    options: {
      systemPrompt: RESEARCH_SYSTEM_PROMPT,
      allowedTools: ["WebSearch", "WebFetch"],
      permissionMode: "bypassPermissions", // No interactive prompts needed
    },
  })) {
    // Log progress in verbose mode
    if (verbose) {
      if (message.type === "assistant" && message.message?.content) {
        for (const block of message.message.content) {
          if ("text" in block) {
            const preview = block.text.substring(0, 200);
            console.error(`[Text]: ${preview}${block.text.length > 200 ? "..." : ""}`);
          } else if ("name" in block) {
            console.error(`[Tool]: ${block.name}`);
          }
        }
      }
    }

    // Capture the final result
    if (message.type === "result" && message.subtype === "success") {
      // The result contains Claude's final response
      if ("result" in message && typeof message.result === "string") {
        resultText = message.result;
      }
    }

    // Also capture assistant messages as they may contain the final output
    if (message.type === "assistant" && message.message?.content) {
      for (const block of message.message.content) {
        if ("text" in block) {
          resultText = block.text;
        }
      }
    }
  }

  if (verbose) {
    console.error("\nResearch complete. Parsing results...");
  }

  return parseResearchOutput(resultText);
}

/**
 * Parse Claude's response to extract the CandidateResearch JSON
 */
function parseResearchOutput(text: string): CandidateResearch {
  // Try to find JSON in the response
  const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```/);

  if (jsonMatch) {
    try {
      return JSON.parse(jsonMatch[1]) as CandidateResearch;
    } catch {
      // JSON parse failed, try to find raw JSON
    }
  }

  // Try to find raw JSON object
  const rawJsonMatch = text.match(/\{[\s\S]*"name"[\s\S]*\}/);
  if (rawJsonMatch) {
    try {
      return JSON.parse(rawJsonMatch[0]) as CandidateResearch;
    } catch {
      // Continue to fallback
    }
  }

  // Fallback: construct a basic response from text
  console.error("Warning: Could not parse JSON output. Creating fallback response.");

  return {
    name: "Unknown",
    tldr: text.substring(0, 500),
    careerTimeline: [],
    founderHistory: "Could not parse structured output",
    publicPresence: {
      github: "Unknown",
      twitter: "Unknown",
      writing: "Unknown",
      talks: "Unknown",
    },
    referralPaths: [],
    redFlags: ["Warning: Research output could not be parsed into structured format"],
    interviewQuestions: [],
  };
}
