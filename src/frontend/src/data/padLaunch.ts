import { LaunchStatus } from "../backend.d";
import type { Launch } from "../backend.d";

export interface LaunchWithImage extends Launch {
  imageUrl?: string;
}

export const PAD_LAUNCH: LaunchWithImage = {
  id: BigInt(0),
  projectName: "DOGINALSPAD",
  ticker: "$PAD",
  description:
    "$PAD is the utility token of our launchpad platform, giving holders access to new project launches, exclusive allocations, and ecosystem benefits.",
  launchDate: "Coming Soon",
  totalSupply: BigInt(100000),
  priceInDoge: "1",
  fundraiseGoal: undefined,
  status: LaunchStatus.upcoming,
  createdAt: BigInt(0),
  imageUrl: "/assets/uploads/safeimagekit-resized-1000054881-1.png",
};

/**
 * Merge backend launches with the static PAD fallback.
 * If backend already has a $PAD entry (by ticker), prefer that (but add imageUrl to it).
 * Otherwise inject the static one at the front.
 */
export function mergeWithPadFallback(
  backendLaunches: Launch[],
): LaunchWithImage[] {
  const hasPad = backendLaunches.some((l) => l.ticker.toUpperCase() === "$PAD");
  if (hasPad) {
    return backendLaunches.map((l) =>
      l.ticker.toUpperCase() === "$PAD"
        ? {
            ...l,
            imageUrl: "/assets/uploads/safeimagekit-resized-1000054881-1.png",
          }
        : l,
    );
  }
  return [PAD_LAUNCH, ...backendLaunches];
}
