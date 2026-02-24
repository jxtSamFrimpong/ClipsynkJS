import AuthPageShell from "~/components/Auth/Shared/AuthPageShell";
import BrandingPanel from "~/components/Auth/BrandingPanel/BrandingPanel";
import StepIndicator from "~/components/Auth/StepIndicator/StepIndicator";
import ForgotPasswordForm from "~/components/Auth/ForgotPasswordForm/ForgotPasswordForm";

export default function ForgotPasswordPage() {
    return (
        <AuthPageShell
            leftPanel={
                <BrandingPanel
                    title={"lost your key?\nwe'll get you\nback in."}
                    description="# enter your email and we'll send a reset token to your inbox. check spam if you don't see it."
                    bottomSlot={<StepIndicator activeStep={1} />}
                />
            }
        >
            <ForgotPasswordForm />
        </AuthPageShell>
    );
}
