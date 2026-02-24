import ProfileNavItem from "./ProfileNavItem";

// ─────────────────────────────────────────────
//  PROFILE NAV
//  200px left nav column: "> profile" title +
//  6 sub-section links.
// ─────────────────────────────────────────────
const NAV_ITEMS = [
    { label: "account",            route: "/profile/account" },
    { label: "sync & connectivity",route: "/profile/sync" },
    { label: "storage & history",  route: "/profile/storage" },
    { label: "privacy & security", route: "/profile/privacy" },
    { label: "plan & billing",     route: "/profile/plan" },
    { label: "danger zone",        route: "/profile/danger", isDanger: true },
] as const;

export default function ProfileNav() {
    return (
        <nav
            className="flex flex-col gap-1 flex-shrink-0 h-full"
            style={{
                width: 200,
                borderRight: "1px solid #2A2A2A",
                padding: "32px 20px",
            }}
        >
            <span
                className="font-mono font-medium"
                style={{ color: "#FAFAFA", fontSize: 16, marginBottom: 16 }}
            >
                &gt; profile
            </span>

            {NAV_ITEMS.map((item) => (
                <ProfileNavItem
                    key={item.route}
                    label={item.label}
                    route={item.route}
                    isDanger={"isDanger" in item ? item.isDanger : false}
                />
            ))}
        </nav>
    );
}
