import { useState, useEffect } from "react";
import { useNavigate, useNavigation, useFetcher } from "react-router";

import type { signUpAction } from "~/services/actions/signUpAction";
import { buildDeviceInfo } from "~/utils/device";
import GithubIcon from "~/components/Auth/Shared/GithubIcon";
import FormHeader from "~/components/Auth/LoginForm/FormHeader";
import InputField from "~/components/Auth/LoginForm/InputField";
import AuthButton from "~/components/Auth/LoginForm/AuthButton";
import SSOButton from "~/components/Auth/LoginForm/SSOButton";
import FormDivider from "~/components/Auth/LoginForm/FormDivider";
import FormFooter from "~/components/Auth/LoginForm/FormFooter";

// ─────────────────────────────────────────────
//  SIGN UP FORM
//  Assembler — owns all form state and handlers.
//  Submits via useFetcher (FormData) → signUpAction.
//  Device info collected at submit time via utils/device.
//  TODO: wire SSO buttons to OAuth providers.
// ─────────────────────────────────────────────
export default function SignUpForm() {
    const navigate   = useNavigate();
    const fetcher    = useFetcher<typeof signUpAction>();
    const navigation = useNavigation();

    const [firstName, setFirstName] = useState("");
    const [lastName,  setLastName]  = useState("");
    const [email,     setEmail]     = useState("");
    const [password,  setPassword]  = useState("");
    const [confirm,   setConfirm]   = useState("");

    const loading    = fetcher.state !== "idle" || navigation.state !== "idle";
    const actionData = fetcher.data;

    // ── reactive field validation ───────────────
    const emailInvalid    = email.length > 0 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    // mirrors backend SignupUserDto @Matches + @MaxLength(100) exactly
    const PASSWORD_REGEX  = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const passwordTooLong = password.length > 100;
    const passwordWeak    = password.length > 0 && !passwordTooLong && !PASSWORD_REGEX.test(password);
    const passwordError   = password.length > 0
        ? passwordTooLong ? "err: password must not exceed 100 characters"
        : passwordWeak    ? "err: min 8 chars, uppercase, lowercase, number, special (@$!%*?&)"
        : undefined
        : undefined;
    const passwordMismatch = confirm.length > 0 && confirm !== password;

    useEffect(() => {
        if (actionData?.error) {
            console.log("[SignUpForm] action error:", actionData.error);
        }
    }, [actionData]);

    const handleSubmit = () => {
        console.log("[SignUpForm] submit:", { firstName, lastName, email });

        // guards: UI already shows these errors — block submit silently
        if (emailInvalid) {
            console.log("[SignUpForm] submit blocked: invalid email");
            return;
        }
        if (passwordError) {
            console.log("[SignUpForm] submit blocked:", passwordError);
            return;
        }
        if (password !== confirm) {
            console.log("[SignUpForm] submit blocked: passwords do not match");
            return;
        }

        const device = buildDeviceInfo();
        console.log("[SignUpForm] device info collected:", device);

        // confirm is intentionally excluded — UI-only field, backend doesn't expect it
        // FormData used as SubmitTarget to avoid TypeScript's JsonValue index-signature
        // constraint on named interfaces with nested objects
        const fd = new FormData();
        fd.set("data", JSON.stringify({ firstName, lastName, email, password, device }));
        fetcher.submit(fd, { method: "post" });
    };

    const handleGoogleSSO = () => {
        console.log("[SignUpForm] google SSO clicked");
        // TODO: trigger Google OAuth
    };

    const handleGithubSSO = () => {
        console.log("[SignUpForm] github SSO clicked");
        // TODO: trigger GitHub OAuth
    };

    const handleLogin = () => {
        console.log("[SignUpForm] navigate to log_in");
        navigate("/auth/login");
    };

    return (
        <div className="flex flex-col gap-8 w-full">

            <FormHeader
                title="create_account"
                subtitle="# enter your details to get started"
            />

            {/* form_fields */}
            <div className="flex flex-col gap-5 w-full">

                {/* name_row — first + last side by side */}
                <div className="flex gap-4 w-full">
                    <InputField
                        label="first_name"
                        placeholder="jane"
                        value={firstName}
                        onChange={setFirstName}
                    />
                    <InputField
                        label="last_name"
                        placeholder="doe"
                        value={lastName}
                        onChange={setLastName}
                    />
                </div>

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
                    error={passwordError}
                    hasError={!passwordError && passwordMismatch}
                    showToggle
                />

                <InputField
                    label="confirm_password"
                    type="password"
                    placeholder="••••••••"
                    value={confirm}
                    onChange={setConfirm}
                    error={passwordMismatch ? "err: passwords do not match" : undefined}
                    showToggle
                />

            </div>

            {/* form_actions */}
            <div className="flex flex-col gap-4 w-full">

                <AuthButton
                    label={loading ? "creating account..." : "./create_account"}
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
                    text="already have an account?"
                    linkLabel="log_in"
                    onAction={handleLogin}
                />

            </div>

        </div>
    );
}
