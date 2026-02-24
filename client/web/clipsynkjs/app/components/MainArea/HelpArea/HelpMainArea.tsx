// ─────────────────────────────────────────────
//  HELP MAIN AREA
//  Two-state view machine:
//    chatOpen=false → DocsArea + FaqPanel (360px)
//    chatOpen=true  → DocsArea + ChatPanel (400px)
//
//  State owned here, passed down as props.
// ─────────────────────────────────────────────
import { useState, useEffect } from 'react';
import DocsArea from './DocsArea/DocsArea';
import FaqPanel from './FaqPanel/FaqPanel';
import ChatPanel from './ChatPanel/ChatPanel';

export default function HelpMainArea() {
    const [chatOpen, setChatOpen] = useState(false);

    useEffect(() => {
        console.log('[HelpMainArea] mounted');
    }, []);

    useEffect(() => {
        console.log('[HelpMainArea] chatOpen changed:', chatOpen);
    }, [chatOpen]);

    function onOpenChat() {
        console.log('[HelpMainArea] opening chat');
        setChatOpen(true);
    }

    function onCloseChat() {
        console.log('[HelpMainArea] closing chat');
        setChatOpen(false);
    }

    return (
        <main
            className="flex flex-1 min-h-0 overflow-hidden"
            style={{ backgroundColor: '#0A0A0A' }}
        >
            <DocsArea />
            {chatOpen
                ? <ChatPanel onClose={onCloseChat} />
                : <FaqPanel onOpenChat={onOpenChat} />
            }
        </main>
    );
}
