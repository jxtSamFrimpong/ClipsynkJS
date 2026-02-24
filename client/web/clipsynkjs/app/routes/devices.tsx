import DevicesDashboardPage from "~/pages/devices/DevicesDashboardPage";
import { requireAuth } from '~/loaders/auth';

export async function loader({ request }: { request: Request }) {
    return requireAuth(request);
}

export default DevicesDashboardPage;
