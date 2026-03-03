import React from "react";
import { motion } from "motion/react";
import { scrollFadeInAnimation } from "../lib/animations";

interface SectionProps {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  animateOnScroll?: boolean;
}

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
  animateOnScroll = true,
}: SectionProps) {
  return (
    <motion.section
      id={id}
      {...(animateOnScroll && scrollFadeInAnimation)}
      className={`py-20 px-4 sm:px-6 lg:px-8 ${className}`}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        {title && (
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-linear-to-r primary to-cyan-400 bg-clip-text text-transparent">
                {title}
              </span>
            </h2>
            {subtitle && <p className="text-lg text-slate-400">{subtitle}</p>}
          </motion.div>
        )}

        {/* Section Content */}
        {children}
      </div>
    </motion.section>
  );
}
