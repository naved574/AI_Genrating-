import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Wand2 } from "lucide-react";
import { mockImages } from "@/data/mock";
import { CTASection } from "./marketing";
import type { Tool } from "@/data/mock";

export function ToolLanding({ tool }: { tool: Tool }) {
  const samples = tool.samples.map((i) => mockImages[i % mockImages.length]);
  return (
    <>
      <section className="pt-20 pb-12 px-4 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-5">
              <Sparkles className="size-3" /> AI Tool
            </span>
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold tracking-tighter mb-4"
            >
              {tool.name}
            </motion.h1>
            <p className={`text-lg font-medium bg-gradient-to-r ${tool.accent} bg-clip-text text-transparent mb-3`}>
              {tool.tagline}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-7">{tool.description}</p>
            <div className="flex flex-wrap gap-3">
              <Link to="/dashboard/generate" className="bg-accent text-accent-foreground px-5 py-3 rounded-xl font-bold text-sm hover:opacity-90 inline-flex items-center gap-2">
                Try it now <ArrowRight className="size-4" />
              </Link>
              <Link to="/pricing" className="border border-border px-5 py-3 rounded-xl font-bold text-sm hover:bg-muted">
                See pricing
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {samples.map((s, i) => (
              <motion.img
                key={s.id + i}
                initial={{ opacity: 0, filter: "blur(20px)" }}
                animate={{ opacity: 1, filter: "blur(0)" }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                src={s.image}
                alt={s.title}
                className="aspect-square object-cover rounded-xl border border-border"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Try panel */}
      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="rounded-2xl border border-border bg-card p-5">
          <div className="flex items-center gap-2 mb-3">
            <Wand2 className="size-4 text-accent" />
            <p className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Sample prompts</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tool.prompts.map((p) => (
              <span key={p} className="px-3 py-1.5 rounded-lg bg-background border border-border text-xs text-muted-foreground">
                {p}
              </span>
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            <input
              defaultValue={tool.prompts[0]}
              className="flex-1 h-11 px-4 rounded-lg bg-background border border-border text-sm focus:outline-none focus:border-accent"
            />
            <Link to="/dashboard/generate" className="bg-accent text-accent-foreground px-5 h-11 rounded-lg font-bold text-xs uppercase tracking-wider inline-flex items-center">
              Generate
            </Link>
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="max-w-7xl mx-auto px-4 py-16 border-t border-border">
        <p className="text-xs uppercase tracking-widest text-accent mb-2 text-center">Use cases</p>
        <h2 className="text-3xl font-bold tracking-tight text-center mb-10">Built for</h2>
        <div className="grid md:grid-cols-3 gap-5">
          {tool.useCases.map((u, i) => (
            <div key={u} className="rounded-2xl border border-border bg-card p-6">
              <div className={`size-10 rounded-lg bg-gradient-to-br ${tool.accent} mb-4`} />
              <h3 className="font-bold mb-2">{u}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {["Ship work in hours not weeks.", "Stay consistent across every asset.", "Iterate until it's right, fast."][i % 3]}
              </p>
            </div>
          ))}
        </div>
      </section>

      <CTASection title={`Try ${tool.name} free`} description="100 credits on us — no card required." primary={{ to: "/register", label: "Get started" }} secondary={{ to: "/pricing", label: "Pricing" }} />
    </>
  );
}
