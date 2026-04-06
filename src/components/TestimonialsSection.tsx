const testimonials = [
  {
    quote: "My daughter now asks for fruits instead of candy! NutriHive made healthy eating fun for our whole family.",
    author: "Sarah M.",
    role: "Parent",
    emoji: "👩",
  },
  {
    quote: "I use NutriHive in my classroom and the kids absolutely love it. It's the perfect educational tool!",
    author: "Mr. Johnson",
    role: "Teacher",
    emoji: "👨‍🏫",
  },
  {
    quote: "I love defeating the junk food monsters! The Underwater World is my favorite level!",
    author: "Emma, age 8",
    role: "Player",
    emoji: "👧",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-game-pattern">
      <div className="container mx-auto px-4">
        <h2 className="section-title">What People <span className="text-secondary">Say</span> 💬</h2>
        <p className="section-subtitle">Hear from our community!</p>
        <div className="grid sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="speech-bubble bg-card shadow-lg">
              <div className="text-4xl mb-3">{t.emoji}</div>
              <p className="text-foreground font-body italic mb-4">"{t.quote}"</p>
              <p className="font-display font-bold text-foreground">{t.author}</p>
              <p className="text-muted-foreground text-sm font-body">{t.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;