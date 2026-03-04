import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Coins,
  Hash,
  Share2,
  Target,
  TrendingUp,
  X,
} from "lucide-react";
import { toast } from "sonner";
import type { LaunchWithImage } from "../data/padLaunch";
import { StatusBadge } from "./StatusBadge";

interface LaunchDetailModalProps {
  launch: LaunchWithImage | null;
  open: boolean;
  onClose: () => void;
}

function DetailRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: "oklch(var(--gold) / 0.1)" }}
      >
        <Icon className="w-4 h-4 text-gold" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-0.5">
          {label}
        </p>
        <p className="text-sm font-semibold text-foreground truncate">
          {value}
        </p>
      </div>
    </div>
  );
}

export function LaunchDetailModal({
  launch,
  open,
  onClose,
}: LaunchDetailModalProps) {
  const handleParticipate = () => {
    toast.info("Connect your wallet to participate — coming soon!", {
      description: "DOGE wallet integration is on the way.",
      duration: 4000,
    });
  };

  const handleShare = () => {
    const url = window.location.href;
    void navigator.clipboard.writeText(url).then(() => {
      toast.success("Link copied to clipboard!");
    });
  };

  if (!launch) return null;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent
        data-ocid="launch_detail.dialog"
        className="max-w-lg w-full border-gold/20 p-0 overflow-hidden"
        style={{ background: "oklch(var(--card))" }}
      >
        {/* Top gradient bar */}
        <div
          className="h-1 w-full"
          style={{
            background:
              "linear-gradient(90deg, oklch(var(--gold)), oklch(var(--orange)))",
          }}
        />

        <div className="p-6">
          {/* Token image — shown prominently at top when available */}
          {launch.imageUrl && (
            <div className="flex justify-center mb-5">
              <img
                src={launch.imageUrl}
                alt={launch.ticker}
                className="w-20 h-20 rounded-full object-cover border-2 shadow-lg"
                style={{
                  borderColor: "oklch(var(--gold) / 0.5)",
                  boxShadow: "0 0 20px oklch(var(--gold) / 0.2)",
                }}
              />
            </div>
          )}

          <DialogHeader className="mb-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-2">
                  <span className="text-xs font-bold tracking-wider px-2.5 py-1 rounded bg-primary/10 text-gold border border-gold/20">
                    {launch.ticker}
                  </span>
                  <StatusBadge status={launch.status} />
                </div>
                <DialogTitle className="font-display text-2xl font-bold text-foreground leading-tight">
                  {launch.projectName}
                </DialogTitle>
              </div>
              <button
                type="button"
                data-ocid="launch_detail.close_button"
                onClick={onClose}
                className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors flex-shrink-0"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </DialogHeader>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {launch.description}
          </p>

          <Separator className="bg-border/50 mb-4" />

          {/* Details grid */}
          <div className="space-y-0 divide-y divide-border/30">
            <DetailRow
              icon={Coins}
              label="Price"
              value={`${launch.priceInDoge} DOGE`}
            />
            {launch.launchDate && (
              <DetailRow
                icon={Calendar}
                label="Launch Date"
                value={launch.launchDate}
              />
            )}
            {launch.fundraiseGoal && (
              <DetailRow
                icon={Target}
                label="Fundraise Goal"
                value={`${launch.fundraiseGoal} DOGE`}
              />
            )}
            {launch.totalSupply !== undefined &&
              launch.totalSupply !== null && (
                <DetailRow
                  icon={Hash}
                  label="Total Supply"
                  value={Number(launch.totalSupply).toLocaleString()}
                />
              )}
            <DetailRow
              icon={TrendingUp}
              label="Payment Currency"
              value="DOGE (Dogecoin)"
            />
          </div>

          <Separator className="bg-border/50 my-4" />

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              data-ocid="launch_detail.participate_button"
              className="flex-1 font-bold text-sm"
              style={{
                background:
                  "linear-gradient(135deg, oklch(var(--gold)), oklch(var(--orange)))",
                color: "oklch(var(--primary-foreground))",
              }}
              onClick={handleParticipate}
            >
              <Coins className="w-4 h-4 mr-2" />
              Participate with DOGE
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleShare}
              className="border-gold/30 text-gold hover:bg-gold/10 hover:border-gold/60"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
