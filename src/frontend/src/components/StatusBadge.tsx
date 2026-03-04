import { LaunchStatus } from "../hooks/useQueries";

interface StatusBadgeProps {
  status: LaunchStatus;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const labelMap: Record<LaunchStatus, string> = {
    [LaunchStatus.live]: "🟢 Live",
    [LaunchStatus.upcoming]: "🔵 Upcoming",
    [LaunchStatus.ended]: "⚫ Ended",
  };

  const classMap: Record<LaunchStatus, string> = {
    [LaunchStatus.live]: "status-live",
    [LaunchStatus.upcoming]: "status-upcoming",
    [LaunchStatus.ended]: "status-ended",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${classMap[status]} ${className}`}
    >
      {labelMap[status]}
    </span>
  );
}
