import { useState } from "react";
import { Star } from "lucide-react";

const FeedbackSection = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Share Your <span className="text-game-orange">Feedback</span> 📝</h2>
        <p className="section-subtitle">We'd love to hear from you!</p>
        <form className="max-w-lg mx-auto space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="font-display font-semibold text-foreground block mb-1">Name</label>
            <input
              type="text"
              className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 font-body text-foreground focus:border-primary focus:outline-none transition-colors"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="font-display font-semibold text-foreground block mb-1">Age Group</label>
            <select className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 font-body text-foreground focus:border-primary focus:outline-none transition-colors">
              <option>4–8 years</option>
              <option>9–12 years</option>
              <option>Parent / Guardian</option>
              <option>Teacher / Educator</option>
            </select>
          </div>
          <div>
            <label className="font-display font-semibold text-foreground block mb-1">Feedback</label>
            <textarea
              className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 font-body text-foreground focus:border-primary focus:outline-none transition-colors min-h-[100px]"
              placeholder="Tell us what you think!"
            />
          </div>
          <div>
            <label className="font-display font-semibold text-foreground block mb-2">Rating</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                >
                  <Star
                    className={`w-8 h-8 transition-colors cursor-pointer ${
                      star <= (hover || rating) ? "text-game-yellow fill-game-yellow" : "text-border"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
          <button type="submit" className="game-btn-primary w-full">Submit Feedback</button>
        </form>
      </div>
    </section>
  );
};

export default FeedbackSection;
