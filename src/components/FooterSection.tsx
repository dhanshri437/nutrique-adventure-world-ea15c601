import { Mail, Github, Twitter, Instagram } from "lucide-react";

const FooterSection = () => {
  return (
    <footer id="contact" className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="font-display text-2xl font-bold mb-4">🥦 NutriQuest</h3>
            <p className="font-body text-primary-foreground/70 text-sm">
              Making healthy eating fun for kids through interactive gaming adventures.
            </p>
          </div>
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 font-body text-sm">
              {["About", "Features", "Worlds", "Benefits", "Feedback"].map((link) => (
                <li key={link}>
                  <a href={`#${link.toLowerCase()}`} className="text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display font-bold text-lg mb-4">Contact</h4>
            <a href="mailto:hello@nutriquest.app" className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground font-body text-sm mb-4">
              <Mail className="w-4 h-4" /> hello@nutriquest.app
            </a>
            <div className="flex gap-3">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-primary-foreground/20 transition-colors">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10 pt-6 text-center">
          <p className="text-primary-foreground/50 font-body text-sm">
            © 2026 NutriQuest. All rights reserved. Made with ❤️ for healthy kids.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
