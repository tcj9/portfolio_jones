import HeroSection from '../components/HeroSection'
import AboutSection from '../components/AboutSection'
import ProjectsSection from '../components/ProjectsSection'
import SkillsSection from '../components/SkillsSection'
import ContactSection from '../components/ContactSection'

export default function HomePage() {
  return (
    <div>
      {/* Hero Section — Cinematic Scrollytelling */}
      <HeroSection />

      {/* About Section — Journey Timeline */}
      <AboutSection />

      {/* Projects Section — Featured Case Study Teasers */}
      <ProjectsSection />

      {/* Skills Section — Categorized Glow Cards */}
      <SkillsSection />

      {/* Contact Section — CTA + Form */}
      <ContactSection />
    </div>
  )
}
