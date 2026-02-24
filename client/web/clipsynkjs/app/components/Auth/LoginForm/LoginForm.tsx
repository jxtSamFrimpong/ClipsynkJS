import { useState, useEffect } from "react";
import { useNavigate, useNavigation, useFetcher } from "react-router";

import type { loginAction } from "~/services/actions/loginAction";
import { buildFingerprint } from "~/utils/device";
import GithubIcon from "~/components/Auth/Shared/GithubIcon";
import FormHeader from "./FormHeader";
import InputField from "./InputField";
import AuthButton from "./AuthButton";
import SSOButton from "./SSOButton";
import FormDivider from "./FormDivider";
import FormFooter from "./FormFooter";

// ─────────────────────────────────────────────
//  LOGIN FORM
//  Assembler — owns all form state and handlers.
//  Submits via useFetcher (FormData) → loginAction.
//  TODO: wire SSO buttons to OAuth providers.
// ─────────────────────────────────────────────
export default function LoginForm() {
    const navigate   = useNavigate();
    const fetcher    = useFetcher<typeof loginAction>();
    const navigation = useNavigation();

    const [email,      setEmail]      = useState("");
    const [password,   setPassword]   = useState("");
    const [rememberMe, setRememberMe] = useState(false);

    const loading    = fetcher.state !== "idle" || navigation.state !== "idle";
    const actionData = fetcher.data;

    // ── reactive field validation ───────────────
    const emailInvalid = email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    useEffect(() => {
        if (actionData?.error) {
            console.log("[LoginForm] action error:", actionData.error);
        }
    }, [actionData]);

    const handleSubmit = () => {
        console.log("[LoginForm] submit:", { email, rememberMe });

        if (emailInvalid) {
            console.log("[LoginForm] submit blocked: invalid email");
            return;
        }

        const deviceFingerprint = buildFingerprint();
        console.log("[LoginForm] device fingerprint collected:", deviceFingerprint);

        const fd = new FormData();
        fd.set("data", JSON.stringify({ email, password, deviceFingerprint }));
        fetcher.submit(fd, { method: "post" });
    };

    const handleForgotPassword = () => {
        console.log("[LoginForm] navigate to forgot_password");
        navigate("/auth/forgot-password");
    };

    const handleGoogleSSO = () => {
        console.log("[LoginForm] google SSO clicked");
        // TODO: trigger Google OAuth
    };

    const handleGithubSSO = () => {
        console.log("[LoginForm] github SSO clicked");
        // TODO: trigger GitHub OAuth
    };

    const handleSignUp = () => {
        console.log("[LoginForm] navigate to sign_up");
        navigate("/auth/signup");
    };

    const handleRememberMe = () => {
        setRememberMe((prev) => {
            console.log("[LoginForm] rememberMe:", !prev);
            return !prev;
        });
    };

    return (
        <div className="flex flex-col gap-8 w-full">

            <FormHeader
                title="log_in"
                subtitle="# enter your credentials to continue"
            />

            {/* form_fields */}
            <div className="flex flex-col gap-5 w-full">

                <InputField
                    label="email"
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={setEmail}
                    error={emailInvalid ? "err: invalid email address" : undefined}
                />

                <InputField
                    label="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={setPassword}
                    showToggle
                    rightElement={
                        <button
                            type="button"
                            onClick={handleForgotPassword}
                            className="cursor-pointer font-mono font-medium text-xs hover:opacity-80 transition-opacity"
                            style={{ color: "#10B981", backgroundColor: "transparent" }}
                        >
                            forgot_password?
                        </button>
                    }
                />

                {/* remember_me row */}
                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={handleRememberMe}
                        aria-label="toggle remember me"
                        className="cursor-pointer"
                        style={{
                            width:           16,
                            height:          16,
                            border:          "1px solid #2a2a2a",
                            backgroundColor: rememberMe ? "#10B981" : "transparent",
                            flexShrink:      0,
                        }}
                    />
                    <span className="font-mono text-[#9CA3AF] text-[13px]">
                        remember_me
                    </span>
                </div>

            </div>

            {/* form_actions */}
            <div className="flex flex-col gap-4 w-full">

                <AuthButton
                    label={loading ? "authenticating..." : "./authenticate"}
                    onClick={handleSubmit}
                    disabled={loading}
                />

                {/* api error */}
                {actionData?.error && (
                    <p
                        className="font-mono text-xs text-center"
                        style={{ color: "#EF4444" }}
                    >
                        {actionData.error}
                    </p>
                )}

                <FormDivider />

                {/* sso_row — 44px tall, buttons split 50/50 */}
                <div className="flex gap-3" style={{ height: 44 }}>
                    <SSOButton icon="G" label="google" onClick={handleGoogleSSO} />
                    <SSOButton icon={<GithubIcon />} label="github" onClick={handleGithubSSO} />
                </div>

                <FormFooter
                    text="don't have an account?"
                    linkLabel="sign_up"
                    onAction={handleSignUp}
                />

            </div>

        </div>
    );
}
