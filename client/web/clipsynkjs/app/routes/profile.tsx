import { Outlet, Navigate, useLocation } from "react-router";
import { ProfileProvider } from "~/context/ProfileContext";
import ProfileShell from "~/components/ProfileShell/ProfileShell";
import { requireAuth } from '~/loaders/auth';

export async function loader({ request }: { request: Request }) {
    return requireAuth(request);
}

// ─────────────────────────────────────────────
//  PROFILE LAYOUT ROUTE
//  Wraps all /profile/* pages with the
//  ProfileProvider and ProfileShell.
//  Redirects bare /profile to /profile/account.
// ─────────────────────────────────────────────
export default function ProfileLayout() {
    const { pathname } = useLocation();

    if (pathname === "/profile" || pathname === "/profile/") {
        return <Navigate to="/profile/account" replace />;
    }

    return (
        <ProfileProvider>
            <ProfileShell>
                <Outlet />
            </ProfileShell>
        </ProfileProvider>
    );
}
