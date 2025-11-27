export function SocialProof() {
  const testimonials = [
    {
      quote:
        "I've been trying to get back into drawing for years. SparkHabit made it actually happen—10 minutes is all I need!",
      author: "Sarah M.",
      role: "Illustrator",
    },
    {
      quote:
        "The streaks are so motivating. I never thought I'd write every single day, but here we are—45 days straight.",
      author: "James T.",
      role: "Aspiring Writer",
    },
    {
      quote: "As a busy parent, I need quick, guilt-free creativity. This app understands that perfectly.",
      author: "Emma L.",
      role: "Music Enthusiast",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/10">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by Creators</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how SparkHabit is transforming creative routines
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white dark:bg-card border border-border p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <span key={j} className="text-primary">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-lg mb-6 text-muted-foreground leading-relaxed">"{testimonial.quote}"</p>
              <div>
                <div className="font-semibold">{testimonial.author}</div>
                <div className="text-sm text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
