// ─────────────────────────────────────────────
//  DOC PANEL
//  Fixed 340px right panel: document builder,
//  share destinations, and recent docs.
// ─────────────────────────────────────────────
import { useEffect } from 'react';
import DocPreview from './DocPreview';
import ShareSection from './ShareSection';
import RecentDocs from './RecentDocs';

export default function DocPanel() {
    useEffect(() => {
        console.log('[DocPanel] mounted');
    }, []);

    return (
        <aside
            className="flex flex-col overflow-y-auto flex-shrink-0"
            style={{
                width:       340,
                height:      '100%',
                borderLeft:  '1px solid #2A2A2A',
                padding:     '32px 24px',
                gap:         20,
            }}
        >
            <DocPreview />
            <ShareSection />
            <RecentDocs />
        </aside>
    );
}
