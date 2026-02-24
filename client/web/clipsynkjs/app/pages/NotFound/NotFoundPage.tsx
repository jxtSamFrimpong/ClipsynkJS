import { useEffect } from "react";
import { useNavigate } from "react-router";
import ErrorCode from "~/components/NotFound/ErrorCode/ErrorCode";
import TerminalBlock from "~/components/NotFound/TerminalBlock/TerminalBlock";
import TerminalButton from "~/components/NotFound/Actions/TerminalButton";

// ─────────────────────────────────────────────
//  NOT FOUND PAGE
// ─────────────────────────────────────────────
export default function NotFoundPage() {
    const navigate = useNavigate();

    useEffect(() => {
        console.log("[NotFoundPage] 404 rendered — no matching route for current path");
    }, []);

    function handleGoHome() {
        console.log("[NotFoundPage] user navigating home from 404");
        navigate("/");
    }

    function handleGoBack() {
        console.log("[NotFoundPage] user navigating back from 404");
        navigate(-1);
    }

    return (
        <div
            className="min-h-screen bg-[#0A0A0A] flex items-center justify-center"
            style={{ minHeight: "100vh", backgroundColor: "#0A0A0A", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
            <div
                className="flex flex-col items-center gap-10 w-full max-w-[560px] px-6"
                style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "40px", width: "100%", maxWidth: "560px", padding: "0 24px" }}
            >

                {/* error code + terminal block */}
                <div
                    className="flex flex-col items-center gap-6 w-full"
                    style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "24px", width: "100%" }}
                >
                    <ErrorCode />
                    <TerminalBlock />
                </div>

                {/* description */}
                <p className="text-gray-500 font-mono text-sm text-center leading-relaxed">
                    the page you're looking for doesn't exist or has been moved.
                    try heading back to the dashboard.
                </p>

                {/* actions */}
                <div
                    className="flex items-center gap-4"
                    style={{ display: "flex", alignItems: "center", gap: "16px" }}
                >
                    <TerminalButton
                        icon="~"
                        label="./go_home"
                        variant="filled"
                        onClick={handleGoHome}
                    />
                    <TerminalButton
                        icon="<"
                        label="./go_back"
                        variant="outline"
                        onClick={handleGoBack}
                    />
                </div>

            </div>
        </div>
    );
}
