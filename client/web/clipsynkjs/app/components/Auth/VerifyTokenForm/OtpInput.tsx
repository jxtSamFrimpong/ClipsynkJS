import { useRef, useState } from "react";

// ─────────────────────────────────────────────
//  OTP INPUT
//  6 individual digit boxes. Auto-advances focus
//  on input, retreats on backspace, supports
//  paste. Active box gets green border.
//  Props mirror a standard controlled input.
// ─────────────────────────────────────────────
interface OtpInputProps {
    value: string;
    onChange: (value: string) => void;
}

export default function OtpInput({ value, onChange }: OtpInputProps) {
    const digits = value.padEnd(6, "").split("").slice(0, 6);
    const refs   = useRef<(HTMLInputElement | null)[]>([]);
    const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

    const update = (next: string[]) => {
        const joined = next.join("");
        console.log("[OtpInput] value:", joined);
        onChange(joined);
    };

    const handleChange = (index: number, raw: string) => {
        const digit = raw.replace(/\D/g, "").slice(-1);
        if (!digit) return;
        const next = [...digits];
        next[index] = digit;
        update(next);
        if (index < 5) refs.current[index + 1]?.focus();
    };

    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Backspace") {
            const next = [...digits];
            if (next[index]) {
                next[index] = "";
                update(next);
            } else if (index > 0) {
                refs.current[index - 1]?.focus();
            }
        } else if (e.key === "ArrowLeft" && index > 0) {
            refs.current[index - 1]?.focus();
        } else if (e.key === "ArrowRight" && index < 5) {
            refs.current[index + 1]?.focus();
        }
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
        const next = pasted.padEnd(6, "").split("").slice(0, 6);
        update(next);
        const lastFilled = Math.min(pasted.length, 5);
        refs.current[lastFilled]?.focus();
    };

    return (
        <div className="flex justify-center gap-3 w-full">
            {digits.map((digit, i) => {
                const isFocused = focusedIndex === i;
                return (
                    <input
                        key={i}
                        ref={(el) => { refs.current[i] = el; }}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        onPaste={handlePaste}
                        onFocus={() => setFocusedIndex(i)}
                        onBlur={() => setFocusedIndex(null)}
                        className="font-mono font-semibold text-2xl text-center text-[#FAFAFA] focus:outline-none"
                        style={{
                            width: 52,
                            height: 56,
                            border: `1px solid ${isFocused ? "#10B981" : "#2a2a2a"}`,
                            backgroundColor: "transparent",
                            caretColor: "#10B981",
                        }}
                    />
                );
            })}
        </div>
    );
}
