import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-gradient-to-b from-secondary/5 to-background" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            No pressure, no perfection—just 10 minutes of creative play
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
          {/* Free Tier */}
          <div className="rounded-2xl border-2 border-border bg-white dark:bg-card p-8 shadow-sm hover:shadow-md transition-shadow">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <p className="text-muted-foreground">Get started with the basics</p>
            </div>

            <div className="mb-8">
              <div className="text-4xl font-bold mb-1">$0</div>
              <p className="text-sm text-muted-foreground">Forever free</p>
            </div>

            <Button className="w-full rounded-xl mb-6">Get Started</Button>

            <div className="space-y-4">
              {["3 challenges per week", "Basic streak tracking", "Beginner level only", "Community access"].map(
                (feature, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Pro Tier */}
          <div className="rounded-2xl border-2 border-primary bg-gradient-to-br from-primary/10 to-primary/5 p-8 shadow-lg relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
              Most Popular
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-muted-foreground">For serious creators</p>
            </div>

            <div className="mb-8">
              <div className="text-4xl font-bold mb-1">
                $7<span className="text-lg text-muted-foreground">/mo</span>
              </div>
              <p className="text-sm text-muted-foreground">Billed monthly</p>
            </div>

            <Button className="w-full rounded-xl mb-6 bg-primary hover:bg-primary/90">Start Your 7-Day Trial</Button>

            <div className="space-y-4">
              {[
                "Unlimited daily challenges",
                "All difficulty levels",
                "Advanced analytics",
                "Custom reminders",
                "Offline mode",
                "Priority support",
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="font-semibold">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
