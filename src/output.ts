import type { CandidateResearch } from "./types.js";

/**
 * Format candidate research as a markdown report
 */
export function formatMarkdownReport(research: CandidateResearch): string {
  const lines: string[] = [];

  // Header
  lines.push(`# Candidate Research: ${research.name}`);
  lines.push("");

  // TL;DR
  lines.push("## TL;DR");
  lines.push(research.tldr);
  lines.push("");

  // Career Timeline
  lines.push("## Career Timeline");
  if (research.careerTimeline.length > 0) {
    lines.push("| Years | Company | Role | Company Context |");
    lines.push("|-------|---------|------|-----------------|");
    for (const role of research.careerTimeline) {
      const years = escapeTableCell(role.years);
      const company = escapeTableCell(role.company);
      const roleTitle = escapeTableCell(role.role);
      const context = escapeTableCell(role.companyContext);
      lines.push(`| ${years} | ${company} | ${roleTitle} | ${context} |`);
    }
  } else {
    lines.push("*No career timeline information available*");
  }
  lines.push("");

  // Founder History
  lines.push("## Founder History");
  lines.push(research.founderHistory || "*No founder history found*");
  lines.push("");

  // Public Presence
  lines.push("## Public Presence");
  lines.push(`- **GitHub**: ${research.publicPresence.github}`);
  lines.push(`- **Twitter/X**: ${research.publicPresence.twitter}`);
  lines.push(`- **Writing**: ${research.publicPresence.writing}`);
  lines.push(`- **Talks**: ${research.publicPresence.talks}`);
  lines.push("");

  // Referral Paths
  lines.push("## Referral Paths");
  if (research.referralPaths.length > 0) {
    for (const path of research.referralPaths) {
      lines.push(`- ${path}`);
    }
  } else {
    lines.push("*No referral paths identified*");
  }
  lines.push("");

  // Red Flags
  lines.push("## Red Flags");
  if (research.redFlags.length > 0) {
    for (const flag of research.redFlags) {
      lines.push(`- ${flag}`);
    }
  } else {
    lines.push("- No red flags detected");
  }
  lines.push("");

  // Interview Questions
  lines.push("## Suggested Interview Questions");
  if (research.interviewQuestions.length > 0) {
    for (let i = 0; i < research.interviewQuestions.length; i++) {
      lines.push(`${i + 1}. ${research.interviewQuestions[i]}`);
    }
  } else {
    lines.push("*No specific interview questions generated*");
  }
  lines.push("");

  return lines.join("\n");
}

/**
 * Escape special characters for markdown table cells
 */
function escapeTableCell(text: string): string {
  if (!text) return "";
  return text
    .replace(/\|/g, "\\|")
    .replace(/\n/g, " ")
    .trim();
}
