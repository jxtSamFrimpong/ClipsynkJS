import { useState } from "react";
import SectionLabel from "~/components/MainArea/Shared/SectionLabel";
import { useProfile } from "~/context/ProfileContext";
import DangerAction from "./DangerAction";

// ─────────────────────────────────────────────
//  DANGER PAGE
// ─────────────────────────────────────────────
export default function DangerPage() {
    const { profile } = useProfile();
    const [confirmValue, setConfirmValue] = useState("");

    return (
        <div className="flex flex-col gap-7 w-full" style={{ padding: 32 }}>
            <SectionLabel label="danger_zone" color="#EF4444" size={16} />

            {/* warning banner */}
            <div
                className="flex items-center gap-2.5 w-full"
                style={{ backgroundColor: "#1C0A0A", border: "1px solid #EF4444", padding: 14 }}
            >
                <span className="font-mono text-[18px]" style={{ color: "#EF4444" }}>⚠</span>
                <span className="font-mono text-[12px]" style={{ color: "#EF4444" }}>
                    actions on this page are irreversible. proceed with caution.
                </span>
            </div>

            <DangerAction
                title="clear_all_clipboard_data"
                buttonLabel="clear data"
                description="permanently deletes all clipboard history, synced clips, and cached data across all devices. clipgroup memberships are preserved."
            />

            <DangerAction
                title="unlink_all_devices"
                buttonLabel="unlink all"
                description="removes all linked devices from your account. each device will need to go through the full linking process again. this will interrupt all active sync connections."
            />

            <DangerAction
                title="delete_account"
                buttonLabel="delete account"
                filled
                description="permanently deletes your entire clipsync account, including all data, devices, clipgroup memberships, integrations, and billing information. this action cannot be undone."
                extraContent={
                    <div className="flex flex-col gap-1.5 mt-2">
                        <span className="font-mono text-[11px]" style={{ color: "#EF4444" }}>
                            type your username to confirm:
                        </span>
                        <input
                            className="font-mono text-[12px] bg-transparent outline-none"
                            style={{
                                color: "#4B5563",
                                border: "1px solid #EF4444",
                                height: 36,
                                padding: "0 12px",
                                width: 300,
                            }}
                            value={confirmValue}
                            onChange={(e) => setConfirmValue(e.target.value)}
                            placeholder={profile.username}
                        />
                    </div>
                }
            />
        </div>
    );
}
