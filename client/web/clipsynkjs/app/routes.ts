import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/dashboards.tsx"),
    route("devices",    "routes/devices.tsx"),
    route("history",    "routes/history.tsx"),
    route("help",       "routes/help.tsx"),
    route("clipboards", "routes/clipboards.tsx"),
    route("profile", "routes/profile.tsx", [
        route("account",      "routes/profile/account.tsx"),
        route("account/edit", "routes/profile/account-edit.tsx"),
        route("sync",         "routes/profile/sync.tsx"),
        route("storage",      "routes/profile/storage.tsx"),
        route("privacy",      "routes/profile/privacy.tsx"),
        route("plan",         "routes/profile/plan.tsx"),
        route("danger",       "routes/profile/danger.tsx"),
    ]),
    route("auth", "routes/auth.tsx", [
        route("login",           "routes/login.tsx"),
        route("signup",          "routes/signup.tsx"),
        route("forgot-password", "routes/forgot-password.tsx"),
        route("verify-token",    "routes/verify-token.tsx"),
        route("reset-password",  "routes/reset-password.tsx"),
    ]),
    route("*", "routes/NotFound.tsx"),
] satisfies RouteConfig;
