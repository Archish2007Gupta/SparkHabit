export function HabitPsychology() {
  return (
    <section className="py-20 md:py-32 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The Science of Small Wins</h2>
          <p className="text-lg text-muted-foreground">How micro-commitments build lasting creative habits</p>
        </div>

        <div className="bg-white dark:bg-card rounded-3xl border border-border p-12 shadow-sm">
          <p className="text-lg leading-relaxed text-muted-foreground mb-8">
            Consistency matters more than perfection. By committing just 10–15 minutes daily, you're creating a
            foundation for sustainable creative growth. Small wins compound over time.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-6 border border-primary/20">
              <div className="text-4xl font-bold text-primary mb-2">60+</div>
              <p className="text-muted-foreground">Hours of practice per year with just 10 minutes daily</p>
            </div>
            <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-6 border border-accent/20">
              <div className="text-4xl font-bold text-accent mb-2">365</div>
              <p className="text-muted-foreground">Days to transform your creative skills with consistency</p>
            </div>
          </div>

          <p className="text-muted-foreground text-center">
            The key is showing up every day, even when motivation fades. That's where SparkHabit comes in—we make it
            friction-free.
          </p>
        </div>
      </div>
    </section>
  )
}
