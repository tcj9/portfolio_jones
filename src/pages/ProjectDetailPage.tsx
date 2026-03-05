import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ExternalLink,
  Github,
  AlertTriangle,
  Lightbulb,
  Target,
  Shield,
  BookOpen,
} from "lucide-react";
import { staggerContainerInView, staggerChildFadeUp } from "../lib/animations";
import { Badge } from "../components/ui/badge";
import { getProjectById } from "../data/projects";
import ProjectIcon from "../components/ProjectIcon";

/**
 * ProjectDetailPage — Full Case Study
 *
 * Renders a comprehensive project narrative with:
 * - Hero header with gradient + floating icon
 * - Problem / What it does / What it is NOT
 * - Technical decisions with reasoning & tradeoffs
 * - Challenges & solutions
 * - Outcome & lessons learned
 * - CTA links (live demo, GitHub)
 *
 * Animations: staggered section reveals, scroll-triggered entrances
 */
export default function ProjectDetailPage() {
  const { id } = useParams();
  const project = getProjectById(id ?? "");

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold">Project Not Found</h1>
          <p className="text-muted-foreground">
            The project you're looking for doesn't exist.
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  if (project.isComingSoonMode) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl sm:text-5xl font-bold">{project.title}</h1>
          <p className="text-xl text-muted-foreground font-medium">
            Coming Soon
          </p>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-emerald-400 font-semibold hover:text-emerald-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <article className="min-h-screen">
      {/* ——— Hero Section ——— */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className={`relative h-48 sm:h-56 md:h-80 bg-linear-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}
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
          className="relative z-10 w-24 h-24 md:w-32 md:h-32 rounded-3xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 shadow-2xl"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1, y: [0, -6, 0] }}
          transition={{
            scale: {
              type: "spring",
              visualDuration: 0.6,
              bounce: 0.3,
              delay: 0.2,
            },
            y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 },
          }}
        >
          <ProjectIcon
            name={project.iconName}
            className="w-10 h-10 md:w-14 md:h-14"
          />
        </motion.div>

        {/* Flagship badge */}
        {project.isFlagship && (
          <motion.div
            className="absolute top-4 right-4 sm:top-6 sm:right-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="text-xs sm:text-sm font-semibold text-white bg-white/20 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full border border-white/20">
              Flagship
            </span>
          </motion.div>
        )}

        {/* Status badge */}
        <motion.div
          className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <span className="text-xs sm:text-sm font-medium text-white bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/20">
            {project.status}
          </span>
        </motion.div>
      </motion.section>

      {/* ——— Content ——— */}
      <div className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Title + Subtitle + Tech Stack */}
          <motion.header
            initial="hidden"
            animate="visible"
            variants={staggerContainerInView}
            className="mb-12 md:mb-16"
          >
            <motion.div variants={staggerChildFadeUp}>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
                {project.title}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground font-medium mb-6">
                {project.subtitle}
              </p>
            </motion.div>

            <motion.div
              variants={staggerChildFadeUp}
              className="flex flex-wrap gap-2 mb-8"
            >
              {project.techStack.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="text-sm px-3 py-1.5 rounded-md"
                >
                  {tech}
                </Badge>
              ))}
            </motion.div>

            {/* CTA Links */}
            <motion.div
              variants={staggerChildFadeUp}
              className="flex flex-wrap gap-4"
            >
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30 px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors border border-emerald-500/30"
                >
                  <ExternalLink className="w-4 h-4" />
                  Live Demo
                </a>
              )}
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-card hover:bg-muted px-5 py-2.5 rounded-lg font-semibold text-sm transition-colors border border-primary/30"
                >
                  <Github className="w-4 h-4" />
                  Source Code
                </a>
              )}
            </motion.div>
          </motion.header>

          {/* ——— Case Study Sections ——— */}
          <div className="space-y-16 md:space-y-20">
            {/* Problem Statement */}
            <CaseStudySection
              icon={<Target className="w-5 h-5" />}
              title="The Problem"
            >
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                {project.description}
              </p>
            </CaseStudySection>

            {/* What It Does */}
            <CaseStudySection
              icon={<Lightbulb className="w-5 h-5" />}
              title="What It Does"
            >
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                {project.whatItDoes}
              </p>
              {project.whatItIsNot && (
                <div className="mt-4 p-4 rounded-lg bg-card border border-primary/20">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">
                      What it is NOT:{" "}
                    </span>
                    {project.whatItIsNot}
                  </p>
                </div>
              )}
            </CaseStudySection>

            {/* Constraints */}
            <CaseStudySection
              icon={<Shield className="w-5 h-5" />}
              title="Constraints"
            >
              <ul className="space-y-3">
                {project.constraints.map((constraint, i) => (
                  <motion.li
                    key={i}
                    variants={staggerChildFadeUp}
                    className="flex gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed"
                  >
                    <span className="text-emerald-400 mt-1.5 shrink-0">
                      &bull;
                    </span>
                    {constraint}
                  </motion.li>
                ))}
              </ul>
            </CaseStudySection>

            {/* Technical Decisions */}
            <CaseStudySection
              icon={<BookOpen className="w-5 h-5" />}
              title="Technical Decisions"
            >
              <div className="space-y-8">
                {project.technicalDecisions.map((decision, i) => (
                  <motion.div
                    key={i}
                    variants={staggerChildFadeUp}
                    className="p-5 sm:p-6 rounded-xl bg-card border border-primary/20 space-y-3"
                  >
                    <h4 className="text-lg font-bold">{decision.title}</h4>
                    <div className="space-y-2">
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        <span className="font-semibold text-foreground">
                          Reasoning:{" "}
                        </span>
                        {decision.reasoning}
                      </p>
                      <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                        <span className="font-semibold text-foreground">
                          Tradeoffs:{" "}
                        </span>
                        {decision.tradeoffs}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CaseStudySection>

            {/* Challenges */}
            <CaseStudySection
              icon={<AlertTriangle className="w-5 h-5" />}
              title="Challenges"
            >
              <ul className="space-y-3">
                {project.challenges.map((challenge, i) => (
                  <motion.li
                    key={i}
                    variants={staggerChildFadeUp}
                    className="flex gap-3 text-sm sm:text-base text-muted-foreground leading-relaxed"
                  >
                    <span className="text-amber-400 mt-1.5 shrink-0">
                      &bull;
                    </span>
                    {challenge}
                  </motion.li>
                ))}
              </ul>
            </CaseStudySection>

            {/* Outcome */}
            <CaseStudySection
              icon={<Target className="w-5 h-5" />}
              title="Outcome"
            >
              <p className="text-base sm:text-lg leading-relaxed text-muted-foreground">
                {project.outcome}
              </p>
            </CaseStudySection>

            {/* Lessons Learned */}
            <CaseStudySection
              icon={<Lightbulb className="w-5 h-5" />}
              title="Lessons Learned"
            >
              <ul className="space-y-4">
                {project.lessonsLearned.map((lesson, i) => (
                  <motion.li
                    key={i}
                    variants={staggerChildFadeUp}
                    className="p-4 rounded-lg bg-card border border-primary/15 text-sm sm:text-base text-muted-foreground leading-relaxed"
                  >
                    {lesson}
                  </motion.li>
                ))}
              </ul>
            </CaseStudySection>

            {/* Why It Matters */}
            <CaseStudySection
              icon={<BookOpen className="w-5 h-5" />}
              title="Why It Matters"
            >
              <div className="p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                <p className="text-base sm:text-lg leading-relaxed text-muted-foreground italic">
                  {project.whyItMatters}
                </p>
              </div>
            </CaseStudySection>
          </div>

          {/* ——— Bottom Navigation ——— */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 md:mt-24 pt-8 border-t border-primary/20 flex flex-col sm:flex-row items-center justify-between gap-4"
          >
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              All Projects
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors font-semibold group"
            >
              Back to Home
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </div>
    </article>
  );
}

// ——————————————————————————————————————
// Case Study Section wrapper
// ——————————————————————————————————————

function CaseStudySection({
  icon,
  title,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={{
        ...staggerContainerInView,
        visible: {
          ...staggerContainerInView.visible,
          transition: {
            ...staggerContainerInView.visible.transition,
            staggerChildren: 0.1,
          },
        },
      }}
    >
      <motion.div
        variants={staggerChildFadeUp}
        className="flex items-center gap-3 mb-6"
      >
        <div className="w-8 h-8 rounded-lg bg-emerald-500/15 flex items-center justify-center text-emerald-400">
          {icon}
        </div>
        <h2 className="text-xl sm:text-2xl font-bold">{title}</h2>
      </motion.div>
      <motion.div variants={staggerChildFadeUp}>{children}</motion.div>
    </motion.section>
  );
}
