// ─────────────────────────────────────────────
//  SESSION STAT
//  A single status indicator: coloured dot + text
// ─────────────────────────────────────────────
interface SessionStatProps {
    color: string;
    text: string;
}

export default function SessionStat({ color, text }: SessionStatProps) {
    return (
        <div className="flex items-center gap-3">
            <span
                className="shrink-0 rounded-full"
                style={{ width: 8, height: 8, backgroundColor: color }}
            />
            <span className="text-[#9CA3AF] font-mono text-[13px]">{text}</span>
        </div>
    );
}
