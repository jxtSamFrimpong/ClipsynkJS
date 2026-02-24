// ─────────────────────────────────────────────
//  HISTORY SECTION
//  Left column of the history page.
//  All selection state is owned by HistoryMainArea
//  and passed down as props — this component is
//  fully controlled (no internal useState for selection).
// ─────────────────────────────────────────────
import HistoryHeader from './HistoryHeader';
import FilterBar from './FilterBar';
import DateNav from './DateNav';
import BatchBar from './BatchBar';
import Timeline from './Timeline/Timeline';

interface HistorySectionProps {
    selectedIds:      Set<string>;
    onToggle:         (id: string) => void;
    onClearSelection: () => void;
    onPullToDoc:      () => void;
}

export default function HistorySection({ selectedIds, onToggle, onClearSelection, onPullToDoc }: HistorySectionProps) {
    const hasSelection = selectedIds.size > 0;

    return (
        <div
            className="flex flex-col flex-1 overflow-hidden"
            style={{ gap: 24, padding: 32 }}
        >
            <HistoryHeader hasSelection={hasSelection} />
            <FilterBar />
            {hasSelection
                ? <BatchBar count={selectedIds.size} onClear={onClearSelection} onPullToDoc={onPullToDoc} />
                : <DateNav selectedCount={0} />
            }
            <Timeline
                selectedIds={selectedIds}
                anySelected={hasSelection}
                onToggle={onToggle}
            />
        </div>
    );
}
