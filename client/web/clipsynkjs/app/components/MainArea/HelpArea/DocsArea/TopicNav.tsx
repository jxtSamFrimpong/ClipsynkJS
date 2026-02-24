// ─────────────────────────────────────────────
//  TOPIC NAV
//  5 tab chips — local active state.
//  "getting started" is active by default.
// ─────────────────────────────────────────────
import { useState } from 'react';

const TOPICS = [
    'getting started',
    'clipboard',
    'sync & devices',
    'integrations',
    'security',
] as const;

type Topic = typeof TOPICS[number];

export default function TopicNav() {
    const [active, setActive] = useState<Topic>('getting started');

    return (
        <div className="flex items-center" style={{ gap: 8 }}>
            {TOPICS.map(topic => {
                const isActive = topic === active;
                return (
                    <button
                        key={topic}
                        type="button"
                        className="cursor-pointer font-mono transition-opacity hover:opacity-80"
                        onClick={() => {
                            console.log('[TopicNav] topic selected:', topic);
                            setActive(topic);
                        }}
                        style={{
                            height:          32,
                            padding:         '0 14px',
                            fontSize:        12,
                            fontWeight:      isActive ? '500' : 'normal',
                            color:           isActive ? '#10B981' : '#6B7280',
                            backgroundColor: isActive ? '#1F1F1F' : 'transparent',
                            border:          isActive ? '1px solid #10B981' : '1px solid #2A2A2A',
                        }}
                    >
                        {topic}
                    </button>
                );
            })}
        </div>
    );
}
