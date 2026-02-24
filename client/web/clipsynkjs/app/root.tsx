import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";
import { useEffect } from "react";

import type { Route } from "./+types/root";
import "./app.css";
import { AppProvider } from "~/context/AppContext";
import NotFoundPage from "~/pages/NotFound/NotFoundPage";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ backgroundColor: "#0d0d0d" }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* Inline critical reset — travels with HTML bytes, no fetch required.
            Prevents browser-default white backgrounds on buttons and form
            elements from flashing before Tailwind Preflight loads. */}
        <style dangerouslySetInnerHTML={{ __html: `
          *, *::before, *::after { box-sizing: border-box; }
          button, input, select, textarea { background-color: transparent; appearance: none; }
        `}} />
        <Meta />
        <Links />
      </head>
      <body style={{ backgroundColor: "#0d0d0d" }}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const location = useLocation();

  useEffect(() => {
    console.log("[App] mounted");
  }, []);

  useEffect(() => {
    console.log("[App] route changed:", location.pathname);
  }, [location.pathname]);

  return (
    <AppProvider>
      <Outlet />
    </AppProvider>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  // 404 — hand off to the dedicated NotFound page
  if (isRouteErrorResponse(error) && error.status === 404) {
    console.log("[ErrorBoundary] 404 caught — rendering NotFoundPage");
    return <NotFoundPage />;
  }

  // All other errors — generic dev/prod error UI
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = String(error.status);
    details = error.statusText || details;
    console.log("[ErrorBoundary] route error:", error.status, error.statusText);
  } else if (import.meta.env.DEV && error instanceof Error) {
    details = error.message;
    stack = error.stack;
    console.log("[ErrorBoundary] unhandled error:", error.message);
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
