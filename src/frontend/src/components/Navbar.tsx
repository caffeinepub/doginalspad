import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Clock, ExternalLink, LogOut, Menu, Wallet, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsCallerAdmin } from "../hooks/useQueries";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { clear, identity } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();
  const location = useLocation();

  const isLoggedIn = !!identity;

  const navLinks = [
    { to: "/", label: "Homepage", ocid: "nav.home_link" },
    { to: "/launches", label: "Launches", ocid: "nav.launches_link" },
    { to: "/faq", label: "FAQ", ocid: "nav.faq_link" },
    ...(isAdmin
      ? [{ to: "/admin", label: "Admin", ocid: "nav.admin_link" }]
      : []),
  ];

  const isActive = (path: string) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/60"
      style={{
        background: "oklch(var(--surface) / 0.95)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group"
          data-ocid="nav.home_link"
        >
          <div className="w-9 h-9 rounded-lg overflow-hidden flex-shrink-0 ring-1 ring-gold/30 group-hover:ring-gold/60 transition-all">
            <img
              src="/assets/uploads/20260203_171346-1.jpg"
              alt="Doginalspad Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-display font-bold text-lg tracking-tight gradient-text">
            Doginalspad
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid={link.ocid}
              className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                isActive(link.to)
                  ? "text-gold bg-gold/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Wallet Button - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground font-medium px-2.5 py-1 rounded-full bg-muted/50">
                {identity.getPrincipal().toString().slice(0, 8)}…
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={clear}
                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="w-4 h-4 mr-1.5" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="relative group">
              <Button
                data-ocid="nav.wallet_button"
                size="sm"
                disabled
                style={{
                  background:
                    "linear-gradient(135deg, oklch(var(--gold) / 0.5), oklch(var(--orange) / 0.5))",
                  color: "oklch(var(--primary-foreground))",
                  cursor: "not-allowed",
                }}
                className="font-semibold text-sm opacity-75"
              >
                <Wallet className="w-4 h-4 mr-1.5" />
                Connect Wallet
              </Button>
              <div
                className="absolute top-full right-0 mt-2 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 z-50 flex items-center gap-1.5"
                style={{
                  background: "oklch(var(--surface))",
                  border: "1px solid oklch(var(--gold) / 0.4)",
                  color: "oklch(var(--gold))",
                }}
              >
                <Clock className="w-3 h-3" />
                Wallet Integration Coming Soon
              </div>
            </div>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-border/60"
            style={{ background: "oklch(var(--surface))" }}
          >
            <div className="container mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  data-ocid={link.ocid}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.to)
                      ? "text-gold bg-gold/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              {/* External action links */}
              <div className="border-t border-border/40 pt-2 mt-1 flex flex-col gap-1">
                <a
                  href="https://docs.google.com/forms/d/e/1FAIpQLSfGh6xYUUcmLMuYHIQ6-E40z3FMWbeI2vXWXz8i7p2gAfhFPg/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="nav.apply_launch_link"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                  Apply for Launch
                </a>
                <a
                  href="https://doggy.market/$pad"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-ocid="nav.buy_pad_link"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg text-sm font-medium text-gold hover:bg-gold/10 transition-all"
                >
                  <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                  Buy on Doggy Market
                </a>
              </div>
              <div className="pt-1 pb-1">
                {isLoggedIn ? (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      clear();
                      setMobileOpen(false);
                    }}
                    className="w-full justify-start text-muted-foreground"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </Button>
                ) : (
                  <div className="space-y-1.5">
                    <Button
                      data-ocid="nav.wallet_button"
                      size="sm"
                      disabled
                      className="w-full font-semibold opacity-75"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(var(--gold) / 0.5), oklch(var(--orange) / 0.5))",
                        color: "oklch(var(--primary-foreground))",
                        cursor: "not-allowed",
                      }}
                    >
                      <Wallet className="w-4 h-4 mr-2" />
                      Connect Wallet
                    </Button>
                    <div
                      className="flex items-center justify-center gap-1.5 text-xs font-medium py-1"
                      style={{ color: "oklch(var(--gold))" }}
                    >
                      <Clock className="w-3 h-3" />
                      Wallet Integration Coming Soon
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
