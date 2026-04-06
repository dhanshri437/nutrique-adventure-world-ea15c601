import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const SignupPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.confirm) {
      toast.error("Please fill all fields");
      return;
    }
    if (form.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (form.password !== form.confirm) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Account created successfully! 🎉");
      setLoading(false);
      navigate("/");
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-game-pattern flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="font-display text-4xl font-bold text-primary inline-flex items-center gap-2">🐝 NutriHive</Link>
          <p className="text-muted-foreground font-body mt-2">Create your account to start the adventure!</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card rounded-3xl shadow-xl p-8 space-y-5 border border-border">
          <h2 className="font-display font-bold text-2xl text-foreground text-center">Sign Up</h2>
          <div>
            <label className="font-display font-semibold text-foreground block mb-1 text-sm">Full Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 font-body text-foreground focus:border-primary focus:outline-none transition-colors"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="font-display font-semibold text-foreground block mb-1 text-sm">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 font-body text-foreground focus:border-primary focus:outline-none transition-colors"
              placeholder="Enter your email"
            />
          </div>
          <div className="relative">
            <label className="font-display font-semibold text-foreground block mb-1 text-sm">Password</label>
            <input
              type={showPass ? "text" : "password"}
              value={form.password}
              onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
              className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 pr-12 font-body text-foreground focus:border-primary focus:outline-none transition-colors"
              placeholder="Min 6 characters"
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-9 text-muted-foreground">
              {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <div>
            <label className="font-display font-semibold text-foreground block mb-1 text-sm">Confirm Password</label>
            <input
              type="password"
              value={form.confirm}
              onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
              className="w-full rounded-xl border-2 border-border bg-background px-4 py-3 font-body text-foreground focus:border-primary focus:outline-none transition-colors"
              placeholder="Re-enter password"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="game-btn-primary w-full text-lg disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "🚀 Create Account"}
          </button>
          <p className="text-center text-muted-foreground font-body text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-primary font-semibold hover:underline">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;