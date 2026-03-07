import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Rocket, Search } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { LaunchCard } from "../components/LaunchCard";
import { LaunchDetailModal } from "../components/LaunchDetailModal";
import { useLanguage } from "../contexts/LanguageContext";
import { mergeWithPadFallback } from "../data/padLaunch";
import type { LaunchWithImage } from "../data/padLaunch";
import { LaunchStatus, useGetAllLaunches } from "../hooks/useQueries";

type FilterTab = "all" | LaunchStatus;

export function LaunchesPage() {
  const { data: launches, isLoading } = useGetAllLaunches();
  const [selectedLaunch, setSelectedLaunch] = useState<LaunchWithImage | null>(
    null,
  );
  const [filter, setFilter] = useState<FilterTab>("all");
  const [search, setSearch] = useState("");
  const { t } = useLanguage();

  const mergedLaunches = mergeWithPadFallback(launches ?? []);

  const filteredLaunches = mergedLaunches.filter((l) => {
    const matchesFilter = filter === "all" || l.status === filter;
    const matchesSearch =
      search === "" ||
      l.projectName.toLowerCase().includes(search.toLowerCase()) ||
      l.ticker.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const tabs: { value: FilterTab; label: string }[] = [
    { value: "all", label: t("launches.all") },
    { value: LaunchStatus.upcoming, label: t("launches.upcoming") },
    { value: LaunchStatus.live, label: t("launches.live") },
    { value: LaunchStatus.ended, label: t("launches.ended") },
  ];

  return (
    <div className="container mx-auto px-4 py-8 pt-24 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="mb-8"
      >
        <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-foreground mb-2">
          {t("launches.title")}
        </h1>
        <p className="text-muted-foreground text-sm">
          {t("launches.subtitle")}
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2, delay: 0.05 }}
        className="flex flex-col sm:flex-row gap-3 mb-8"
      >
        <Tabs value={filter} onValueChange={(v) => setFilter(v as FilterTab)}>
          <TabsList
            className="gap-1 p-1 h-auto"
            style={{ background: "oklch(var(--surface))" }}
          >
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                data-ocid="launches.filter.tab"
                className="text-xs font-semibold data-[state=active]:text-primary-foreground"
                style={{
                  ...(filter === tab.value
                    ? {
                        background:
                          "linear-gradient(135deg, oklch(var(--gold)), oklch(var(--orange)))",
                        color: "oklch(var(--primary-foreground))",
                      }
                    : {}),
                }}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={t("launches.search")}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 border-border/60 bg-muted/30 text-sm h-9"
            data-ocid="launches.search_input"
          />
        </div>
      </motion.div>

      {/* Launch Grid */}
      {isLoading ? (
        <div
          data-ocid="launches.loading_state"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {[1, 2, 3].map((i) => (
            <Skeleton
              key={i}
              className="h-64 rounded-xl"
              style={{ background: "oklch(var(--card))" }}
            />
          ))}
        </div>
      ) : filteredLaunches.length === 0 ? (
        <motion.div
          data-ocid="launches.empty_state"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center py-20 rounded-xl border border-dashed border-border/60 text-center"
          style={{ background: "oklch(var(--card))" }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: "oklch(var(--gold) / 0.1)" }}
          >
            <Rocket className="w-7 h-7 text-gold" />
          </div>
          <h3 className="font-heading font-bold text-lg text-foreground mb-1">
            {t("launches.no_launches_title")}
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            {filter === "all"
              ? t("launches.no_launches_all")
              : t("launches.no_launches_filter", { filter })}
          </p>
        </motion.div>
      ) : (
        <div
          data-ocid="launches.list"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filteredLaunches.map((launch, i) => (
            <LaunchCard
              key={launch.id.toString()}
              launch={launch}
              onViewDetails={setSelectedLaunch}
              index={i}
              data-ocid={`launches.item.${i + 1}` as string}
            />
          ))}
        </div>
      )}

      {/* Launch Detail Modal */}
      <LaunchDetailModal
        launch={selectedLaunch}
        open={!!selectedLaunch}
        onClose={() => setSelectedLaunch(null)}
      />
    </div>
  );
}
