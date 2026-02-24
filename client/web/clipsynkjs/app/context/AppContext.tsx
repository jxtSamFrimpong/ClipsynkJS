import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

// ─────────────────────────────────────────────
//  TYPES
// ─────────────────────────────────────────────
interface User {
    username: string;
}

interface AppContextValue {
    user: User | null;
    setUser: (user: User | null) => void;
}

// ─────────────────────────────────────────────
//  CONTEXT
// ─────────────────────────────────────────────
const AppContext = createContext<AppContextValue | undefined>(undefined);

// ─────────────────────────────────────────────
//  PROVIDER
// ─────────────────────────────────────────────
export function AppProvider({ children }: { children: ReactNode }) {
    // TODO: replace with real auth state (session/token) when auth is wired up
    const [user, setUser] = useState<User | null>({ username: "alex_chen" });

    useEffect(() => {
        console.log("[AppContext] provider mounted, initial user:", user);
    }, []);

    useEffect(() => {
        console.log("[AppContext] user state changed:", user);
    }, [user]);

    function handleSetUser(u: User | null) {
        console.log("[AppContext] setUser called:", { previous: user, next: u });
        setUser(u);
    }

    return (
        <AppContext.Provider value={{ user, setUser: handleSetUser }}>
            {children}
        </AppContext.Provider>
    );
}

// ─────────────────────────────────────────────
//  HOOK
// ─────────────────────────────────────────────
export function useApp(): AppContextValue {
    const ctx = useContext(AppContext);
    if (ctx === undefined) {
        throw new Error("useApp must be used within an AppProvider");
    }
    return ctx;
}
