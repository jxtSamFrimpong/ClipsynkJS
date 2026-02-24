import FeatureItem from "./FeatureItem";

// ─────────────────────────────────────────────
//  FEATURE LIST
//  Three product feature bullets shown at the
//  bottom of the branding panel on Sign Up.
// ─────────────────────────────────────────────
const FEATURES = [
    "end-to-end encryption",
    "cross-platform sync",
    "unlimited clipboard history",
] as const;

export default function FeatureList() {
    return (
        <div className="flex flex-col gap-5 w-full">
            {FEATURES.map((f) => (
                <FeatureItem key={f} text={f} />
            ))}
        </div>
    );
}
