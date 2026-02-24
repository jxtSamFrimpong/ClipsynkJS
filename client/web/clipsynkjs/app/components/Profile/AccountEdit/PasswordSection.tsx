import SectionLabel from "~/components/MainArea/Shared/SectionLabel";
import { useState } from "react";

// ─────────────────────────────────────────────
//  PASSWORD SECTION
//  Three password fields: current, new, confirm.
// ─────────────────────────────────────────────
export default function PasswordSection() {
    const [current, setCurrent] = useState("");
    const [next, setNext] = useState("");
    const [confirm, setConfirm] = useState("");

    const fields = [
        { label: "current_password", value: current, onChange: setCurrent, placeholder: "••••••••••" },
        { label: "new_password",     value: next,    onChange: setNext,    placeholder: "enter new password" },
        { label: "confirm_password", value: confirm, onChange: setConfirm, placeholder: "confirm new password" },
    ];

    return (
        <div className="flex flex-col gap-3 w-full">
            <SectionLabel label="change_password" size={14} />
            <div className="flex gap-5 w-full">
                {fields.map((f) => (
                    <div key={f.label} className="flex flex-col gap-1.5 flex-1">
                        <span className="font-mono text-[11px]" style={{ color: "#9CA3AF" }}>{f.label}</span>
                        <input
                            type="password"
                            className="font-mono text-[13px] bg-transparent outline-none w-full"
                            style={{
                                color: "#FAFAFA",
                                border: "1px solid #2A2A2A",
                                height: 40,
                                padding: "0 12px",
                            }}
                            value={f.value}
                            onChange={(e) => f.onChange(e.target.value)}
                            placeholder={f.placeholder}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}
