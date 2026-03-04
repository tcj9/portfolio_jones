import { motion } from "motion/react";
import { staggerContainerInView } from "../lib/animations";
import { getAllProjects } from "../data/projects";
import ProjectTeaserCard from "../components/ProjectTeaserCard";

/**
 * ProjectListPage — All Projects Grid
 *
 * Displays every project in a responsive 3-column grid.
 * Matches homepage section styling patterns.
 */
export default function ProjectListPage() {
  const projects = getAllProjects();

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden min-h-screen">
      {/* Background accent — matches homepage section pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-125 h-125 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-125 h-125 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6">
            <span className="header-text">Projects</span>
          </h1>
          <p className="text-lg max-w-2xl mx-auto leading-relaxed text-muted-foreground">
            Things I am, or have been, working on. Some are open source, some
            are not. Some are public, some are private. All of them are things I
            care about.
          </p>
        </motion.div>

        {/* Project Cards Grid — 3-col on desktop */}
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
