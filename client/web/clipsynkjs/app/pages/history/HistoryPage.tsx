// ─────────────────────────────────────────────
//  HISTORY PAGE
//  Entry point for the /history route.
//  Wraps HistoryMainArea in the shared
//  DashboardShell (sidebar + context provider).
// ─────────────────────────────────────────────
import { useEffect } from 'react';
import DashboardShell from '~/components/DashboardShell/DashboardShell';
import HistoryMainArea from '~/components/MainArea/HistoryArea/HistoryMainArea';

export default function HistoryPage() {
    useEffect(() => {
        console.log('[HistoryPage] mounted');
    }, []);

    return (
        <DashboardShell>
            <HistoryMainArea />
        </DashboardShell>
    );
}
