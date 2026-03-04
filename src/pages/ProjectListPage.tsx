// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import { ArrowRight, Cog, Gamepad2, Zap } from "lucide-react";
// import { Badge } from "@/components/ui/badge";

// const projects = [
//   {
//     id: "one-drop",
//     title: "One Drop",
//     description:
//       "Creators need to distribute short-form video across multiple platforms without manual upload to each. Existing solutions are scheduler-first suites—One Drop is pure distribution.",
//     techStack: ["Next.js", "Convex", "Vercel", "TypeScript", "OAuth 2.0"],
//     icon: <Zap className="w-8 h-8" />,
//     gradient: "from-primary via-primary/40 to-chart-4/10",
//     glowColor: "rgba(34, 197, 94, 0.2)",
//     isFlagship: true,
//   },
//   {
//     id: "orchestrator",
//     title: "Orchestrator",
//     description:
//       "One Drop exposed the need for a generalized, reusable task orchestration system with retry policies, circuit breakers, and failure classification—extracted as a standalone framework.",
//     techStack: ["TypeScript", "Event-Driven", "State Machine", "Convex"],
//     icon: <Cog className="w-8 h-8" />,
//     gradient: "from-primary via-primary/40 to-chart-4/10",
//     glowColor: "rgba(34, 197, 94, 0.2)",
//     isFlagship: false,
//   },
//   {
//     id: "mini-games",
//     title: "Mini Games",
//     description:
//       "2+ player game container with modular, heavily animated games—Rock-Paper-Scissors, Heads or Tails, Tic-Tac-Toe—with session-based isolation and extensible architecture.",
//     techStack: ["React", "Motion.js", "TypeScript", "GitHub Pages"],
//     icon: <Gamepad2 className="w-8 h-8" />,
//     gradient: "from-primary via-primary/40 to-chart-4/10",
//     glowColor: "rgba(34, 197, 94, 0.2)",
//     isFlagship: false,
//   },
// ];

export default function ProjectListPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
      <p className="text-slate-400 mb-12">
        A collection of projects showcasing my work and problem-solving skills.
      </p>

      <div className="grid gap-8">
        {/* Project cards will go here */}
        <p className="text-slate-400 text-center">
          Project cards coming soon...
        </p>
      </div>
    </div>
  );
}
