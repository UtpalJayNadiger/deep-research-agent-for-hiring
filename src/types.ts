/**
 * Input options for candidate research
 */
export interface CandidateInput {
  linkedinUrl?: string;
  name?: string;
  company?: string;
}

/**
 * A single role in the candidate's career timeline
 */
export interface CareerRole {
  years: string;
  company: string;
  role: string;
  companyContext: string;
}

/**
 * Public presence information
 */
export interface PublicPresence {
  github: string;
  twitter: string;
  writing: string;
  talks: string;
}

/**
 * Complete research output for a candidate
 */
export interface CandidateResearch {
  name: string;
  tldr: string;
  careerTimeline: CareerRole[];
  founderHistory: string;
  publicPresence: PublicPresence;
  referralPaths: string[];
  redFlags: string[];
  interviewQuestions: string[];
}
