import SignUpPage from "~/pages/SignUp/SignUpPage";
import { signUpAction } from "~/services/actions/signUpAction";

export const action = signUpAction;

export default function SignUp() {
    return <SignUpPage />;
}