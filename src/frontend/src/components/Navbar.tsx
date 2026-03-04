import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import { Loader2, LogIn, LogOut, Menu, Rocket, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsCallerAdmin } from "../hooks/useQueries";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { login, clear, identity, isLoggingIn, isInitializing } =
    useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();
  const location = useLocation();

  const isLoggedIn = !!identity;

  const navLinks = [
    { to: "/", label: "Home", ocid: "nav.home_link" },
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

        {/* Auth Button */}
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
            <Button
              data-ocid="nav.login_button"
              size="sm"
              onClick={login}
              disabled={isLoggingIn || isInitializing}
              style={{
                background:
                  "linear-gradient(135deg, oklch(var(--gold)), oklch(var(--orange)))",
                color: "oklch(var(--primary-foreground))",
              }}
              className="font-semibold text-sm shadow-glow-gold hover:opacity-90 transition-opacity"
            >
              {isLoggingIn ? (
                <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
              ) : (
                <LogIn className="w-4 h-4 mr-1.5" />
              )}
              {isLoggingIn ? "Connecting…" : "Connect"}
            </Button>
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
              <div className="pt-2 pb-1">
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
                  <Button
                    data-ocid="nav.login_button"
                    size="sm"
                    onClick={() => {
                      login();
                      setMobileOpen(false);
                    }}
                    disabled={isLoggingIn || isInitializing}
                    className="w-full font-semibold"
                    style={{
                      background:
                        "linear-gradient(135deg, oklch(var(--gold)), oklch(var(--orange)))",
                      color: "oklch(var(--primary-foreground))",
                    }}
                  >
                    {isLoggingIn ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Rocket className="w-4 h-4 mr-2" />
                    )}
                    {isLoggingIn ? "Connecting…" : "Connect Wallet"}
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
