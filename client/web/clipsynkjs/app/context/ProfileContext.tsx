import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

// ─────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────
export interface ProfileData {
    username: string;
    email: string;
    displayName: string;
    timezone: string;
    language: string;
    plan: "free" | "pro" | "team";
    memberSince: string;
}

interface ProfileContextValue {
    profile: ProfileData;
    updateProfile: (partial: Partial<ProfileData>) => void;
}

// ─────────────────────────────────────────────
//  CONTEXT
// ─────────────────────────────────────────────
const ProfileContext = createContext<ProfileContextValue | undefined>(undefined);

// ─────────────────────────────────────────────
//  PROVIDER
// ─────────────────────────────────────────────
const DEFAULT_PROFILE: ProfileData = {
    username: "alex_chen",
    email: "alex.chen@example.com",
    displayName: "Alex Chen",
    timezone: "UTC-5 (EST)",
    language: "English",
    plan: "free",
    memberSince: "oct 2025",
};

export function ProfileProvider({ children }: { children: ReactNode }) {
    const [profile, setProfile] = useState<ProfileData>(DEFAULT_PROFILE);

    function updateProfile(partial: Partial<ProfileData>) {
        setProfile((prev) => ({ ...prev, ...partial }));
    }

    return (
        <ProfileContext.Provider value={{ profile, updateProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}

// ─────────────────────────────────────────────
//  HOOK
// ─────────────────────────────────────────────
export function useProfile(): ProfileContextValue {
    const ctx = useContext(ProfileContext);
    if (ctx === undefined) {
        throw new Error("useProfile must be used within a ProfileProvider");
    }
    return ctx;
}
