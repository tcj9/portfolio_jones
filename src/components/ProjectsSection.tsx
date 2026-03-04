import { Link } from "react-router";
import { motion } from "motion/react";
import { staggerContainerInView, staggerChildFadeUp } from "../lib/animations";
import { ArrowRight, Zap, Cog, Gamepad2 } from "lucide-react";
import { Badge } from "./ui/badge";

/**
 * ProjectsSection — Featured Project Teasers
 *
 * 2-3 flagship project cards with:
 * - Styled placeholder graphics (gradient + icon)
 * - Title, tech stack, brief problem statement
 * - "View Case Study" CTA
 * - Hover elevation, stagger entrance animation
 */

interface ProjectTeaser {
  id: string;
  title: string;
  subtitle: string;
  problem: string;
  techStack: string[];
  icon: React.ReactNode;
  gradient: string;
  glowColor: string;
  isFlagship: boolean;
}

const projects: ProjectTeaser[] = [
  {
    id: "one-drop-video",
    title: "One Drop Video",
    subtitle: "Distribution Engine",
    problem:
      "Creators need to distribute short-form video across multiple platforms without manual upload to each. Existing solutions are scheduler-first suites—One Drop is pure distribution.",
    techStack: ["Next.js", "Convex", "Vercel", "TypeScript", "OAuth 2.0"],
    icon: <Zap className="w-8 h-8" />,
    gradient: "from-primary via-primary/40 to-chart-4/10",
    glowColor: "rgba(34, 197, 94, 0.2)",
    isFlagship: true,
  },
  {
    id: "job-processing-framework",
    title: "Job Processing Framework",
    subtitle: "Resilient Task Engine",
    problem:
      "One Drop exposed the need for a generalized, reusable task orchestration system with retry policies, circuit breakers, and failure classification—extracted as a standalone framework.",
    techStack: ["TypeScript", "Event-Driven", "State Machine", "Convex"],
    icon: <Cog className="w-8 h-8" />,
    gradient: "from-primary via-primary/40 to-chart-4/10",
    glowColor: "rgba(34, 197, 94, 0.2)",
    isFlagship: false,
  },
  {
    id: "mini-games",
    title: "Mini Games",
    subtitle: "Animation Showcase",
    problem:
      "2+ player game container with modular, heavily animated games—Rock-Paper-Scissors, Heads or Tails, Tic-Tac-Toe—with session-based isolation and extensible architecture.",
    techStack: ["React", "Motion.js", "TypeScript", "GitHub Pages"],
    icon: <Gamepad2 className="w-8 h-8" />,
    gradient: "from-primary via-primary/40 to-chart-4/10",
    glowColor: "rgba(34, 197, 94, 0.2)",
    isFlagship: false,
  },
];

function ProjectTeaserCard({ project }: { project: ProjectTeaser }) {
  return (
    <motion.div
      variants={staggerChildFadeUp}
      whileHover={{
        y: -8,
        boxShadow: `0 24px 64px ${project.glowColor}, 0 8px 32px rgba(0, 0, 0, 0.4)`,
      }}
      transition={{ type: "spring", visualDuration: 0.3, bounce: 0.15 }}
      className="group relative rounded-xl border border-primary/40 bg-card backdrop-blur-sm overflow-hidden"
    >
      <Link to={`/projects/${project.id}`} className="block">
        {/* Placeholder Image — gradient + icon */}
        <div
          className={`relative h-48 md:h-56 bg-linear-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
        >
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 1px, transparent 1px),
                  radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 1px, transparent 1px),
                  radial-gradient(circle at 40% 80%, rgba(255,255,255,0.06) 1px, transparent 1px)`,
                backgroundSize: "60px 60px, 80px 80px, 100px 100px",
              }}
            />
          </div>

          {/* Floating icon */}
          <motion.div
            className="relative z-10 w-20 h-20 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-2xl"
            animate={{
              y: [0, -6, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {project.icon}
          </motion.div>

          {/* Hover shimmer */}
          <motion.div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

          {/* Flagship badge */}
          {project.isFlagship && (
            <div className="absolute top-4 right-4">
              <span className="text-xs font-semibold text-white bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
                Flagship
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Title + Subtitle */}
          <div>
            <h3 className="text-xl font-bold group-hover:text-emerald-400 transition-colors duration-300">
              {project.title}
            </h3>
            <span className="text-sm text-muted-foreground font-medium">
              {project.subtitle}
            </span>
          </div>

          {/* Problem Statement */}
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
            {project.problem}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <Badge
                key={tech}
                variant="secondary"
                className="text-xs px-2.5 py-1 rounded-md"
              >
                {tech}
              </Badge>
            ))}
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-slate-700/30 flex items-center justify-between">
            <span className="text-emerald-400 font-semibold text-sm flex items-center gap-2">
              View Case Study
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-0 w-125 h-125 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-125 h-125 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            <span className="header-text">Featured Projects</span>
          </h2>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed">
            Each project is a case study in solving real problems.
          </p>
        </motion.div>

        {/* Project Cards Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            ...staggerContainerInView,
            visible: {
              ...staggerContainerInView.visible,
              transition: {
                ...staggerContainerInView.visible.transition,
                staggerChildren: 0.15,
              },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <ProjectTeaserCard key={project.id} project={project} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
