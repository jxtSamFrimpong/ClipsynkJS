import AuthPageShell from "~/components/Auth/Shared/AuthPageShell";
import BrandingPanel from "~/components/Auth/BrandingPanel/BrandingPanel";
import FeatureList from "~/components/Auth/BrandingPanel/FeatureList";
import SignUpForm from "~/components/Auth/SignUpForm/SignUpForm";

export default function SignUpPage() {
    return (
        <AuthPageShell
            leftPanel={
                <BrandingPanel
                    title={"sync everything.\nacross everywhere."}
                    description="# seamless clipboard sharing across all your devices. encrypted, instant, effortless."
                    bottomSlot={<FeatureList />}
                />
            }
        >
            <SignUpForm />
        </AuthPageShell>
    );
}
