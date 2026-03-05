/**
 * Projects Data — Single Source of Truth
 *
 * All project data lives here and is imported by:
 * - ProjectsSection (featured, homepage)
 * - ProjectListPage (all projects)
 * - ProjectDetailPage (individual case study)
 */

import type { ProjectDetail, ProjectIconName } from "./types";
import { Zap, Gamepad2, BookOpen, Cog, Code } from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ——————————————————————————————————————
// Icon resolver — maps string names to Lucide components
// ——————————————————————————————————————

const iconMap: Record<ProjectIconName, LucideIcon> = {
  Zap,
  Gamepad2,
  BookOpen,
  Cog,
  Code,
};

/** Resolve an icon name to its Lucide component (stable reference) */
export function getIconComponent(name: ProjectIconName): LucideIcon {
  return iconMap[name];
}

// ——————————————————————————————————————
// Project definitions
// ——————————————————————————————————————

export const projects: ProjectDetail[] = [
  {
    id: "one-drop-video",
    title: "One Drop Video",
    subtitle: "Distribution Engine",
    problem:
      "Creators need to distribute short-form video across multiple platforms without manual upload to each. Existing solutions are scheduler-first suites—One Drop is pure distribution.",
    techStack: ["Next.js", "Convex", "Vercel", "TypeScript", "OAuth 2.0"],
    iconName: "Zap",
    gradient: "from-primary via-primary/40 to-chart-4/10",
    glowColor: "rgba(34, 197, 94, 0.2)",
    isFlagship: true,

    // Detail fields
    description:
      "One Drop Video is a creator-first distribution engine that eliminates the manual, repetitive process of uploading short-form video to multiple platforms. Instead of logging into TikTok, Instagram, YouTube Shorts, and Facebook separately, creators upload once, write one description, select their platforms, and distribute simultaneously.",
    whatItDoes:
      "One video → one description → select platforms → distribute simultaneously → view normalized stats → retry failed deliveries within 24h.",
    whatItIsNot:
      "Not a social media management suite, scheduler, inbox, or content calendar. One Drop is pure distribution — focused and deliberate.",
    constraints: [
      "Platform API rate limits vary significantly across TikTok, Instagram, YouTube, and Facebook",
      "Async OAuth token management across 4+ platforms with different refresh policies",
      "Platform-specific failure modes (TikTok processing delays, Instagram aspect ratio validation, YouTube quota limits)",
      "Network resilience — deliveries must survive intermittent failures without data loss",
    ],
    technicalDecisions: [
      {
        title: "Why Next.js + Convex?",
        reasoning:
          "Next.js provides server-side rendering for the dashboard and API routes for OAuth callbacks. Convex gives real-time reactivity — when a delivery completes or fails, the dashboard updates instantly without polling. The combination provides both a great DX and a snappy UX.",
        tradeoffs:
          "Convex is a newer backend — fewer community solutions for edge cases. But its real-time primitives and built-in scheduling made it ideal for async delivery orchestration vs. building a custom pub/sub layer.",
      },
      {
        title: "Asynchronous Distribution Engine",
        reasoning:
          "Each platform delivery is isolated as an independent async job. If TikTok fails, Instagram and YouTube deliveries continue unaffected. This failure isolation prevents cascading failures across platforms.",
        tradeoffs:
          "More complex state management (each delivery has its own lifecycle) vs. a simpler synchronous queue. The complexity pays off in reliability and user confidence.",
      },
      {
        title: "OAuth Credential Security",
        reasoning:
          "All OAuth tokens are encrypted at rest. Preemptive token refresh runs before delivery attempts to prevent mid-delivery auth failures — the worst possible failure mode for a distribution tool.",
        tradeoffs:
          "Proactive refresh adds background compute cost, but eliminates the class of auth-related delivery failures entirely.",
      },
      {
        title: "Exponential Retry with State-Based Completion",
        reasoning:
          "Failed deliveries retry with exponential backoff. A state machine tracks each delivery's lifecycle (pending → processing → success/failed/retrying) so the system knows exactly where every delivery stands at any moment.",
        tradeoffs:
          "State machines add architectural complexity, but they make the system debuggable and auditable — critical for a tool handling creator content.",
      },
    ],
    challenges: [
      "TikTok's upload API has processing delays that don't surface errors until minutes after upload — required async polling for true delivery status",
      "Instagram requires specific aspect ratios and video formats that differ from other platforms — built a pre-validation layer to catch issues before delivery attempt",
      "OAuth token refresh timing across 4+ platforms with different TTLs — implemented a unified preemptive refresh scheduler",
      "Handling partial delivery success (2 of 4 platforms succeed) — UX challenge of representing partial state clearly to creators",
    ],
    outcome:
      "Architecture engineered for production-grade reliability. Platform isolation ensures single-platform failures never cascade. Real-time dashboard provides immediate delivery status visibility. The retry system demonstrates 100% eventual delivery for transient failures in testing.",
    lessonsLearned: [
      "Multi-platform integration is fundamentally an exercise in failure classification — understanding which errors are transient vs. permanent changes your entire retry strategy",
      "Real-time UX is a reliability signal, not just a feature — when users can see delivery status updating live, they trust the system more and file fewer support requests",
      "Building One Drop exposed the need for a generalized retry + failure classification model, which could be extracted as a reusable job orchestration framework",
    ],
    whyItMatters:
      "Demonstrates full-stack architecture thinking — from OAuth security to async job orchestration to real-time UX. Shows ability to design systems that handle failure gracefully, not just success paths.",
    status: "In development",
    liveUrl: "https://onedropvideo.com",
  },
  {
    id: "mini-games",
    title: "Mini Games",
    subtitle: "Animation Showcase",
    problem:
      "2+ player game container with modular, heavily animated games—Rock-Paper-Scissors, Heads or Tails, Tic-Tac-Toe—with session-based isolation and extensible architecture.",
    techStack: ["React", "Motion.js", "TypeScript", "Vite"],
    iconName: "Gamepad2",
    gradient: "from-primary via-primary/40 to-chart-4/10",
    glowColor: "rgba(34, 197, 94, 0.2)",
    isFlagship: false,

    description:
      "Mini Games is a modular game container that demonstrates cinematic animation techniques in a playable, interactive context. Each game (Rock-Paper-Scissors, Heads or Tails, Tic-Tac-Toe) is a self-contained module with its own game state, animations, and UI — but they share a common session management layer that keeps multiplayer games isolated and extensible.",
    whatItDoes:
      "A 2+ player game container where each game module can be loaded independently. Players create or join sessions, play through animated rounds, and see outcomes with cinematic transitions. Games are designed to be imported into each other for meta-game experiences.",
    constraints: [
      "No backend — all game state is client-side with session tokens for isolation",
      "GitHub Pages hosting limits to static deployment — no WebSocket or server-side game state",
      "Animation performance must be smooth on mobile devices during complex game transitions",
      "Modular architecture — each game must be independently importable without coupling to the container",
    ],
    technicalDecisions: [
      {
        title: "Why React + Motion.js?",
        reasoning:
          "React's component model maps naturally to game modules — each game is a self-contained component tree. Motion.js provides hardware-accelerated animations with spring physics that feel natural and responsive, critical for game feedback.",
        tradeoffs:
          "A canvas-based approach (PixiJS, Phaser) would offer more control for complex visual effects, but React + Motion gives better developer ergonomics and a familiar component architecture for portfolio demonstration.",
      },
      {
        title: "Session-Based Game Isolation",
        reasoning:
          "Each game session is identified by a token. This keeps multiplayer state isolated — two pairs of players can play the same game simultaneously without interference. The session layer is reusable across all game modules.",
        tradeoffs:
          "Client-side session management means sessions don't persist across page reloads. For a demo/portfolio project, this is acceptable. A production version would add server-side session storage.",
      },
      {
        title: "Modular Game Architecture",
        reasoning:
          "Each game exports a standard interface (init, play, reset, getState). The container just renders whichever game module is selected. This makes adding new games trivial — implement the interface, register the module.",
        tradeoffs:
          "The standardized interface constrains game designs somewhat, but it enables the extensibility that makes the architecture interesting.",
      },
    ],
    challenges: [
      "Choreographing complex multi-step animations (reveal → compare → result → celebration) without blocking game logic required careful separation of animation and state timelines",
      "Mobile touch targets needed to be large enough for game interactions while keeping the UI visually clean — solved with invisible touch-expansion layers",
      "Balancing animation richness with performance on lower-end mobile devices — implemented animation complexity tiers based on device capability detection",
    ],
    outcome:
      "A playable, beautifully animated game container that demonstrates production-quality animation engineering. The modular architecture allows new games to be added in under an hour. Live and playable on GitHub Pages.",
    lessonsLearned: [
      "Animation choreography is a design discipline — sequencing, timing, and easing decisions have as much impact as visual design choices",
      "Game state machines and UI state machines are fundamentally different — trying to combine them creates complexity; separating them creates clarity",
      "Mobile animation performance requires intentional optimization — default settings that look great on desktop can cause frame drops on phones",
    ],
    whyItMatters:
      "Direct showcase of Motion.js expertise and cinematic animation engineering. Demonstrates ability to build modular, extensible architecture — the same principles that apply to enterprise plugin systems.",
    status: "Live",
    liveUrl: "https://minigames-nu.vercel.app/",
    repoUrl: "https://github.com/tcj-23/mini_games.git",
  },
  {
    id: "doc-supreme",
    isComingSoonMode: true,
    title: "Doc Supreme",
    subtitle: "Documentation Platform",
    problem:
      "Development teams need a single-source-of-truth documentation system for tools, libraries, and APIs that are versioned, searchable, and always current with the actual code they use.",
    techStack: ["Markdown", "Vite", "TypeScript", "Dark UI"],
    iconName: "BookOpen",
    gradient: "from-primary via-primary/40 to-chart-4/10",
    glowColor: "rgba(34, 197, 94, 0.2)",
    isFlagship: false,
    description:
      "Doc Supreme is a documentation platform built to solve a personal pain point: keeping track of API references, library documentation, and tool configurations across multiple projects. Instead of relying on bookmarks and scattered notes, Doc Supreme provides versioned, structured documentation with syntax highlighting and a clean dark UI optimized for long reading sessions.",
    whatItDoes:
      "A local documentation platform that organizes technical references by tool/library, supports versioning (e.g., React v19.2, Motion v12.34.3), and renders Markdown with full syntax highlighting. Used daily as a personal knowledge base.",
    constraints: [
      "Must work locally without a backend or cloud dependency",
      "Content must be Markdown-based for portability and version control",
      "UI must be optimized for extended reading sessions (dark theme, clean typography, minimal distractions)",
      "Must support versioned documentation — can have React v19.2 and a future version side by side",
    ],
    technicalDecisions: [
      {
        title: "Why Markdown-Based Content?",
        reasoning:
          "Markdown is version-controllable, portable, and readable in raw form. It integrates with Git workflows naturally — documentation changes can be tracked alongside code changes. No proprietary format lock-in.",
        tradeoffs:
          "Markdown has limited interactivity compared to MDX or custom components. For a reference platform focused on reading (not interaction), this is the right tradeoff.",
      },
      {
        title: "Why Vite for a Documentation Tool?",
        reasoning:
          "Vite's lightning-fast HMR makes editing documentation feel immediate. The build tooling handles Markdown transformation, syntax highlighting, and static asset optimization with minimal configuration.",
        tradeoffs:
          "A purpose-built docs framework (Docusaurus, VitePress) would provide more out-of-the-box features, but building from scratch demonstrates understanding of the underlying systems and allows full customization.",
      },
    ],
    challenges: [
      "Organizing documentation across multiple tools, each with multiple versions, required a clear folder hierarchy and routing convention",
      "Syntax highlighting for 10+ languages required careful theme configuration to maintain readability across all languages in dark mode",
      "Ensuring documentation stays current — built a workflow that makes updating docs as frictionless as possible to reduce maintenance resistance",
    ],
    outcome:
      "A personal documentation platform used daily for development reference. Hosts docs for React, Motion, React Router, ShadCN, Luxon, Vite, and more. Demonstrates documentation discipline — the same discipline applied to enterprise codebases and onboarding materials.",
    lessonsLearned: [
      "The best documentation system is the one you actually use — making it frictionless to add and update content matters more than feature richness",
      "Versioned documentation prevents the dangerous 'which version does this apply to?' problem that plagues team knowledge bases",
      "Building your own tooling gives you deep understanding of the tools you use — this project sharpened my knowledge of Vite, Markdown pipelines, and static site architecture",
    ],
    whyItMatters:
      "Shows commitment to documentation discipline — a core quality for senior engineers. Also demonstrates the build-your-own-tools mindset and the practical workflow behind this portfolio's development (Doc Supreme is literally where these docs live).",
    status: "Active — used daily",
    repoUrl: "https://github.com/tcj-23/doc_supreme",
  },
];

// ——————————————————————————————————————
// Data access helpers
// ——————————————————————————————————————

/**
 * Returns 2 featured projects for the homepage:
 * 1 flagship (always included) + 1 random support project
 *
 * Random selection changes every visit (no caching).
 */
export function getRandomFeaturedProjects(): [ProjectDetail, ProjectDetail] {
  const flagship = projects.find((p) => p.isFlagship);
  const support = projects.filter((p) => !p.isFlagship);

  if (!flagship) {
    throw new Error("No flagship project found in projects data");
  }

  const randomSupport = support[Math.floor(Math.random() * support.length)];

  return [flagship, randomSupport];
}

/** Retrieve a single project by its ID (for detail page routing) */
export function getProjectById(id: string): ProjectDetail | undefined {
  return projects.find((p) => p.id === id);
}

/** Get all projects (for list page) */
export function getAllProjects(): ProjectDetail[] {
  return projects;
}
