import { useNavigate } from "react-router";
import SectionLabel from "~/components/MainArea/Shared/SectionLabel";

// ─────────────────────────────────────────────
//  ACCOUNT HEADER
//  "// account" label + "edit profile" button.
// ─────────────────────────────────────────────
export default function AccountHeader() {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-between w-full">
            <SectionLabel label="account" size={16} />
            <button
                type="button"
                onClick={() => navigate("/profile/account/edit")}
                className="cursor-pointer flex items-center gap-1.5 font-mono text-[11px] transition-opacity hover:opacity-70"
                style={{
                    color: "#9CA3AF",
                    border: "1px solid #2A2A2A",
                    height: 32,
                    padding: "0 12px",
                    backgroundColor: "transparent",
                }}
            >
                ✎ edit profile
            </button>
        </div>
    );
}
