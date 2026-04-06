import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.password) {
      toast.error("Please fill all fields");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Logged in successfully! 🎉");
      setLoading(false);
      navigate("/");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-game-pattern flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/" className="font-display text-4xl font-bold text-primary inline-flex items-center gap-2">🐝 NutriHive</Link>
          <p className="text-muted-foreground font-body mt-2">Welcome back, explorer!</p>
        </div>
        <form onSubmit={handleSubmit} className="bg-card rounded-3xl shadow-xl p-8 space-y-5 border border-border">
          <h2 className="font-display font-bold text-2xl text-foreground text-center">Login</h2>
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
              placeholder="Enter your password"
            />
            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3 top-9 text-muted-foreground">
              {showPass ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="game-btn-primary w-full text-lg disabled:opacity-50"
          >
            {loading ? "Logging in..." : "🎮 Login"}
          </button>
          <p className="text-center text-muted-foreground font-body text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary font-semibold hover:underline">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;