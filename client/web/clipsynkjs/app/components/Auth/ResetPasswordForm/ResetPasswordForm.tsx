import { useState } from "react";
import { useNavigate } from "react-router";

import FormHeader from "~/components/Auth/LoginForm/FormHeader";
import InputField from "~/components/Auth/LoginForm/InputField";
import AuthButton from "~/components/Auth/LoginForm/AuthButton";
import FormFooter from "~/components/Auth/LoginForm/FormFooter";
import PasswordRequirements from "./PasswordRequirements";

// ─────────────────────────────────────────────
//  RESET PASSWORD FORM
//  Assembler — owns newPassword + confirm state.
//  TODO: wire handleSubmit to real API.
// ─────────────────────────────────────────────
export default function ResetPasswordForm() {
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirm, setConfirm]         = useState("");
    const [loading, setLoading]         = useState(false);

    const handleSubmit = () => {
        console.log("[ResetPasswordForm] submit");
        setLoading(true);
        // TODO: call update-password API, navigate to /login on success
        setTimeout(() => setLoading(false), 1000);
    };

    const handleLogin = () => {
        console.log("[ResetPasswordForm] navigate to log_in");
        navigate("/auth/login");
    };

    return (
        <div className="flex flex-col gap-8 w-full">

            <FormHeader
                title="reset_password"
                subtitle="# create a new secure password for your account"
            />

            {/* form_fields */}
            <div className="flex flex-col gap-5 w-full">

                <InputField
                    label="new_password"
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={setNewPassword}
                />

                <InputField
                    label="confirm_password"
                    type="password"
                    placeholder="••••••••"
                    value={confirm}
                    onChange={setConfirm}
                />

                <PasswordRequirements />

            </div>

            {/* form_actions */}
            <div className="flex flex-col gap-4 w-full">

                <AuthButton
                    label="./update_password"
                    onClick={handleSubmit}
                    disabled={loading}
                />

                <FormFooter
                    text="back to"
                    linkLabel="log_in"
                    onAction={handleLogin}
                />

            </div>

        </div>
    );
}
