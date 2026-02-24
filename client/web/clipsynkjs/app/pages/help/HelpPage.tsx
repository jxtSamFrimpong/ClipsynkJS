// ─────────────────────────────────────────────
//  HELP PAGE
//  Entry point for the /help route.
//  Wraps HelpMainArea in the shared DashboardShell.
// ─────────────────────────────────────────────
import { useEffect } from 'react';
import DashboardShell from '~/components/DashboardShell/DashboardShell';
import HelpMainArea from '~/components/MainArea/HelpArea/HelpMainArea';

export default function HelpPage() {
    useEffect(() => {
        console.log('[HelpPage] mounted');
    }, []);

    return (
        <DashboardShell>
            <HelpMainArea />
        </DashboardShell>
    );
}
