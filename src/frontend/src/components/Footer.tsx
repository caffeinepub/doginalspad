import { Link } from "@tanstack/react-router";
import { ExternalLink, Heart } from "lucide-react";
import { SiX } from "react-icons/si";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname = encodeURIComponent(window.location.hostname);

  return (
    <footer
      className="border-t border-border/60 mt-auto"
      style={{ background: "oklch(var(--surface))" }}
    >
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-8 h-8 rounded-lg overflow-hidden ring-1 ring-gold/30">
                <img
                  src="/assets/uploads/20260203_171346-1.jpg"
                  alt="Doginalspad"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="font-display font-bold text-base gradient-text">
                Doginalspad
              </span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Launching the future of DRC20 tokens on Dogechain. The first and
              most trusted launchpad in the Doge ecosystem.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground mb-3 uppercase tracking-wide">
              Navigate
            </h4>
            <ul className="space-y-2">
              {[
                { to: "/", label: "Home" },
                { to: "/launches", label: "Launches" },
                { to: "/faq", label: "FAQ" },
              ].map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-muted-foreground hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground mb-3 uppercase tracking-wide">
              Community
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://x.com/doginalpad"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:text-gold hover:bg-gold/10 transition-all border border-border/60 hover:border-gold/30"
                aria-label="Twitter/X"
              >
                <SiX className="w-4 h-4" />
              </a>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Payment: DOGE · Chain: Dogechain
            </p>
          </div>
        </div>

        <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground">
            © {year} Doginalspad. All rights reserved.
          </p>
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${hostname}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-muted-foreground hover:text-gold transition-colors flex items-center gap-1"
          >
            Built with{" "}
            <Heart className="w-3 h-3 text-orange-accent fill-orange-accent mx-0.5" />{" "}
            using caffeine.ai
            <ExternalLink className="w-3 h-3 ml-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
