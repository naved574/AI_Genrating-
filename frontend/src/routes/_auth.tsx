import { createFileRoute, Outlet, Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

export const Route = createFileRoute("/_auth")({
  component: () => (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col p-10 border-r border-border bg-card overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-primary-muted/20 animate-drift" />
        <Link to="/" className="relative flex items-center gap-2 z-10">
          <div className="size-8 rounded-lg bg-gradient-to-br from-accent to-primary-muted flex items-center justify-center"><Sparkles className="size-4 text-white" /></div>
          <span className="font-bold tracking-tight text-lg">LUMINAL</span>
        </Link>
        <div className="relative mt-auto z-10">
          <p className="text-4xl font-bold tracking-tight max-w-md leading-tight">Dream in high definition.</p>
          <p className="mt-4 text-muted-foreground max-w-md">Join thousands of artists and developers shipping with Luminal every day.</p>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="lg:hidden p-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-accent to-primary-muted flex items-center justify-center"><Sparkles className="size-4 text-white" /></div>
            <span className="font-bold tracking-tight">LUMINAL</span>
          </Link>
        </header>
        <div className="flex-1 flex items-center justify-center p-6"><div className="w-full max-w-md"><Outlet /></div></div>
      </div>
    </div>
  ),
});
