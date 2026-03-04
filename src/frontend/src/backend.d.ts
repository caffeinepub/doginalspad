import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Launch {
    id: bigint;
    status: LaunchStatus;
    ticker: string;
    projectName: string;
    createdAt: Time;
    fundraiseGoal?: string;
    description: string;
    totalSupply?: bigint;
    launchDate?: string;
    priceInDoge: string;
}
export interface UserProfile {
    name: string;
}
export enum LaunchStatus {
    upcoming = "upcoming",
    live = "live",
    ended = "ended"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createFirstLaunch(): Promise<void>;
    createLaunch(projectName: string, ticker: string, description: string, launchDate: string | null, totalSupply: bigint | null, priceInDoge: string, fundraiseGoal: string | null, status: LaunchStatus): Promise<bigint>;
    deleteLaunch(id: bigint): Promise<void>;
    getAllLaunches(): Promise<Array<Launch>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getLaunchById(id: bigint): Promise<Launch>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    updateLaunch(id: bigint, projectName: string, ticker: string, description: string, launchDate: string | null, totalSupply: bigint | null, priceInDoge: string, fundraiseGoal: string | null, status: LaunchStatus): Promise<void>;
}
