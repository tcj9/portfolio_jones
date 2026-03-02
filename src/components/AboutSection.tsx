import { motion } from 'motion/react'
import {
  staggerContainerInView,
  staggerChildFadeUp,
  timelineNodeEntrance,
  timelineLineGrow,
} from '../lib/animations'
import {
  Code2,
  Building2,
  Shield,
  Rocket,
} from 'lucide-react'

/**
 * AboutSection — Journey Timeline
 *
 * Animated vertical timeline: apprenticeship → contractor → infrastructure → present
 * Each milestone enters with staggered animation on scroll.
 * Connects: Curiosity → Discipline → Enterprise Responsibility → Long-Term Thinking
 */

interface TimelineMilestone {
  year: string
  title: string
  description: string
  icon: React.ReactNode
  accent: string
}

const milestones: TimelineMilestone[] = [
  {
    year: '2017–2019',
    title: 'Foundation & Community',
    description:
      'Started in a college-affiliated apprenticeship building full-stack applications for local organizations—while introducing elementary students to programming. Real-world execution met community impact from day one.',
    icon: <Code2 className="w-5 h-5" />,
    accent: 'from-emerald-400 to-cyan-400',
  },
  {
    year: '2019–2023',
    title: 'Enterprise & Leadership',
    description:
      'Lead Software Engineer and government contractor supporting statewide enterprise applications. Led front-end initiatives, designed database schemas, built CI/CD pipelines, onboarded developers, and served as the escalation point for production incidents across systems over a decade old.',
    icon: <Building2 className="w-5 h-5" />,
    accent: 'from-cyan-400 to-blue-500',
  },
  {
    year: '2024',
    title: 'Infrastructure Recovery',
    description:
      'Rebuilt internal infrastructure after a ransomware incident. Modernized server environments, improved operational reliability, and strengthened security posture—earning CompTIA Network+ and Security+ certifications along the way.',
    icon: <Shield className="w-5 h-5" />,
    accent: 'from-blue-500 to-violet-500',
  },
  {
    year: '2025–Present',
    title: 'Building What Lasts',
    description:
      'Channeling eight years of enterprise depth, security literacy, and systems thinking into architecture that endures. Building scalable platforms, extracting reusable frameworks, and pursuing engineering that strengthens communities.',
    icon: <Rocket className="w-5 h-5" />,
    accent: 'from-violet-500 to-emerald-400',
  },
]

function TimelineNode({
  milestone,
  index,
  isLast,
}: {
  milestone: TimelineMilestone
  index: number
  isLast: boolean
}) {
  const isLeft = index % 2 === 0

  return (
    <motion.div
      variants={staggerChildFadeUp}
      className="relative grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-8 items-start"
    >
      {/* Left content (even items) or spacer (odd items) */}
      <div
        className={`${isLeft ? 'text-right' : ''} ${
          isLeft ? 'block' : 'hidden md:block'
        }`}
      >
        {isLeft && (
          <motion.div
            variants={staggerChildFadeUp}
            className="space-y-3"
          >
            <span
              className={`inline-block text-sm font-mono font-semibold tracking-wider bg-linear-to-r ${milestone.accent} bg-clip-text text-transparent`}
            >
              {milestone.year}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-slate-100">
              {milestone.title}
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              {milestone.description}
            </p>
          </motion.div>
        )}
      </div>

      {/* Center — node + connector line */}
      <div className="flex flex-col items-center">
        <motion.div
          variants={timelineNodeEntrance}
          className={`relative z-10 w-12 h-12 rounded-full border-2 border-emerald-500/60 bg-slate-900 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20`}
        >
          {milestone.icon}
          {/* Pulse ring */}
          <motion.div
            className="absolute inset-0 rounded-full border border-emerald-400/30"
            animate={{
              scale: [1, 1.6, 1.6],
              opacity: [0.4, 0, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: index * 0.5,
              ease: 'easeOut',
            }}
          />
        </motion.div>

        {/* Connector line */}
        {!isLast && (
          <motion.div
            variants={timelineLineGrow}
            className="w-px h-16 md:h-24 bg-gradient-to-b from-emerald-500/40 to-transparent origin-top"
          />
        )}
      </div>

      {/* Right content (odd items) or spacer (even items) */}
      <div className={`${!isLeft ? 'block' : 'hidden md:block'}`}>
        {!isLeft && (
          <motion.div
            variants={staggerChildFadeUp}
            className="space-y-3"
          >
            <span
              className={`inline-block text-sm font-mono font-semibold tracking-wider bg-linear-to-r ${milestone.accent} bg-clip-text text-transparent`}
            >
              {milestone.year}
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-slate-100">
              {milestone.title}
            </h3>
            <p className="text-slate-400 leading-relaxed text-sm md:text-base">
              {milestone.description}
            </p>
          </motion.div>
        )}
      </div>

      {/* Mobile: show content below node for the "hidden" side */}
      <div className={`col-span-3 md:hidden ${isLeft ? 'hidden' : ''}`}>
        <motion.div variants={staggerChildFadeUp} className="space-y-3 pl-4">
          <span
            className={`inline-block text-sm font-mono font-semibold tracking-wider bg-linear-to-r ${milestone.accent} bg-clip-text text-transparent`}
          >
            {milestone.year}
          </span>
          <h3 className="text-xl font-bold text-slate-100">
            {milestone.title}
          </h3>
          <p className="text-slate-400 leading-relaxed text-sm">
            {milestone.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-emerald-500/[0.03] rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              The Journey
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            From disassembling Xbox CD drives out of curiosity to rebuilding
            statewide infrastructure after ransomware—every chapter built on the
            last.
          </p>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={staggerContainerInView}
          className="space-y-2"
        >
          {milestones.map((milestone, i) => (
            <TimelineNode
              key={milestone.year}
              milestone={milestone}
              index={i}
              isLast={i === milestones.length - 1}
            />
          ))}
        </motion.div>

        {/* Narrative Footer — personal touches */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: 'easeOut',
            delay: 0.3,
          }}
          viewport={{ once: true }}
          className="mt-20 max-w-3xl mx-auto text-center space-y-6"
        >
          <p className="text-slate-300 leading-relaxed text-base md:text-lg">
            Outside of engineering, I'm a father, a fitness enthusiast, and someone who
            grew up watching <span className="text-emerald-400 font-medium">Death Note</span> and{' '}
            <span className="text-cyan-400 font-medium">Naruto</span>—drawn to stories about
            strategic thinking, relentless growth, and the will to protect what matters.
          </p>
          <p className="text-slate-400 leading-relaxed text-sm md:text-base">
            That same curiosity that had me fixing consoles at twelve still drives me today.
            Technology should strengthen communities, advance equality, and scale responsibly.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
