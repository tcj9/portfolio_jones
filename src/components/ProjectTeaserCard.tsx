/**
 * ProjectTeaserCard — Reusable project card component
 *
 * Used on both the homepage featured section and the project list page.
 * Matches the original ProjectsSection card styling exactly.
 */

import { Link } from "react-router";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { staggerChildFadeUp } from "../lib/animations";
import { Badge } from "./ui/badge";
import ProjectIcon from "./ProjectIcon";
import type { ProjectTeaser } from "../data/types";

export default function ProjectTeaserCard({
  project,
}: {
  project: ProjectTeaser;
}) {
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
      {/* Coming Soon overlay */}
      {project.isComingSoonMode && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60 backdrop-blur-[2px]">
          <span className="text-lg font-bold text-white tracking-wide uppercase">
            Coming Soon
          </span>
        </div>
      )}

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
            <ProjectIcon name={project.iconName} className="w-8 h-8" />
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
