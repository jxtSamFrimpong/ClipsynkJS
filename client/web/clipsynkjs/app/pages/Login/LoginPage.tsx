import AuthPageShell from "~/components/Auth/Shared/AuthPageShell";
import BrandingPanel from "~/components/Auth/BrandingPanel/BrandingPanel";
import SessionStats from "~/components/Auth/BrandingPanel/SessionStats";
import LoginForm from "~/components/Auth/LoginForm/LoginForm";

export default function LoginPage() {
    return (
        <AuthPageShell
            leftPanel={
                <BrandingPanel
                    title={"welcome back.\npick up where\nyou left off."}
                    description="# your clipboard is waiting. log in to resume syncing across all connected devices."
                    bottomSlot={<SessionStats />}
                />
            }
        >
            <LoginForm />
        </AuthPageShell>
    );
}
