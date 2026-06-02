import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet, Link, createRootRouteWithContext, useRouter,
  HeadContent, Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/error-reporting";
import { ThemeProvider } from "../lib/theme";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <p className="text-xs uppercase tracking-widest text-accent mb-2">404</p>
        <h1 className="text-5xl font-bold tracking-tight">Lost in latent space</h1>
        <p className="mt-4 text-sm text-muted-foreground">The page you're looking for hasn't been generated yet.</p>
        <div className="mt-6 flex gap-2 justify-center">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-accent px-4 py-2 text-sm font-bold text-accent-foreground">Go home</Link>
          <Link to="/explore" className="inline-flex items-center justify-center rounded-md border border-border px-4 py-2 text-sm font-medium">Explore</Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => { reportLovableError(error, { boundary: "tanstack_root_error_component" }); }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">Something went wrong</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex gap-2 justify-center">
          <button onClick={() => { router.invalidate(); reset(); }} className="rounded-md bg-accent px-4 py-2 text-sm font-bold text-accent-foreground">Try again</button>
          <a href="/" className="rounded-md border border-border px-4 py-2 text-sm font-medium">Go home</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Luminal — AI image generator" },
      { name: "description", content: "Dream in high definition. The next generation of creative AI for studio-grade visuals." },
      { name: "author", content: "Luminal" },
      { property: "og:title", content: "Luminal — AI image generator" },
      { property: "og:description", content: "Dream in high definition. Studio-grade AI imagery." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head><HeadContent /></head>
      <body><ThemeProvider>{children}</ThemeProvider><Scripts /></body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
