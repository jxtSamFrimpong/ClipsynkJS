// ─────────────────────────────────────────────
//  FEATURE ITEM
//  Single bullet in the Sign Up feature list.
//  Green "~" prefix + gray text.
// ─────────────────────────────────────────────
interface FeatureItemProps {
    text: string;
}

export default function FeatureItem({ text }: FeatureItemProps) {
    return (
        <div className="flex items-center gap-3">
            <span
                className="font-mono font-bold text-base leading-none"
                style={{ color: "#10B981" }}
            >
                ~
            </span>
            <span
                className="font-mono text-[#9CA3AF] text-[13px]"
                style={{ fontFamily: "IBM Plex Mono" }}
            >
                {text}
            </span>
        </div>
    );
}
