import AuthPageShell from "~/components/Auth/Shared/AuthPageShell";
import BrandingPanel from "~/components/Auth/BrandingPanel/BrandingPanel";
import StepIndicator from "~/components/Auth/StepIndicator/StepIndicator";
import ResetPasswordForm from "~/components/Auth/ResetPasswordForm/ResetPasswordForm";

export default function ResetPasswordPage() {
    return (
        <AuthPageShell
            leftPanel={
                <BrandingPanel
                    title={"almost there.\nset a new\npassword."}
                    description="# choose a strong password you haven't used before. your clipboard history will remain intact."
                    bottomSlot={<StepIndicator activeStep={3} />}
                />
            }
        >
            <ResetPasswordForm />
        </AuthPageShell>
    );
}
