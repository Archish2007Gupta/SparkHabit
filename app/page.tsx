"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { HowItWorks } from "@/components/how-it-works"
import { Features } from "@/components/features"
import { ExampleChallenges } from "@/components/example-challenges"
import { WhoIsItFor } from "@/components/who-is-it-for"
import { HabitPsychology } from "@/components/habit-psychology"
import { SocialProof } from "@/components/social-proof"
import { Pricing } from "@/components/pricing"
import { CTA } from "@/components/cta"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background" suppressHydrationWarning>
      <Header />
      <Hero />
      <HowItWorks />
      <Features />
      <ExampleChallenges />
      <WhoIsItFor />
      <HabitPsychology />
      <SocialProof />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  )
}
