export function WhoIsItFor() {
  const personas = [
    {
      title: "Busy Professionals",
      description: "Keep your creativity alive between big projects",
      icon: "💼",
    },
    {
      title: "Students",
      description: "Build an impressive creative portfolio while studying",
      icon: "📚",
    },
    {
      title: "Returning Creators",
      description: "Get back into your passion after a break",
      icon: "🔄",
    },
    {
      title: "Perfectionists",
      description: "Break through creative blocks and ship imperfect work",
      icon: "🎯",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-transparent to-accent/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Who It's For</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            SparkHabit works for any creator ready to build consistency
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {personas.map((persona, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white dark:bg-card border border-border p-8 flex gap-6 items-start hover:shadow-md transition-shadow"
            >
              <div className="text-5xl flex-shrink-0">{persona.icon}</div>
              <div>
                <h3 className="text-xl font-bold mb-2">{persona.title}</h3>
                <p className="text-muted-foreground">{persona.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
