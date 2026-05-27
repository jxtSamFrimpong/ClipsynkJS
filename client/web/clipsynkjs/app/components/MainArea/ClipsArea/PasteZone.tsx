import { useRef, useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { buildFingerprint } from "~/utils/device";

// ─────────────────────────────────────────────
//  PASTE ZONE
//  Auto-focusing zone for Ctrl/Cmd+V paste.
//  Icon, title, subtitle, keyboard shortcuts,
//  and note about file metadata.
// ─────────────────────────────────────────────

export default function PasteZone() {
    const zoneRef = useRef<HTMLDivElement>(null);
    const fetcher = useFetcher();
    // Local state owns clipboard read errors (permission denied, API failure).
    // These are distinct from backend errors that live in fetcher.data.
    const [clipboardError, setClipboardError] = useState<string | null>(null);

    useEffect(() => {
        // Auto-focus the zone so it's ready for Ctrl+V
        zoneRef.current?.focus();
    }, []);

    const handlePaste = async (e: React.KeyboardEvent<HTMLDivElement>) => {
        // Listen for Ctrl+V (Windows/Linux) or Cmd+V (Mac)
        if ((e.ctrlKey || e.metaKey) && e.key === "v") {
            e.preventDefault();
            console.log("[PasteZone] Paste shortcut triggered");
            // Clear any stale clipboard error before each new attempt
            setClipboardError(null);

            const deviceFingerprint = buildFingerprint();
            try {
                const clipboardItems = await navigator.clipboard.read();

                console.log("[PasteZone] clipboardItems:", clipboardItems);

                for (const item of clipboardItems) {
                    for (const type of item.types) {
                        const blob = await item.getType(type);

                        if (type.startsWith("image/")) {
                            const url = URL.createObjectURL(blob);
                            console.log("Image found:", url);
                        } else if (type === "text/plain") {
                            const text = await blob.text();
                            console.log("[PasteZone] Text found:", text);
                            // Guard: skip empty or whitespace-only pastes
                            if (!text.trim()) return;

                            const payload = {
                                generatedAt: new Date().toISOString(),
                                clientTimestamp: Date.now(),
                                deviceFingerprint,
                                mimeType: "text/plain",
                                content: text,
                                contentSize: new Blob([text]).size,
                            };

                            console.log("[PasteZone] Submitting payload:", payload);
                            fetcher.submit(
                                { data: JSON.stringify(payload) },
                                { method: "POST", action: "/?index" }
                            );
                        } else {
                            console.log("Unknown type:", type);
                        }
                    }
                }
            } catch (err) {
                // Distinguish permission denial from other clipboard read failures.
                // NotAllowedError = user blocked clipboard access in browser settings.
                if (err instanceof DOMException && err.name === "NotAllowedError") {
                    setClipboardError(
                        "Clipboard permission denied. Please allow clipboard access in your browser settings."
                    );
                } else {
                    setClipboardError("Could not read clipboard. Please try again.");
                }
                console.error("[PasteZone] Failed to read clipboard:", err);
            }
        }
    };

    // Derived UI state — no local copies, single source of truth from fetcher
    const isSubmitting = fetcher.state !== "idle";
    const actionData = fetcher.data as { success?: boolean; error?: string } | undefined;

    return (
        <div
            ref={zoneRef}
            tabIndex={0}
            onKeyDown={handlePaste}
            className={`flex flex-col items-center justify-center gap-2.5 w-full rounded-[10px] p-8 outline-none transition-all hover:bg-opacity-80${isSubmitting ? " opacity-50 pointer-events-none" : ""}`}
            style={{
                backgroundColor: "#141414",
                border: "1px solid #3a3a3a",
                minHeight: 128,
            }}
        >
            {/* Inner content */}
            <div className="flex items-center gap-5">
                {/* Paste icon wrapper */}
                <div
                    className="flex items-center justify-center rounded-[10px]"
                    style={{
                        width: 48,
                        height: 48,
                        backgroundColor: "#1e1e1e",
                        border: "1px solid #3a3a3a",
                    }}
                >
                    <svg
                        width="22"
                        height="22"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#FF8400"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                        <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                        <path d="M9 14h6"></path>
                        <path d="M9 10h6"></path>
                    </svg>
                </div>

                {/* Text block */}
                <div className="flex flex-col gap-1">
                    {/* Title */}
                    <div
                        className="font-mono font-bold"
                        style={{
                            color: "#FFFFFF",
                            fontSize: 15,
                        }}
                    >
                        paste anything here
                    </div>

                    {/* Subtitle */}
                    <div
                        className="font-mono"
                        style={{
                            color: "#6B7280",
                            fontSize: 12,
                        }}
                    >
                        detects text · images · files from OS · code automatically
                    </div>

                    {/* Shortcuts */}
                    <div className="flex items-center gap-1.5 mt-1">
                        <span
                            className="font-mono"
                            style={{
                                color: "#6B7280",
                                fontSize: 11,
                            }}
                        >
                            shortcut:
                        </span>

                        {/* Mac shortcut */}
                        <div
                            className="rounded px-1.5 py-0.5"
                            style={{
                                backgroundColor: "#2a2a2a",
                                border: "1px solid #3a3a3a",
                            }}
                        >
                            <span
                                className="font-mono font-bold"
                                style={{
                                    color: "#FAFAFA",
                                    fontSize: 11,
                                }}
                            >
                                ⌘V
                            </span>
                        </div>

                        <span
                            className="font-mono"
                            style={{
                                color: "#6B7280",
                                fontSize: 11,
                            }}
                        >
                            or
                        </span>

                        {/* Windows shortcut */}
                        <div
                            className="rounded px-1.5 py-0.5"
                            style={{
                                backgroundColor: "#2a2a2a",
                                border: "1px solid #3a3a3a",
                            }}
                        >
                            <span
                                className="font-mono font-bold"
                                style={{
                                    color: "#FAFAFA",
                                    fontSize: 11,
                                }}
                            >
                                Ctrl+V
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* File metadata note */}
            <div
                className="text-center font-mono mt-1"
                style={{
                    color: "#3f3f3f",
                    fontSize: 11,
                }}
            >
                files copied on your OS will include name · size · type · last modified metadata
            </div>

            {/* Status banner — priority: local clipboard error > backend error > backend success */}
            {clipboardError ? (
                <div className="text-center font-mono" style={{ color: "#F59E0B", fontSize: 11 }}>
                    {clipboardError}
                </div>
            ) : actionData?.error ? (
                <div className="text-center font-mono" style={{ color: "#EF4444", fontSize: 11 }}>
                    {actionData.error}
                </div>
            ) : actionData?.success ? (
                <div className="text-center font-mono" style={{ color: "#10B981", fontSize: 11 }}>
                    ✓ saved
                </div>
            ) : null}
        </div>
    );
}
