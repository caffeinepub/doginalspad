import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Coins, Hash, Target } from "lucide-react";
import { motion } from "motion/react";
import type { LaunchWithImage } from "../data/padLaunch";
import { StatusBadge } from "./StatusBadge";

interface LaunchCardProps {
  launch: LaunchWithImage;
  onViewDetails: (launch: LaunchWithImage) => void;
  index?: number;
  "data-ocid"?: string;
}

export function LaunchCard({
  launch,
  onViewDetails,
  index = 0,
  "data-ocid": dataOcid,
}: LaunchCardProps) {
  return (
    <motion.div
      data-ocid={dataOcid}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, delay: index * 0.04, ease: "easeOut" }}
      className="card-glow relative flex flex-col rounded-xl overflow-hidden"
      style={{ background: "oklch(var(--card))" }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, oklch(var(--gold)), oklch(var(--orange)))",
        }}
      />

      <div className="p-5 flex flex-col gap-4 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Token image */}
            {launch.imageUrl && (
              <img
                src={launch.imageUrl}
                alt={launch.ticker}
                className="w-14 h-14 rounded-full object-cover border-2 flex-shrink-0"
                style={{ borderColor: "oklch(var(--gold) / 0.4)" }}
              />
            )}
            <div>
              <h3 className="font-display font-bold text-lg text-foreground leading-tight">
                {launch.projectName}
              </h3>
              <span className="inline-block mt-1 text-xs font-bold tracking-wider px-2 py-0.5 rounded bg-primary/10 text-gold border border-gold/20">
                {launch.ticker}
              </span>
            </div>
          </div>
          <StatusBadge status={launch.status} />
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
          {launch.description}
        </p>

        {/* Details */}
        <div className="grid grid-cols-1 gap-2 mt-auto">
          {launch.launchDate && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Calendar className="w-3.5 h-3.5 text-gold/70 flex-shrink-0" />
              <span className="truncate">
                Launch:{" "}
                <span className="text-foreground/80 font-medium">
                  {launch.launchDate}
                </span>
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Coins className="w-3.5 h-3.5 text-orange-accent/70 flex-shrink-0" />
            <span>
              Price:{" "}
              <span className="text-foreground/80 font-medium">
                {launch.priceInDoge} DOGE
              </span>
            </span>
          </div>
          {launch.totalSupply !== undefined && launch.totalSupply !== null && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Hash className="w-3.5 h-3.5 text-gold/70 flex-shrink-0" />
              <span>
                Total Supply:{" "}
                <span className="text-foreground/80 font-medium">
                  {Number(launch.totalSupply).toLocaleString()} {launch.ticker}
                </span>
              </span>
            </div>
          )}
          {launch.fundraiseGoal && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Target className="w-3.5 h-3.5 text-gold/70 flex-shrink-0" />
              <span className="truncate">
                Goal:{" "}
                <span className="text-foreground/80 font-medium">
                  {launch.fundraiseGoal} DOGE
                </span>
              </span>
            </div>
          )}
        </div>

        {/* CTA */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(launch)}
          className="mt-2 w-full border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/60 transition-all group"
        >
          View Details
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
        </Button>
      </div>
    </motion.div>
  );
}
