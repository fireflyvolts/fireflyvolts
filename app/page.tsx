'use client'

import { Header } from '@/components/sections/header'
import { HeroSection } from '@/components/sections/hero-section'
import { ProblemSection } from '@/components/sections/problem-section'
import { StatsBar } from '@/components/sections/stats-bar'
import { ROICalculator } from '@/components/calculator/roi-calculator'
import { SolutionSection } from '@/components/sections/solution-section'
import { CaseStudies } from '@/components/sections/case-studies'
import { ProcessTimeline } from '@/components/sections/process-timeline'
import { FAQSection } from '@/components/sections/faq-section'
import { FinalCTA } from '@/components/sections/final-cta'
import { Footer } from '@/components/sections/footer'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <ProblemSection />
      <StatsBar />
      <ROICalculator />
      <SolutionSection />
      <CaseStudies />
      <ProcessTimeline />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </div>
  )
}
