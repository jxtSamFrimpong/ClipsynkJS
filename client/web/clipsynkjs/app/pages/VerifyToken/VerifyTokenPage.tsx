import AuthPageShell from "~/components/Auth/Shared/AuthPageShell";
import BrandingPanel from "~/components/Auth/BrandingPanel/BrandingPanel";
import StepIndicator from "~/components/Auth/StepIndicator/StepIndicator";
import VerifyTokenForm from "~/components/Auth/VerifyTokenForm/VerifyTokenForm";

export default function VerifyTokenPage() {
    return (
        <AuthPageShell
            leftPanel={
                <BrandingPanel
                    title={"check your\ninbox.\ntoken sent."}
                    description="# we sent a 6-digit verification code to your email. enter it below to continue the reset process."
                    bottomSlot={<StepIndicator activeStep={2} />}
                />
            }
        >
            <VerifyTokenForm />
        </AuthPageShell>
    );
}
