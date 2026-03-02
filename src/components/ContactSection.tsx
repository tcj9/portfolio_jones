import { motion } from 'motion/react'
import {
  staggerContainerInView,
  staggerChildFadeUp,
} from '../lib/animations'
import { Mail, Github, Linkedin, Send, ArrowUpRight } from 'lucide-react'

/**
 * ContactSection — CTA Layout + Simple Contact Form
 *
 * Left: Strategic CTA with contact links (email, GitHub, LinkedIn)
 * Right: Compact contact form (name, email, message)
 * Animation: staggered entrance, hover effects on links
 */

const contactLinks = [
  {
    label: 'Email',
    value: 'courtezj23@gmail.com',
    href: 'mailto:courtezj23@gmail.com',
    icon: <Mail className="w-5 h-5" />,
  },
  {
    label: 'GitHub',
    value: 'tcj9',
    href: 'https://github.com/tcj9',
    icon: <Github className="w-5 h-5" />,
  },
  {
    label: 'LinkedIn',
    value: 'courtezjones',
    href: 'https://www.linkedin.com/in/courtezjones',
    icon: <Linkedin className="w-5 h-5" />,
  },
]

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-emerald-500/[0.03] rounded-full blur-3xl" />
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
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-linear-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Open to impactful engineering opportunities, leadership roles,
            and system design challenges.
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          variants={staggerContainerInView}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16"
        >
          {/* Left — CTA + Links */}
          <motion.div variants={staggerChildFadeUp} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-slate-100">
                Let's build something that lasts.
              </h3>
              <p className="text-slate-400 leading-relaxed">
                Whether it's a senior engineering role, a systems architecture
                conversation, or a collaboration on infrastructure that
                matters—I'd like to hear from you.
              </p>
            </div>

            {/* Contact Links */}
            <div className="space-y-3">
              {contactLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={
                    link.href.startsWith('http')
                      ? 'noopener noreferrer'
                      : undefined
                  }
                  variants={staggerChildFadeUp}
                  whileHover={{
                    x: 4,
                    backgroundColor: 'rgba(34, 197, 94, 0.05)',
                  }}
                  transition={{
                    type: 'spring',
                    visualDuration: 0.3,
                    bounce: 0.2,
                  }}
                  className="flex items-center gap-4 p-4 rounded-xl border border-slate-700/50 bg-slate-800/20 hover:border-emerald-500/30 transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-slate-700/50 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                    {link.icon}
                  </div>
                  <div className="flex-1">
                    <span className="text-xs text-slate-500 uppercase tracking-wider font-medium">
                      {link.label}
                    </span>
                    <p className="text-slate-200 font-medium">{link.value}</p>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right — Contact Form */}
          <motion.div variants={staggerChildFadeUp}>
            <form
              action="https://formspree.io/f/placeholder"
              method="POST"
              className="space-y-5 p-6 md:p-8 rounded-xl border border-slate-700/50 bg-slate-800/20 backdrop-blur-sm"
            >
              <div className="space-y-1.5">
                <label
                  htmlFor="contact-name"
                  className="text-sm font-medium text-slate-300"
                >
                  Name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  required
                  placeholder="Your name"
                  className="w-full px-4 py-3 rounded-lg bg-slate-900/60 border border-slate-600/40 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 transition-all text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-email"
                  className="text-sm font-medium text-slate-300"
                >
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg bg-slate-900/60 border border-slate-600/40 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 transition-all text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="contact-message"
                  className="text-sm font-medium text-slate-300"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about the opportunity or challenge..."
                  className="w-full px-4 py-3 rounded-lg bg-slate-900/60 border border-slate-600/40 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/40 focus:border-emerald-500/40 transition-all text-sm resize-none"
                />
              </div>

              <motion.button
                type="submit"
                whileHover={{
                  scale: 1.02,
                  boxShadow: '0 0 30px rgba(34, 197, 94, 0.3)',
                }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3.5 px-6 rounded-lg bg-emerald-500 text-slate-900 font-semibold text-sm flex items-center justify-center gap-2 hover:bg-emerald-400 transition-colors cursor-pointer"
              >
                <Send className="w-4 h-4" />
                Send Message
              </motion.button>

              <p className="text-xs text-slate-600 text-center">
                Or email me directly at{' '}
                <a
                  href="mailto:courtezj23@gmail.com"
                  className="text-emerald-500 hover:underline"
                >
                  courtezj23@gmail.com
                </a>
              </p>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
