import LoginPage from "~/pages/Login/LoginPage";
import { loginAction } from "~/services/actions/loginAction";

export const action = loginAction;

export default function Login() {
    return <LoginPage />;
}
