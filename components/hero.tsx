'use client'
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-background via-background to-secondary/10" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left column - Text */}
          <div className="space-y-6">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight text-balance">
                <span className="bg-linear-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                  Build Your Creative Habit in 10 Minutes
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mt-4 leading-relaxed">
                Join thousands of creators who are growing their artistic skills through bite-sized daily challenges. No
                perfection. No pressure. Just creative play.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/challenges">
                <Button size="lg" className="rounded-full font-semibold">
                  Start Today's 10-Minute Challenge
                </Button>
              </Link>
              <Link href="/history">
                <Button size="lg" variant="outline" className="rounded-full font-semibold bg-transparent">
                  View Your History
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 text-sm pt-4">
              <div>
                <div className="font-bold text-lg">50K+</div>
                <div className="text-muted-foreground">Active Creators</div>
              </div>
              <div className="h-12 w-px bg-border" />
              <div>
                <div className="font-bold text-lg">2M+</div>
                <div className="text-muted-foreground">Challenges Completed</div>
              </div>
            </div>
          </div>

          {/* Right column - App mockup */}
          <div className="relative h-96 md:h-full min-h-96">
            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/20 to-accent/20 blur-3xl" />
            <div className="relative rounded-3xl border-2 border-primary/20 bg-white/80 backdrop-blur p-6 shadow-2xl h-full flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold text-foreground">Today's Challenge</h3>
                <div className="text-2xl">🎨</div>
              </div>

              <div className="space-y-4 flex-1">
                <div className="bg-linear-to-r from-primary/20 to-accent/20 rounded-2xl p-4">
                  <div className="font-semibold text-foreground mb-2">Sketch in 2 Colors</div>
                  <div className="text-sm text-muted-foreground">
                    Draw a tiny scene from your window using only 2 colors
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1 bg-secondary/20 rounded-xl p-3 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Category</div>
                    <div className="font-semibold text-foreground">Art</div>
                  </div>
                  <div className="flex-1 bg-accent/20 rounded-xl p-3 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Time</div>
                    <div className="font-semibold text-foreground">15 min</div>
                  </div>
                </div>

                <div className="pt-4">
                  <div className="text-xs text-muted-foreground mb-2">Current Streak</div>
                  <div className="flex gap-1">
                    {Array.from({ length: 7 }).map((_, i) => (
                      <div key={i} className={`h-2 flex-1 rounded-full ${i < 5 ? "bg-primary" : "bg-border"}`} />
                    ))}
                  </div>
                  <div className="text-sm font-semibold mt-2">5 days 🔥</div>
                </div>
              </div>

              <Link href="/challenges">
                <Button className="w-full rounded-xl mt-4">
                  Start Challenge
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
