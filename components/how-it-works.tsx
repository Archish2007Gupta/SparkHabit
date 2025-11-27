export function HowItWorks() {
  const steps = [
    {
      number: "1",
      title: "Pick Your Path",
      description: "Choose your creative discipline: Art, Music, Writing, or Mix it up",
      icon: "🎯",
    },
    {
      number: "2",
      title: "Do the Challenge",
      description: "Complete a guided 10–15 minute challenge tailored to your level",
      icon: "⏱️",
    },
    {
      number: "3",
      title: "Track Progress",
      description: "Log your session, build your streak, and celebrate small wins",
      icon: "🎉",
    },
  ]

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-gradient-to-b from-transparent to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Three simple steps to build a sustainable creative habit
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <div key={i} className="relative">
              <div className="rounded-2xl bg-white dark:bg-card border border-border p-8 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="text-5xl mb-4">{step.icon}</div>
                <div className="text-sm font-bold text-primary mb-2">STEP {step.number}</div>
                <h3 className="text-2xl font-bold mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {i < steps.length - 1 && (
                <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-0.5 bg-gradient-to-r from-primary to-accent" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
