import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { type Launch, LaunchStatus } from "../backend.d";
import { useActor } from "./useActor";

export function useGetAllLaunches() {
  const { actor, isFetching } = useActor();
  return useQuery<Launch[]>({
    queryKey: ["launches"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllLaunches();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetLaunchById(id: bigint | null) {
  const { actor, isFetching } = useActor();
  return useQuery<Launch>({
    queryKey: ["launch", id?.toString()],
    queryFn: async () => {
      if (!actor || id === null) throw new Error("No actor or id");
      return actor.getLaunchById(id);
    },
    enabled: !!actor && !isFetching && id !== null,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery<boolean>({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateFirstLaunch() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("No actor");
      return actor.createFirstLaunch();
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["launches"] });
    },
  });
}

export function useCreateLaunch() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      projectName: string;
      ticker: string;
      description: string;
      launchDate: string | null;
      totalSupply: bigint | null;
      priceInDoge: string;
      fundraiseGoal: string | null;
      status: LaunchStatus;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.createLaunch(
        params.projectName,
        params.ticker,
        params.description,
        params.launchDate,
        params.totalSupply,
        params.priceInDoge,
        params.fundraiseGoal,
        params.status,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["launches"] });
    },
  });
}

export function useUpdateLaunch() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (params: {
      id: bigint;
      projectName: string;
      ticker: string;
      description: string;
      launchDate: string | null;
      totalSupply: bigint | null;
      priceInDoge: string;
      fundraiseGoal: string | null;
      status: LaunchStatus;
    }) => {
      if (!actor) throw new Error("No actor");
      return actor.updateLaunch(
        params.id,
        params.projectName,
        params.ticker,
        params.description,
        params.launchDate,
        params.totalSupply,
        params.priceInDoge,
        params.fundraiseGoal,
        params.status,
      );
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["launches"] });
    },
  });
}

export function useDeleteLaunch() {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("No actor");
      return actor.deleteLaunch(id);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["launches"] });
    },
  });
}

export { LaunchStatus };
