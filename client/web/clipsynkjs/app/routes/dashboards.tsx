import type { Route } from "./+types/dashboards";
import DashboardsPage from "~/pages/dashboards/dashboardsPage";
import { requireAuth } from '~/loaders/auth';

export async function loader({ request }: Route.LoaderArgs) {
    return requireAuth(request);
}


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "ClipSynkJS" },
        { name: "description", content: "Welcome to ClipSynkJS!" },
    ];
}

export default function dashboards() {
    return (
        <DashboardsPage />
    )
}