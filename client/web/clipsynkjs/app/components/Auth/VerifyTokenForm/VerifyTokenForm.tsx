import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";

import FormHeader from "~/components/Auth/LoginForm/FormHeader";
import AuthButton from "~/components/Auth/LoginForm/AuthButton";
import OtpInput from "./OtpInput";

// ─────────────────────────────────────────────
//  VERIFY TOKEN FORM
//  Assembler — owns OTP value and a 5-minute
//  countdown timer. Bespoke footer (resend +
//  timer) instead of the shared FormFooter.
//  TODO: receive masked email via route state.
//  TODO: wire submit + resend to real API.
// ─────────────────────────────────────────────

const TIMER_SECONDS = 5 * 60; // 5 minutes

function formatTime(seconds: number) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

export default function VerifyTokenForm() {
    const navigate = useNavigate();

    const [otp, setOtp]         = useState("");
    const [loading, setLoading] = useState(false);
    const [remaining, setRemaining] = useState(TIMER_SECONDS);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // countdown timer
    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setRemaining((prev) => {
                if (prev <= 1) {
                    clearInterval(intervalRef.current!);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
    }, []);

    const handleSubmit = () => {
        console.log("[VerifyTokenForm] submit:", { otp });
        setLoading(true);
        // TODO: call verify-token API, navigate to /reset-password on success
        setTimeout(() => setLoading(false), 1000);
    };

    const handleResend = () => {
        console.log("[VerifyTokenForm] resend clicked");
        setRemaining(TIMER_SECONDS);
        setOtp("");
        // TODO: call resend-token API
    };

    // TODO: replace with email passed via route state from forgot-password
    const maskedEmail = "a***@example.com";

    return (
        <div className="flex flex-col gap-8 w-full">

            <FormHeader
                title="verify_token"
                subtitle="# enter the 6-digit code sent to your email"
                extra={
                    <div className="flex items-center gap-2 mt-1">
                        <span
                            className="font-mono text-[13px]"
                            style={{ color: "#4B5563", fontFamily: "IBM Plex Mono" }}
                        >
                            sent to:
                        </span>
                        <span
                            className="font-mono text-[13px] text-[#FAFAFA]"
                        >
                            {maskedEmail}
                        </span>
                    </div>
                }
            />

            <OtpInput value={otp} onChange={setOtp} />

            {/* form_actions */}
            <div className="flex flex-col gap-4 w-full">

                <AuthButton
                    label="./verify_token"
                    onClick={handleSubmit}
                    disabled={loading || otp.length < 6}
                />

                {/* resend row */}
                <div className="flex items-center gap-1.5">
                    <span
                        className="font-mono text-[13px]"
                        style={{ color: "#6B7280", fontFamily: "IBM Plex Mono" }}
                    >
                        didn't receive the code?
                    </span>
                    <button
                        type="button"
                        onClick={handleResend}
                        disabled={remaining > 0}
                        className="cursor-pointer font-mono font-medium text-[13px] transition-opacity hover:opacity-80 disabled:opacity-40"
                        style={{ color: "#10B981", backgroundColor: "transparent" }}
                    >
                        resend
                    </button>
                </div>

                {/* timer row */}
                <div className="flex items-center gap-2">
                    <span
                        className="font-mono text-[12px]"
                        style={{ color: "#4B5563", fontFamily: "IBM Plex Mono" }}
                    >
                        expires in:
                    </span>
                    <span
                        className="font-mono font-semibold text-[12px]"
                        style={{ color: remaining > 0 ? "#F59E0B" : "#EF4444" }}
                    >
                        {remaining > 0 ? formatTime(remaining) : "expired"}
                    </span>
                </div>

            </div>

        </div>
    );
}
