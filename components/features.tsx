export function Features() {
  const features = [
    {
      title: "Daily Prompts",
      description: "Fresh, inspiring prompts every day for art, music, and writing",
      icon: "💡",
      color: "from-primary/20 to-primary/5",
    },
    {
      title: "Smart Timer",
      description: "Built-in 10–15 minute timer keeps you focused and present",
      icon: "⏰",
      color: "from-accent/20 to-accent/5",
    },
    {
      title: "Streak Tracking",
      description: "Visual streaks, badges, and weekly summaries celebrate consistency",
      icon: "🔥",
      color: "from-secondary/20 to-secondary/5",
    },
    {
      title: "Flexible Levels",
      description: "Beginner to advanced challenges that grow with your skills",
      icon: "📈",
      color: "from-[#60a5fa]/20 to-[#60a5fa]/5",
    },
    {
      title: "Multi-Modal",
      description: "Art, music, and writing, each with unique prompt styles",
      icon: "🎨",
      color: "from-[#c084fc]/20 to-[#c084fc]/5",
    },
    {
      title: "Gentle Nudges",
      description: "Optional reminders with encouragement and zero guilt",
      icon: "💬",
      color: "from-[#34d399]/20 to-[#34d399]/5",
    },
  ]

  return (
    <section id="features" className="py-20 md:py-32 bg-gradient-to-b from-transparent via-background to-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Core Features</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to build a sustainable creative habit
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`rounded-2xl bg-gradient-to-br ${feature.color} border border-border/50 p-8 shadow-sm hover:shadow-md transition-all hover:-translate-y-1`}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
