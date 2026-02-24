import { useState } from "react";
import type { ReactNode } from "react";

// ─────────────────────────────────────────────
//  INPUT FIELD
//  Reusable label + input group. Accepts an
//  optional rightElement for the label row
//  (e.g. "forgot_password?" link).
//  showToggle renders an ASCII visibility toggle
//  for password fields: [eye] ↔ [***]
// ─────────────────────────────────────────────
interface InputFieldProps {
    label: string;
    name?: string;
    type?: "text" | "email" | "password";
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    rightElement?: ReactNode;
    error?: string;       // shows red border + message below the input
    hasError?: boolean;   // shows red border only (cross-field errors with no local message)
    showToggle?: boolean; // password visibility toggle — only meaningful when type="password"
}

export default function InputField({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
    rightElement,
    error,
    hasError,
    showToggle = false,
}: InputFieldProps) {
    const [visible, setVisible] = useState(false);

    const isErrored   = !!error || hasError;
    const resolvedType = showToggle && type === "password"
        ? (visible ? "text" : "password")
        : type;

    return (
        <div className="flex flex-col gap-1.5 w-full">

            {/* label row */}
            <div className="flex items-center justify-between">
                <label className="text-[#9CA3AF] font-mono font-medium text-[13px]">
                    {label}
                </label>
                {rightElement}
            </div>

            {/* input + toggle wrapper */}
            <div className="relative w-full">
                <input
                    type={resolvedType}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full h-11 font-mono text-sm text-[#FAFAFA] placeholder:text-[#4B5563] border focus:outline-none transition-colors"
                    style={{
                        backgroundColor: "transparent",
                        borderColor: isErrored ? "#EF4444" : "#2a2a2a",
                        paddingLeft:  14,
                        paddingRight: showToggle ? 52 : 14,
                    }}
                />

                {showToggle && (
                    <button
                        type="button"
                        onClick={() => {
                            console.log("[InputField] password visibility toggled:", !visible ? "visible" : "hidden");
                            setVisible((v) => !v);
                        }}
                        className="cursor-pointer absolute right-0 top-0 h-11 px-3 font-mono text-xs flex items-center select-none"
                        style={{ color: visible ? "#10B981" : "#6B7280" }}
                    >
                        {visible ? "[***]" : "[eye]"}
                    </button>
                )}
            </div>

            {/* error message */}
            {error && (
                <p className="font-mono text-[11px]" style={{ color: "#EF4444" }}>
                    {error}
                </p>
            )}

        </div>
    );
}
