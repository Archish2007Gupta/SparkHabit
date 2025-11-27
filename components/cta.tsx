import { Button } from "@/components/ui/button"

export function CTA() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-primary via-accent to-primary" suppressHydrationWarning>
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Spark Your Creative Journey?</h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Start your free 7-day challenge today. No credit card required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="rounded-full font-semibold bg-white text-primary hover:bg-white/90">
            Try Free Daily Prompts
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="rounded-full font-semibold text-white border-white hover:bg-white/10 bg-transparent"
          >
            View Sample Challenges
          </Button>
        </div>
      </div>
    </section>
  )
}
