/**
 * Project Data Types
 *
 * Single source of truth for all project-related interfaces.
 * Used across featured section, project list page, and detail pages.
 */

// ——————————————————————————————————————
// Teaser (card-level) types
// ——————————————————————————————————————

/** Icon identifier — maps to Lucide icon components */
export type ProjectIconName = "Zap" | "Gamepad2" | "BookOpen" | "Cog" | "Code";

/** Teaser-level project data for cards on homepage + list page */
export interface ProjectTeaser {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  techStack: string[];
  iconName: ProjectIconName;
  gradient: string;
  glowColor: string;
  isFlagship: boolean;
  isComingSoonMode?: boolean;
}

// ——————————————————————————————————————
// Detail (case study) types
// ——————————————————————————————————————

/** A single technical decision with rationale */
export interface TechnicalDecision {
  title: string;
  reasoning: string;
  tradeoffs: string;
}

/** Full case study data for the project detail page */
export interface ProjectDetail extends ProjectTeaser {
  /** Long-form description of the project */
  description: string;

  /** What the project does (elevator pitch) */
  whatItDoes: string;

  /** What the project is NOT */
  whatItIsNot?: string;

  /** Constraints faced during development */
  constraints: string[];

  /** Key technical decisions with reasoning */
  technicalDecisions: TechnicalDecision[];

  /** Challenges encountered and how they were solved */
  challenges: string[];

  /** Outcome and impact (measurable where possible) */
  outcome: string;

  /** Lessons learned from the project */
  lessonsLearned: string[];

  /** Why this project matters for the portfolio narrative */
  whyItMatters: string;

  /** Current status of the project */
  status: string;

  /** Live URL (if deployed) */
  liveUrl?: string;

  /** GitHub repository URL */
  repoUrl?: string;

  /** Path to hero image in public/assets/ */
  heroImage?: string;
}
