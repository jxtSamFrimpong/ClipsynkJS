import type { ReactNode } from "react";
import AuthLogo from "./AuthLogo";
import BrandCopy from "./BrandCopy";

// ─────────────────────────────────────────────
//  BRANDING PANEL
//  Left panel shared by all auth pages.
//  Logo + brand copy at top; bottomSlot pushed
//  to the bottom via justify-between.
// ─────────────────────────────────────────────
interface BrandingPanelProps {
    title: string;
    description: string;
    bottomSlot: ReactNode;
}

export default function BrandingPanel({ title, description, bottomSlot }: BrandingPanelProps) {
    return (
        <div
            className="flex flex-col justify-between p-[60px_48px]"
            style={{ backgroundColor: "#111111", width: 560, flexShrink: 0, minHeight: "100vh" }}
        >
            {/* top: logo + brand copy */}
            <div className="flex flex-col gap-12 w-full">
                <AuthLogo />
                <BrandCopy title={title} description={description} />
            </div>

            {/* bottom: page-specific section */}
            {bottomSlot}
        </div>
    );
}
