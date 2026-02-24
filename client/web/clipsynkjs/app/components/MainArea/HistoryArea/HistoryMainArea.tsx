// ─────────────────────────────────────────────
//  HISTORY MAIN AREA
//  Owns the three-state view machine:
//    'history' + no selection → HistorySection + DocPanel (340px)
//    'history' + selection    → HistorySection + SelectionPanel (320px)
//    'doc_builder'            → DocBuilderArea (full width)
//
//  All selection state lives here and is passed
//  down as props (controlled children).
// ─────────────────────────────────────────────
import { useState, useEffect } from 'react';
import HistorySection from './HistorySection/HistorySection';
import DocPanel from './DocPanel/DocPanel';
import SelectionPanel from './DocPanel/SelectionPanel';
import DocBuilderArea from './DocBuilderArea';
import ShareArea from './ShareArea';

type HistoryView = 'history' | 'doc_builder' | 'share';

export default function HistoryMainArea() {
    const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set(['e1', 'e2']));
    const [view, setView]               = useState<HistoryView>('history');

    useEffect(() => {
        console.log('[HistoryMainArea] mounted');
    }, []);

    useEffect(() => {
        console.log('[HistoryMainArea] selectedIds changed:', [...selectedIds]);
    }, [selectedIds]);

    useEffect(() => {
        console.log('[HistoryMainArea] view changed:', view);
    }, [view]);

    function onToggle(id: string) {
        setSelectedIds(prev => {
            const next = new Set(prev);
            next.has(id) ? next.delete(id) : next.add(id);
            console.log('[HistoryMainArea] toggle:', id, '→', !prev.has(id));
            return next;
        });
    }

    function onClearSelection() {
        console.log('[HistoryMainArea] clearing selection');
        setSelectedIds(new Set());
    }

    function onPullToDoc() {
        console.log('[HistoryMainArea] pull to doc, selected:', [...selectedIds]);
        setView('doc_builder');
    }

    function onBack() {
        console.log('[HistoryMainArea] back to history');
        setView('history');
    }

    function onShare() {
        console.log('[HistoryMainArea] share');
        setView('share');
    }

    if (view === 'doc_builder') {
        return <DocBuilderArea selectedIds={selectedIds} onBack={onBack} onShare={onShare} />;
    }

    if (view === 'share') {
        return <ShareArea selectedIds={selectedIds} onBack={onBack} />;
    }

    return (
        <main
            className="flex flex-1 min-h-0 overflow-hidden"
            style={{ backgroundColor: '#0A0A0A' }}
        >
            <HistorySection
                selectedIds={selectedIds}
                onToggle={onToggle}
                onClearSelection={onClearSelection}
                onPullToDoc={onPullToDoc}
            />
            {selectedIds.size > 0
                ? <SelectionPanel
                    selectedIds={selectedIds}
                    onPullToDoc={onPullToDoc}
                    onClearSelection={onClearSelection}
                    onShare={onShare}
                  />
                : <DocPanel />
            }
        </main>
    );
}
