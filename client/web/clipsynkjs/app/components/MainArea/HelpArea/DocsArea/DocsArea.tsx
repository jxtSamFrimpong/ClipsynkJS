// ─────────────────────────────────────────────
//  DOCS AREA
//  Left column of the Help page (fill width).
//  Contains: header, topic nav, and content.
// ─────────────────────────────────────────────
import HelpHeader from './HelpHeader';
import TopicNav from './TopicNav';
import GettingStartedContent from './GettingStartedContent';

export default function DocsArea() {
    return (
        <div
            className="flex flex-col flex-1 min-h-0 overflow-hidden"
            style={{ padding: 32, gap: 28 }}
        >
            <HelpHeader />
            <TopicNav />
            <GettingStartedContent />
        </div>
    );
}
