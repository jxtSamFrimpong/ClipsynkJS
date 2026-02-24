import { useState } from "react";
import { useNavigate } from "react-router";

import FormHeader from "~/components/Auth/LoginForm/FormHeader";
import InputField from "~/components/Auth/LoginForm/InputField";
import AuthButton from "~/components/Auth/LoginForm/AuthButton";
import FormFooter from "~/components/Auth/LoginForm/FormFooter";

// ─────────────────────────────────────────────
//  FORGOT PASSWORD FORM
//  Assembler — owns email state and handlers.
//  TODO: wire handleSubmit to real API.
// ─────────────────────────────────────────────
export default function ForgotPasswordForm() {
    const navigate = useNavigate();

    const [email, setEmail]   = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        console.log("[ForgotPasswordForm] submit:", { email });
        setLoading(true);
        // TODO: call send-reset-token API, then navigate to /verify-token
        setTimeout(() => setLoading(false), 1000);
    };

    const handleLogin = () => {
        console.log("[ForgotPasswordForm] navigate to log_in");
        navigate("/auth/login");
    };

    return (
        <div className="flex flex-col gap-8 w-full">

            <FormHeader
                title="forgot_password"
                subtitle="# we'll send a reset token to your email"
            />

            {/* form_fields */}
            <div className="flex flex-col gap-5 w-full">
                <InputField
                    label="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={setEmail}
                />
            </div>

            {/* form_actions */}
            <div className="flex flex-col gap-4 w-full">
                <AuthButton
                    label="./send_reset_token"
                    onClick={handleSubmit}
                    disabled={loading}
                />
                <FormFooter
                    text="remember your password?"
                    linkLabel="log_in"
                    onAction={handleLogin}
                />
            </div>

        </div>
    );
}
