export function ExampleChallenges() {
  const challenges = [
    {
      category: "Art",
      emoji: "🎨",
      title: "Sketch a tiny scene from your window using only 2 colors",
      color: "from-primary to-primary/80",
    },
    {
      category: "Music",
      emoji: "🎵",
      title: "Create a 4-bar melody inspired by your day",
      color: "from-accent to-accent/80",
    },
    {
      category: "Writing",
      emoji: "✍️",
      title: 'Write 5 sentences starting with "Today I noticed…"',
      color: "from-secondary to-secondary/80",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-secondary/5">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Sample Challenges</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get a feel for the types of challenges waiting for you
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {challenges.map((challenge, i) => (
            <div
              key={i}
              className={`rounded-2xl bg-gradient-to-br ${challenge.color} text-white p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-2 min-h-48 flex flex-col justify-between`}
            >
              <div>
                <div className="text-4xl mb-3">{challenge.emoji}</div>
                <div className="text-sm font-semibold opacity-90 mb-2">{challenge.category}</div>
                <h3 className="text-xl font-bold leading-snug">{challenge.title}</h3>
              </div>
              <div className="text-sm opacity-75">15 min • Beginner</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
