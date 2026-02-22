import type { Route } from "./+types/dashboards";
import DashboardsPage from "~/pages/dashboards/dashboardsPage";


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