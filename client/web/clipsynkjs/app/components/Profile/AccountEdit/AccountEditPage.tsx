import { useState } from "react";
import { useNavigate } from "react-router";
import SectionLabel from "~/components/MainArea/Shared/SectionLabel";
import { useProfile } from "~/context/ProfileContext";
import AvatarEdit from "./AvatarEdit";
import EditFormGrid from "./EditFormGrid";
import PasswordSection from "./PasswordSection";
import ConnectedAccounts from "./ConnectedAccounts";

// ─────────────────────────────────────────────
//  ACCOUNT EDIT PAGE
// ─────────────────────────────────────────────
function Divider() {
    return <div style={{ height: 1, backgroundColor: "#1A1A1A", width: "100%" }} />;
}

export default function AccountEditPage() {
    const { profile, updateProfile } = useProfile();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: profile.username,
        email: profile.email,
        displayName: profile.displayName,
        timezone: profile.timezone,
        language: profile.language,
    });

    function handleChange(field: string, value: string) {
        setForm((prev) => ({ ...prev, [field]: value }));
    }

    function handleSave() {
        updateProfile(form);
        navigate("/profile/account");
    }

    return (
        <div className="flex flex-col gap-7 w-full" style={{ padding: 32 }}>
            {/* header */}
            <div className="flex items-center justify-between w-full">
                <SectionLabel label="edit_profile" size={16} />
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => navigate("/profile/account")}
                        className="cursor-pointer font-mono text-[12px] transition-opacity hover:opacity-70"
                        style={{ color: "#9CA3AF", border: "1px solid #2A2A2A", height: 34, padding: "0 16px", backgroundColor: "transparent" }}
                    >
                        cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        className="cursor-pointer font-mono font-semibold text-[12px] transition-opacity hover:opacity-80"
                        style={{ color: "#0A0A0A", backgroundColor: "#10B981", height: 34, padding: "0 16px" }}
                    >
                        save changes
                    </button>
                </div>
            </div>

            <AvatarEdit />
            <EditFormGrid values={form} onChange={handleChange} />
            <Divider />
            <PasswordSection />
            <Divider />
            <ConnectedAccounts />
        </div>
    );
}
