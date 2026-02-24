import { Outlet } from "react-router";
import { requireGuest } from '~/loaders/auth';

export async function loader({ request }: { request: Request }) {
    return requireGuest(request);
}

// ─────────────────────────────────────────────
//  AUTH LAYOUT
//  Pathless layout that groups all /auth/*
//  routes. Adds no UI of its own — each child
//  page is a full-page component.
// ─────────────────────────────────────────────
export default function AuthLayout() {
    return <Outlet />;
}
