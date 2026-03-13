import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Features", href: "#features" },
  { label: "Worlds", href: "#worlds" },
  { label: "Benefits", href: "#benefits" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <a href="#" className="font-display text-2xl font-bold text-primary flex items-center gap-2">
          🥦 NutriQuest
        </a>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} className="font-body font-semibold text-foreground/80 hover:text-primary transition-colors">
              {l.label}
            </a>
          ))}
          <a href="#cta" className="game-btn-primary text-sm !px-6 !py-2">Play Now</a>
        </div>
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {open && (
        <div className="md:hidden bg-card border-b border-border px-4 pb-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="font-body font-semibold text-foreground/80 hover:text-primary py-2">
              {l.label}
            </a>
          ))}
          <a href="#cta" onClick={() => setOpen(false)} className="game-btn-primary text-sm !px-6 !py-2 text-center">Play Now</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
