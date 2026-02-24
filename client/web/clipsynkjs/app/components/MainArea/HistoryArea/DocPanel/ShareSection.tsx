// ─────────────────────────────────────────────
//  SHARE SECTION
//  Four export destination buttons: g.docs,
//  notion, email, slack.
// ─────────────────────────────────────────────
const SHARE_TARGETS = ['g.docs', 'notion', 'email', 'slack'] as const;

export default function ShareSection() {
    function handleShare(target: string) {
        console.log(`[ShareSection] share to ${target} clicked`);
    }

    return (
        <div className="flex flex-col" style={{ gap: 8 }}>
            {/* Section header */}
            <span
                className="font-mono font-semibold"
                style={{ fontSize: 12, color: '#FFFFFF' }}
            >
                // send_to
            </span>

            {/* Share destination buttons */}
            <div className="flex flex-col" style={{ gap: 6 }}>
                {SHARE_TARGETS.map((target) => (
                    <button
                        key={target}
                        type="button"
                        className="cursor-pointer font-mono w-full transition-opacity hover:opacity-80"
                        onClick={() => handleShare(target)}
                        style={{
                            height:          32,
                            fontSize:        10,
                            color:           '#9CA3AF',
                            border:          '1px solid #2A2A2A',
                            backgroundColor: 'transparent',
                        }}
                    >
                        {target}
                    </button>
                ))}
            </div>
        </div>
    );
}
