import type { ReactNode } from "react";

// ─────────────────────────────────────────────
//  AUTH PAGE SHELL
//  Full-page two-panel layout shared by every
//  auth route. Owns only the structural shell —
//  background, flex row, form container sizing.
//
//  leftPanel — compose <BrandingPanel /> here
//  children  — the form for this page
//
//  Usage:
//    <AuthPageShell leftPanel={<BrandingPanel ... />}>
//      <LoginForm />
//    </AuthPageShell>
// ─────────────────────────────────────────────
interface AuthPageShellProps {
    leftPanel: ReactNode;
    children: ReactNode;
}

export default function AuthPageShell({ leftPanel, children }: AuthPageShellProps) {
    return (
        <div style={{ minHeight: "100vh", display: "flex", backgroundColor: "#0A0A0A" }}>

            {leftPanel}

            {/* form panel */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "60px 80px",
                }}
            >
                {/* form container — fixed 400px */}
                <div style={{ width: 400 }}>
                    {children}
                </div>
            </div>

        </div>
    );
}
