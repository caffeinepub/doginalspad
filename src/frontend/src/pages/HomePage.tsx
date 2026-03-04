import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  ChevronRight,
  DollarSign,
  Globe,
  Rocket,
  Shield,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { LaunchCard } from "../components/LaunchCard";
import { LaunchDetailModal } from "../components/LaunchDetailModal";
import { mergeWithPadFallback } from "../data/padLaunch";
import type { LaunchWithImage } from "../data/padLaunch";
import { useGetAllLaunches } from "../hooks/useQueries";

const stats = [
  { icon: Zap, label: "Launches Live", value: "1" },
  { icon: DollarSign, label: "Payment", value: "DOGE" },
  { icon: Globe, label: "Chain", value: "Dogechain" },
];

const features = [
  {
    icon: Rocket,
    title: "Token Launchpad",
    description:
      "Launch your DRC20 token with full transparency, real-time tracking, and community trust.",
  },
  {
    icon: Shield,
    title: "Secure & Verified",
    description:
      "Every project goes through a verification process. Invest with confidence on Dogechain.",
  },
  {
    icon: Zap,
    title: "Instant DOGE Payments",
    description:
      "Participate in launches instantly using DOGE — the fastest, most beloved crypto.",
  },
];

export function HomePage() {
  const navigate = useNavigate();
  const { data: launches, isLoading } = useGetAllLaunches();
  const [selectedLaunch, setSelectedLaunch] = useState<LaunchWithImage | null>(
    null,
  );

  const mergedLaunches = mergeWithPadFallback(launches ?? []);
  const featuredLaunch = mergedLaunches[0] ?? null;

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
                "linear-gradient(180deg, oklch(0.11 0.005 260 / 0.75) 0%, oklch(0.11 0.005 260 / 0.88) 60%, oklch(0.11 0.005 260) 100%)",
            }}
          />
          {/* Grid overlay */}
          <div className="absolute inset-0 hero-grid opacity-40" />
        </div>

        <div className="relative z-10 container mx-auto px-4 pt-20 pb-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-6 border"
            style={{
              background: "oklch(var(--gold) / 0.1)",
              borderColor: "oklch(var(--gold) / 0.3)",
              color: "oklch(var(--gold))",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Live on Dogechain · DRC20 Token Launchpad
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl leading-tight mb-5 max-w-3xl mx-auto"
          >
            The <span className="gradient-text">#1 DRC20 Token</span>
            <br />
            Launchpad on Dogechain
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-muted-foreground max-w-xl mx-auto mb-8 leading-relaxed"
          >
            Discover and participate in the latest token launches. Payment in{" "}
            <span className="text-gold font-semibold">DOGE</span>. Powered by
            the Dogechain ecosystem.
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
              View Launches
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate({ to: "/faq" })}
              className="font-semibold text-sm border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/60"
            >
              Learn More
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
              Featured Launch
            </h2>
            <p className="text-muted-foreground mt-1 text-sm">
              The inaugural DRC20 token launch on Doginalspad
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate({ to: "/launches" })}
            className="text-gold hover:bg-gold/10 gap-1 hidden sm:flex"
          >
            All Launches <ChevronRight className="w-4 h-4" />
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
            No launches yet. Check back soon!
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
              Why Doginalspad?
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              The most trusted platform to launch and discover DRC20 tokens on
              Dogechain.
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

      {/* Launch detail modal */}
      <LaunchDetailModal
        launch={selectedLaunch}
        open={!!selectedLaunch}
        onClose={() => setSelectedLaunch(null)}
      />
    </div>
  );
}
