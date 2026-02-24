// ─────────────────────────────────────────────
//  TIME GROUP
//  A labeled time block grouping multiple clip
//  entries under a single timestamp header.
// ─────────────────────────────────────────────
import ClipEntry from './ClipEntry';
import type { ClipEntryData } from './ClipEntry';

export interface TimeGroupData {
    time:    string;
    entries: ClipEntryData[];
}

interface TimeGroupProps {
    group:       TimeGroupData;
    selectedIds: Set<string>;
    anySelected: boolean;
    onToggle:    (id: string) => void;
}

export default function TimeGroup({ group, selectedIds, anySelected, onToggle }: TimeGroupProps) {
    return (
        <div className="flex flex-col">
            {/* Time label row */}
            <div className="flex items-center gap-8 px-4 py-2">
                <span
                    className="font-mono flex-shrink-0"
                    style={{ fontSize: 11, color: '#4B5563' }}
                >
                    {group.time}
                </span>
                {/* Horizontal rule filling remaining space */}
                <div style={{ flex: 1, height: 1, backgroundColor: '#1A1A1A' }} />
            </div>

            {/* Clip entries */}
            {group.entries.map((entry) => {
                const selected = selectedIds.has(entry.id);
                return (
                    <ClipEntry
                        key={entry.id}
                        entry={entry}
                        selected={selected}
                        dimmed={anySelected && !selected}
                        onToggle={onToggle}
                    />
                );
            })}
        </div>
    );
}
