import { useLoaderData } from "react-router"
import type { loader } from "~/routes/clipboards";

export default function ClipboardsPage() {
    const { user, clipboards } = useLoaderData<typeof loader>();
    return (
        <div>
            <h1>Clipboards</h1>
            <p>User: {user.email}</p>
            <p>Clipboards: {clipboards.data.length}</p>
        </div>
    )
}