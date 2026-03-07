import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronDown,
  ChevronRight,
  DollarSign,
  ExternalLink,
  Globe,
  Languages,
  Rocket,
  Shield,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef, useState } from "react";
import { LaunchCard } from "../components/LaunchCard";
import { LaunchDetailModal } from "../components/LaunchDetailModal";
import { LANGUAGES, useLanguage } from "../contexts/LanguageContext";
import { mergeWithPadFallback } from "../data/padLaunch";
import type { LaunchWithImage } from "../data/padLaunch";
import { useGetAllLaunches } from "../hooks/useQueries";

export function HomePage() {
  const navigate = useNavigate();
  const { data: launches, isLoading } = useGetAllLaunches();
  const [selectedLaunch, setSelectedLaunch] = useState<LaunchWithImage | null>(
    null,
  );
  const { t, language, setLanguage } = useLanguage();
  const [heroLangOpen, setHeroLangOpen] = useState(false);
  const heroLangRef = useRef<HTMLDivElement>(null);

  const currentLang =
    LANGUAGES.find((l) => l.code === language) ?? LANGUAGES[0];

  const mergedLaunches = mergeWithPadFallback(launches ?? []);
  const featuredLaunch = mergedLaunches[0] ?? null;

  const stats = [
    { icon: Zap, label: t("stats.launches_live"), value: "1" },
    { icon: DollarSign, label: t("stats.payment"), value: "DOGE" },
    { icon: Globe, label: t("stats.chain"), value: "Dogechain" },
  ];

  const features = [
    {
      icon: Rocket,
      title: t("features.token_launchpad"),
      description: t("features.token_launchpad_desc"),
    },
    {
      icon: Shield,
      title: t("features.secure"),
      description: t("features.secure_desc"),
    },
    {
      icon: Zap,
      title: t("features.payments"),
      description: t("features.payments_desc"),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[580px] flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src="/assets/uploads/20260203_171346-1.jpg"
            alt="Hero background"
            className="w-full h-full object-cover object-center"
            loading="eager"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.82) 60%, rgba(0,0,0,0.95) 100%)",
            }}
          />
          {/* Grid overlay */}
          <div className="absolute inset-0 hero-grid opacity-40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-20 pb-16 text-center">
          {/* Hero Language Selector - top right */}
          <div
            className="absolute top-4 right-4 sm:top-6 sm:right-6"
            ref={heroLangRef}
          >
            <button
              type="button"
              data-ocid="hero.language_toggle"
              onClick={() => setHeroLangOpen(!heroLangOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border backdrop-blur-md"
              style={{
                background: heroLangOpen
                  ? "rgba(0,0,0,0.75)"
                  : "rgba(0,0,0,0.55)",
                borderColor: heroLangOpen
                  ? "rgba(245,166,35,0.7)"
                  : "rgba(245,166,35,0.4)",
                color: heroLangOpen ? "#f5a623" : "rgba(255,255,255,0.9)",
                boxShadow: heroLangOpen
                  ? "0 0 16px rgba(245,166,35,0.25)"
                  : "none",
              }}
            >
              <Languages className="w-4 h-4 flex-shrink-0" />
              <span className="text-base leading-none">{currentLang.flag}</span>
              <span className="hidden sm:inline">{currentLang.label}</span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${heroLangOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {heroLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute right-0 top-full mt-2 w-48 rounded-2xl overflow-hidden shadow-2xl z-50 border"
                  style={{
                    background: "rgba(10,10,10,0.92)",
                    borderColor: "rgba(245,166,35,0.3)",
                    backdropFilter: "blur(16px)",
                  }}
                >
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      data-ocid={`hero.lang_${lang.code}_button`}
                      onClick={() => {
                        setLanguage(lang.code);
                        setHeroLangOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-150 text-left"
                      style={{
                        background:
                          language === lang.code
                            ? "rgba(245,166,35,0.12)"
                            : "transparent",
                        color:
                          language === lang.code
                            ? "#f5a623"
                            : "rgba(255,255,255,0.88)",
                      }}
                      onMouseEnter={(e) => {
                        if (language !== lang.code) {
                          (
                            e.currentTarget as HTMLButtonElement
                          ).style.background = "rgba(255,255,255,0.06)";
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
                        <span className="ml-auto text-xs opacity-80">✓</span>
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Click outside overlay */}
            {heroLangOpen && (
              <div
                role="button"
                tabIndex={-1}
                aria-label="Close language menu"
                className="fixed inset-0 z-40"
                onClick={() => setHeroLangOpen(false)}
                onKeyDown={(e) => e.key === "Escape" && setHeroLangOpen(false)}
              />
            )}
          </div>

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 border"
            style={{
              background: "rgba(255,165,0,0.15)",
              borderColor: "rgba(255,165,0,0.4)",
              color: "#f5a623",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {t("hero.badge")}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight mb-5 max-w-3xl mx-auto text-white"
          >
            {t("hero.title_part1")}
            <span className="gradient-text">{t("hero.title_part2")}</span>
            {t("hero.title_part3")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg max-w-xl mx-auto mb-8 leading-relaxed text-white/80"
          >
            {(() => {
              const parts = t("hero.subtitle").split("DOGE");
              return parts.map((part, i) =>
                i < parts.length - 1 ? (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static split array
                  <span key={i}>
                    {part}
                    <span className="text-gold font-semibold">DOGE</span>
                  </span>
                ) : (
                  // biome-ignore lint/suspicious/noArrayIndexKey: static split array
                  <span key={i}>{part}</span>
                ),
              );
            })()}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 justify-center"
          >
            <Button
              data-ocid="hero.primary_button"
              size="lg"
              onClick={() => navigate({ to: "/launches" })}
              className="font-bold text-sm px-8 shadow-glow-gold hover:opacity-90 transition-opacity"
              style={{
                background:
                  "linear-gradient(135deg, oklch(var(--gold)), oklch(var(--orange)))",
                color: "oklch(var(--primary-foreground))",
              }}
            >
              <Rocket className="w-4 h-4 mr-2" />
              {t("hero.view_launches")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate({ to: "/faq" })}
              className="font-semibold text-sm"
              style={{
                borderColor: "rgba(255,165,0,0.5)",
                color: "#f5a623",
                background: "transparent",
              }}
            >
              {t("hero.learn_more")}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section
        className="border-y border-border/60"
        style={{ background: "oklch(var(--surface))" }}
      >
        <div className="container mx-auto px-4 py-5">
          <div className="grid grid-cols-3 gap-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.08 }}
                className="flex flex-col sm:flex-row items-center gap-2 justify-center text-center sm:text-left"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(var(--gold) / 0.1)" }}
                >
                  <stat.icon className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <p className="font-display font-bold text-lg leading-none text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {stat.label}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Launch */}
      <section className="container mx-auto px-4 py-14">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground">
              {t("featured.title")}
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {t("featured.subtitle")}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/launches" })}
            className="text-gold hover:bg-gold/10 gap-1 hidden sm:flex"
          >
            {t("featured.all_launches")} <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>

        {isLoading ? (
          <div className="max-w-md">
            <Skeleton
              className="h-64 w-full rounded-xl"
              style={{ background: "oklch(var(--card))" }}
            />
          </div>
        ) : featuredLaunch ? (
          <div className="max-w-md">
            <LaunchCard
              launch={featuredLaunch}
              onViewDetails={setSelectedLaunch}
              index={0}
            />
          </div>
        ) : (
          <p className="text-muted-foreground text-sm">
            {t("featured.no_launches")}
          </p>
        )}
      </section>

      {/* Features Section */}
      <section
        className="py-14 border-t border-border/60"
        style={{ background: "oklch(var(--surface))" }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-10"
          >
            <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-foreground mb-3">
              {t("features.title")}
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              {t("features.subtitle")}
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="card-glow rounded-xl p-6"
                style={{ background: "oklch(var(--card))" }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{
                    background:
                      "linear-gradient(135deg, oklch(var(--gold) / 0.15), oklch(var(--orange) / 0.1))",
                  }}
                >
                  <feature.icon className="w-5 h-5 text-gold" />
                </div>
                <h3 className="font-heading font-bold text-base text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Buy $PAD on Doggy Market Section */}
      <section className="py-20 border-t border-border/60 relative overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(var(--orange) / 0.07) 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-4xl mx-auto"
          >
            {/* Section header */}
            <div className="text-center mb-12">
              <div
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-5 border"
                style={{
                  background: "oklch(var(--gold) / 0.08)",
                  borderColor: "oklch(var(--gold) / 0.25)",
                  color: "oklch(var(--gold))",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {t("buy_pad.badge")}
              </div>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 leading-tight">
                {(() => {
                  const parts = t("buy_pad.title").split("$PAD");
                  return parts.map((part, i) =>
                    i < parts.length - 1 ? (
                      // biome-ignore lint/suspicious/noArrayIndexKey: static split array
                      <span key={i}>
                        {part}
                        <span className="gradient-text">$PAD</span>
                      </span>
                    ) : (
                      // biome-ignore lint/suspicious/noArrayIndexKey: static split array
                      <span key={i}>{part}</span>
                    ),
                  );
                })()}
              </h2>
              <p className="text-muted-foreground text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
                {t("buy_pad.subtitle")}
              </p>
            </div>

            {/* Card */}
            <div
              className="rounded-2xl border border-border/60 overflow-hidden card-glow"
              style={{ background: "oklch(var(--card))" }}
            >
              <div className="flex flex-col md:flex-row items-stretch">
                {/* Image side */}
                <div className="md:w-2/5 relative">
                  <img
                    src="/assets/uploads/20260306_155957-1.jpg"
                    alt="Doggy Market"
                    className="w-full h-64 md:h-full object-cover object-center"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 60%, oklch(var(--card)) 100%)",
                    }}
                  />
                </div>

                {/* Content side */}
                <div className="md:w-3/5 p-8 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 ring-2 ring-gold/30">
                      <img
                        src="/assets/uploads/safeimagekit-resized-1000054881-1-1.png"
                        alt="$PAD Token"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-display font-extrabold text-xl text-foreground">
                        $PAD Token
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {t("buy_pad.token_subtitle")}
                      </p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {t("buy_pad.token_desc")}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center mb-6">
                    <div
                      className="px-4 py-2 rounded-lg text-center"
                      style={{
                        background: "oklch(var(--gold) / 0.1)",
                        border: "1px solid oklch(var(--gold) / 0.2)",
                      }}
                    >
                      <p className="text-xs text-muted-foreground">
                        {t("buy_pad.price")}
                      </p>
                      <p className="font-bold text-gold text-base">
                        1 DOGE / $PAD
                      </p>
                    </div>
                    <div
                      className="px-4 py-2 rounded-lg text-center"
                      style={{
                        background: "oklch(var(--gold) / 0.1)",
                        border: "1px solid oklch(var(--gold) / 0.2)",
                      }}
                    >
                      <p className="text-xs text-muted-foreground">
                        {t("buy_pad.supply")}
                      </p>
                      <p className="font-bold text-gold text-base">100,000</p>
                    </div>
                    <div
                      className="px-4 py-2 rounded-lg text-center"
                      style={{
                        background: "oklch(var(--gold) / 0.1)",
                        border: "1px solid oklch(var(--gold) / 0.2)",
                      }}
                    >
                      <p className="text-xs text-muted-foreground">
                        {t("buy_pad.market")}
                      </p>
                      <p className="font-bold text-gold text-base">
                        Doggy Market
                      </p>
                    </div>
                  </div>

                  <a
                    data-ocid="buy-pad.primary_button"
                    href="https://doggy.market/$pad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Button
                      size="lg"
                      className="font-bold text-base px-8 py-5 shadow-glow-gold hover:opacity-90 transition-all duration-200 hover:scale-105 w-full sm:w-auto"
                      style={{
                        background:
                          "linear-gradient(135deg, oklch(var(--gold)), oklch(var(--orange)))",
                        color: "oklch(var(--primary-foreground))",
                      }}
                    >
                      <DollarSign className="w-5 h-5 mr-2" />
                      {t("buy_pad.button")}
                      <ExternalLink className="w-4 h-4 ml-2 opacity-80" />
                    </Button>
                  </a>

                  <p className="text-xs text-muted-foreground mt-3 opacity-70">
                    {t("buy_pad.note")}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Apply for Launch CTA Section */}
      <section className="py-20 border-t border-border/60 relative overflow-hidden">
        {/* Subtle background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, oklch(var(--gold) / 0.06) 0%, transparent 70%)",
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl mx-auto text-center"
          >
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 border"
              style={{
                background: "oklch(var(--gold) / 0.08)",
                borderColor: "oklch(var(--gold) / 0.25)",
                color: "oklch(var(--gold))",
              }}
            >
              <Rocket className="w-3.5 h-3.5" />
              {t("apply.badge")}
            </div>

            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-foreground mb-4 leading-tight">
              {(() => {
                const parts = t("apply.title").split("DoginalsPad");
                return parts.map((part, i) =>
                  i < parts.length - 1 ? (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static split array
                    <span key={i}>
                      {part}
                      <span className="gradient-text">DoginalsPad</span>
                    </span>
                  ) : (
                    // biome-ignore lint/suspicious/noArrayIndexKey: static split array
                    <span key={i}>{part}</span>
                  ),
                );
              })()}
            </h2>

            <p className="text-muted-foreground text-base sm:text-lg max-w-lg mx-auto mb-10 leading-relaxed">
              {t("apply.subtitle")}
            </p>

            {/* Feature bullets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 text-left">
              {[
                {
                  icon: Shield,
                  label: t("apply.verified"),
                  desc: t("apply.verified_desc"),
                },
                {
                  icon: Zap,
                  label: t("apply.doge_payments"),
                  desc: t("apply.doge_payments_desc"),
                },
                {
                  icon: Globe,
                  label: t("apply.dogechain"),
                  desc: t("apply.dogechain_desc"),
                },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 rounded-xl p-4 border border-border/50"
                  style={{ background: "oklch(var(--card))" }}
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{ background: "oklch(var(--gold) / 0.12)" }}
                  >
                    <item.icon className="w-4 h-4 text-gold" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">
                      {item.label}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <a
              data-ocid="apply.primary_button"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfGh6xYUUcmLMuYHIQ6-E40z3FMWbeI2vXWXz8i7p2gAfhFPg/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                size="lg"
                className="font-bold text-base px-10 py-6 shadow-glow-gold hover:opacity-90 transition-all duration-200 hover:scale-105"
                style={{
                  background:
                    "linear-gradient(135deg, oklch(var(--gold)), oklch(var(--orange)))",
                  color: "oklch(var(--primary-foreground))",
                }}
              >
                <Rocket className="w-5 h-5 mr-2" />
                {t("apply.button")}
                <ExternalLink className="w-4 h-4 ml-2 opacity-80" />
              </Button>
            </a>

            <p className="text-xs text-muted-foreground mt-4 opacity-70">
              {t("apply.note")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Launch detail modal */}
      <LaunchDetailModal
        launch={selectedLaunch}
        open={!!selectedLaunch}
        onClose={() => setSelectedLaunch(null)}
      />
    </div>
  );
}
