import type { Route } from "./+types/help";
import HelpPage from "~/pages/help/HelpPage";
import { requireAuth } from '~/loaders/auth';

export async function loader({ request }: Route.LoaderArgs) {
    return requireAuth(request);
}

export function meta({}: Route.MetaArgs) {
    return [{ title: "ClipSynkJS — Help" }];
}

export default function Help() {
    return <HelpPage />;
}
