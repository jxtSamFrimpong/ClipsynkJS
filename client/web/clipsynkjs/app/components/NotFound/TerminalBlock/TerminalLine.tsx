import type { ReactNode } from "react";

// ─────────────────────────────────────────────
//  TERMINAL LINE
// ─────────────────────────────────────────────
export default function TerminalLine({ children }: { children: ReactNode }) {
    return (
        <div className="flex items-center gap-2 font-mono text-sm">
            {children}
        </div>
    );
}
