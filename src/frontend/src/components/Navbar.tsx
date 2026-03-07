import { Button } from "@/components/ui/button";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ChevronDown,
  Clock,
  ExternalLink,
  Languages,
  LogOut,
  Menu,
  Moon,
  Sun,
  Wallet,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { LANGUAGES, useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsCallerAdmin } from "../hooks/useQueries";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const { clear, identity } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();

  const isLoggedIn = !!identity;

  const currentLang =
    LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  const navLinks = [
    { to: "/", label: t("nav.homepage"), ocid: "nav.home_link" },
    { to: "/launches", label: t("nav.launches"), ocid: "nav.launches_link" },
    { to: "/faq", label: t("nav.faq"), ocid: "nav.faq_link" },
    ...(isAdmin
      ? [{ to: "/admin", label: t("nav.admin"), ocid: "nav.admin_link" }]
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

        {/* Right side - Desktop */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle - Desktop pill */}
          <fieldset
            data-ocid="nav.theme_toggle"
            aria-label="Theme toggle"
            className="flex items-center rounded-full p-0.5 gap-0.5 border-0 m-0"
            style={{
              background: "oklch(var(--surface-2))",
              outline: "1px solid oklch(var(--border))",
              padding: "2px",
            }}
          >
            <button
              type="button"
              aria-label="Switch to light mode"
              aria-pressed={theme === "light"}
              onClick={() => theme === "dark" && toggleTheme()}
              className="relative w-8 h-7 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background:
                  theme === "light"
                    ? "oklch(var(--orange) / 0.18)"
                    : "transparent",
                color:
                  theme === "light"
                    ? "oklch(var(--orange))"
                    : "oklch(var(--muted-foreground))",
              }}
            >
              <Sun className="w-3.5 h-3.5" />
              {theme === "light" && (
                <motion.span
                  layoutId="theme-pill-indicator"
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: "0 0 0 1.5px oklch(var(--orange) / 0.4)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
            <button
              type="button"
              aria-label="Switch to dark mode"
              aria-pressed={theme === "dark"}
              onClick={() => theme === "light" && toggleTheme()}
              className="relative w-8 h-7 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background:
                  theme === "dark"
                    ? "oklch(var(--gold) / 0.18)"
                    : "transparent",
                color:
                  theme === "dark"
                    ? "oklch(var(--gold))"
                    : "oklch(var(--muted-foreground))",
              }}
            >
              <Moon className="w-3.5 h-3.5" />
              {theme === "dark" && (
                <motion.span
                  layoutId="theme-pill-indicator"
                  className="absolute inset-0 rounded-full"
                  style={{
                    boxShadow: "0 0 0 1.5px oklch(var(--gold) / 0.4)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          </fieldset>

          {/* Language Selector - Desktop */}
          <div className="relative" ref={langDropdownRef}>
            <button
              type="button"
              data-ocid="nav.language_toggle"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1.5 px-3 h-8 rounded-full text-sm font-medium transition-all duration-200 border"
              style={{
                background: langDropdownOpen
                  ? "oklch(var(--gold) / 0.12)"
                  : "oklch(var(--surface-2))",
                borderColor: langDropdownOpen
                  ? "oklch(var(--gold) / 0.4)"
                  : "oklch(var(--border))",
                color: langDropdownOpen
                  ? "oklch(var(--gold))"
                  : "oklch(var(--muted-foreground))",
              }}
            >
              <Languages className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-base leading-none">{currentLang.flag}</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-44 rounded-xl overflow-hidden shadow-lg z-50 border"
                  style={{
                    background: "oklch(var(--surface))",
                    borderColor: "oklch(var(--border))",
                  }}
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      data-ocid={`nav.lang_${lang.code}_button`}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-150 text-left"
                      style={{
                        background:
                          language === lang.code
                            ? "oklch(var(--gold) / 0.1)"
                            : "transparent",
                        color:
                          language === lang.code
                            ? "oklch(var(--gold))"
                            : "oklch(var(--foreground))",
                      }}
                      onMouseEnter={(e) => {
                        if (language !== lang.code) {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "oklch(var(--muted) / 0.5)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (language !== lang.code) {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "transparent";
                        }
                      }}
                    >
                      <span className="text-lg leading-none">{lang.flag}</span>
                      <span>{lang.label}</span>
                      {language === lang.code && (
                        <span className="ml-auto text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Click outside handler */}
            {langDropdownOpen && (
              <div
                role="button"
                tabIndex={-1}
                aria-label="Close language menu"
                className="fixed inset-0 z-40"
                onClick={() => setLangDropdownOpen(false)}
                onKeyDown={(e) =>
                  e.key === "Escape" && setLangDropdownOpen(false)
                }
              />
            )}
          </div>

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
                {t("nav.logout")}
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
                {t("nav.connect_wallet")}
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
                {t("nav.wallet_coming_soon")}
              </div>
            </div>
          )}
        </div>

        {/* Mobile right side: language + hamburger */}
        <div className="md:hidden flex items-center gap-1.5">
          {/* Language Selector - Mobile (beside hamburger) */}
          <div className="relative">
            <button
              type="button"
              data-ocid="nav.language_toggle_mobile"
              onClick={() => setLangDropdownOpen(!langDropdownOpen)}
              className="flex items-center gap-1 px-2.5 h-8 rounded-full text-sm font-medium transition-all duration-200 border"
              style={{
                background: langDropdownOpen
                  ? "oklch(var(--gold) / 0.12)"
                  : "oklch(var(--surface-2))",
                borderColor: langDropdownOpen
                  ? "oklch(var(--gold) / 0.4)"
                  : "oklch(var(--border))",
                color: langDropdownOpen
                  ? "oklch(var(--gold))"
                  : "oklch(var(--muted-foreground))",
              }}
            >
              <Languages className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-base leading-none">{currentLang.flag}</span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {langDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-44 rounded-xl overflow-hidden shadow-lg z-50 border"
                  style={{
                    background: "oklch(var(--surface))",
                    borderColor: "oklch(var(--border))",
                  }}
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      data-ocid={`nav.lang_${lang.code}_button_mobile`}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-150 text-left"
                      style={{
                        background:
                          language === lang.code
                            ? "oklch(var(--gold) / 0.1)"
                            : "transparent",
                        color:
                          language === lang.code
                            ? "oklch(var(--gold))"
                            : "oklch(var(--foreground))",
                      }}
                    >
                      <span className="text-lg leading-none">{lang.flag}</span>
                      <span>{lang.label}</span>
                      {language === lang.code && (
                        <span className="ml-auto text-xs">✓</span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {langDropdownOpen && (
              <div
                role="button"
                tabIndex={-1}
                aria-label="Close language menu"
                className="fixed inset-0 z-40"
                onClick={() => setLangDropdownOpen(false)}
                onKeyDown={(e) =>
                  e.key === "Escape" && setLangDropdownOpen(false)
                }
              />
            )}
          </div>

          {/* Hamburger */}
          <button
            type="button"
            className="w-9 h-9 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
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
                  {t("nav.apply_launch")}
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
                  {t("nav.buy_doggy")}
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
                    {t("nav.logout")}
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
                      {t("nav.connect_wallet")}
                    </Button>
                    <div
                      className="flex items-center justify-center gap-1.5 text-xs font-medium py-1"
                      style={{ color: "oklch(var(--gold))" }}
                    >
                      <Clock className="w-3 h-3" />
                      {t("nav.wallet_coming_soon")}
                    </div>
                  </div>
                )}
              </div>

              {/* Theme Toggle - Mobile */}
              <div className="border-t border-border/40 pt-2 mt-1 px-1">
                <div className="flex items-center justify-between px-2.5 py-2">
                  <span className="text-sm font-medium text-muted-foreground">
                    {t("nav.theme")}
                  </span>
                  {/* Pill toggle */}
                  <fieldset
                    data-ocid="nav.theme_toggle"
                    aria-label="Theme toggle"
                    className="flex items-center rounded-full gap-0.5 border-0 m-0"
                    style={{
                      background: "oklch(var(--surface-2))",
                      outline: "1px solid oklch(var(--border))",
                      padding: "2px",
                    }}
                  >
                    <button
                      type="button"
                      aria-label="Switch to light mode"
                      aria-pressed={theme === "light"}
                      onClick={() => {
                        if (theme === "dark") toggleTheme();
                        setMobileOpen(false);
                      }}
                      className="relative flex items-center gap-1.5 px-3 h-8 rounded-full text-xs font-semibold transition-all duration-200"
                      style={{
                        background:
                          theme === "light"
                            ? "oklch(var(--orange) / 0.18)"
                            : "transparent",
                        color:
                          theme === "light"
                            ? "oklch(var(--orange))"
                            : "oklch(var(--muted-foreground))",
                      }}
                    >
                      <Sun className="w-3.5 h-3.5 flex-shrink-0" />
                      {t("nav.light")}
                    </button>
                    <button
                      type="button"
                      aria-label="Switch to dark mode"
                      aria-pressed={theme === "dark"}
                      onClick={() => {
                        if (theme === "light") toggleTheme();
                        setMobileOpen(false);
                      }}
                      className="relative flex items-center gap-1.5 px-3 h-8 rounded-full text-xs font-semibold transition-all duration-200"
                      style={{
                        background:
                          theme === "dark"
                            ? "oklch(var(--gold) / 0.18)"
                            : "transparent",
                        color:
                          theme === "dark"
                            ? "oklch(var(--gold))"
                            : "oklch(var(--muted-foreground))",
                      }}
                    >
                      <Moon className="w-3.5 h-3.5 flex-shrink-0" />
                      {t("nav.dark")}
                    </button>
                  </fieldset>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
