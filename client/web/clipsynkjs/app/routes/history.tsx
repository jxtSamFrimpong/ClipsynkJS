import type { Route } from "./+types/history";
import HistoryPage from "~/pages/history/HistoryPage";
import { requireAuth } from '~/loaders/auth';

export async function loader({ request }: Route.LoaderArgs) {
    return requireAuth(request);
}

export function meta({}: Route.MetaArgs) {
    return [{ title: "ClipSynkJS — History" }];
}

export default function History() {
    return <HistoryPage />;
}
