// Migrate Home page content from src/routes/_site.index.tsx
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Star, Zap, Layers, Wand2, Check } from "lucide-react";
import { mockImages, mockModels } from "@/data/mock";

export function Home() {
  return (
    <>
      <section className="pt-10 pb-12 px-4 text-center max-w-4xl mx-auto">
        <Link to="/changelog" className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-semibold mb-6">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          Spectral v4.2 is now live
        </Link>
        <motion.h1
          initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 text-grad"
        >
          Dream in high definition.
        </motion.h1>
        <p className="text-muted-foreground text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
          The next generation of creative AI. Generate stunning, studio-grade visuals from simple text prompts in seconds.
        </p>

        <div className="flex flex-wrap gap-3 justify-center mb-12">
          <Link 
          to="/dashboard/generate" 
          className="bg-accent text-accent-foreground px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-opacity animate-pulse-glow inline-flex items-center gap-2">
            Start Generating <ArrowRight className="size-4" />
          </Link>

          <Link 
          to="/explore" 
          className="border border-border px-6 py-3 rounded-xl font-bold text-sm hover:bg-muted transition-colors">
            View showcase
          </Link>
        </div>

        {/* Generating Part */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-accent to-primary-muted rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-1000" />
          <div className="relative bg-card border border-border rounded-xl p-3 md:p-4 shadow-2xl text-left">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-3">
                <div className="flex-1 relative">
                  <input 
                  defaultValue="A cinematic cyberpunk city shrouded in neon fog, 8k, highly detailed..." 
                  readOnly 
                  className="w-full bg-background border border-border rounded-lg py-4 pl-5 pr-32 text-sm" />
                  <button className="absolute right-2 top-2 bottom-2 px-6 bg-accent hover:opacity-90 text-accent-foreground text-xs font-bold rounded-md uppercase tracking-wider">Generate</button>
                </div>
                <div className="flex gap-2">
                  <div className="px-4 py-4 bg-background border border-border rounded-lg text-xs text-muted-foreground">16:9</div>
                  <div className="px-4 py-4 bg-background border border-border rounded-lg text-xs text-muted-foreground">Vivid</div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {mockImages.slice(0, 4).map((img, i) => (
                  <motion.img
                    key={img.id}
                    initial={{ opacity: 0, filter: "blur(20px)" }} animate={{ opacity: 1, filter: "blur(0)" }}
                    transition={{ duration: 0.6, delay: 0.15 * i }}
                    src={img.image} alt={img.title}
                    className="aspect-square object-cover rounded-lg border border-border bg-muted"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16">
          <p className="text-xs uppercase tracking-widest text-muted-foreground mb-5">Trusted by teams shipping every day</p>
          <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-3 opacity-60 text-sm font-bold tracking-wider">
            <span>NORTHLIGHT</span><span>VANTA</span><span>HELIX</span><span>OBSIDIAN</span><span>POLARIS</span><span>STRATA</span>
          </div>
        </div>
      </section>

      {/* Trending creations and models part */}
      <section className="max-w-7xl mx-auto px-4 py-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent mb-2">Showcase</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Trending creations</h2>
          </div>
          <Link to="/explore" className="text-sm text-accent hover:opacity-80">View all →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {mockImages.slice(0, 8).map((img, i) => (
            <motion.div key={img.id}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.03 * i }}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden border border-border bg-card"
            >
              <img src={img.image} alt={img.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-xs text-white/90 truncate">{img.prompt}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      

      {/* Famous models part */}
      <section className="max-w-7xl mx-auto px-4 py-24 border-t border-border">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-widest text-accent mb-2">Models</p>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">A model for every aesthetic</h2>
          </div>
          <Link to="/models" className="text-sm text-accent">All models →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockModels.map((m) => (
            <div key={m.id} className="rounded-2xl border border-border bg-card p-5 hover:border-accent/40 transition-colors">
              <div className={`size-12 rounded-xl bg-gradient-to-br ${m.gradient} mb-4`} />
              <div className="flex items-center justify-between">
                <h3 className="font-bold">{m.name}</h3>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{m.category}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{m.tagline}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Cards  */}
      <section className="max-w-7xl mx-auto px-4 py-24 border-t border-border">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-accent mb-2">Why Luminal</p>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Built for serious creative work</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Star, t: "Neural precision", d: "Proprietary models tuned for architectural accuracy and complex human anatomy that rivals professional photography." },
            { icon: Zap, t: "Instant workflow", d: "Under 4 seconds per batch. Built for teams who need to iterate at the speed of thought." },
            { icon: Layers, t: "Multi-modal control", d: "Mix images, sketches, and text to guide your creation with granular control over every single pixel." },
            { icon: Wand2, t: "Prompt enhancer", d: "Stop fighting models. The enhancer turns rough intent into structured, model-ready prompts." },
            { icon: Sparkles, t: "Style libraries", d: "Hundreds of curated styles, plus your own fine-tunes. Apply with one click." },
            { icon: Check, t: "Commercial-safe", d: "Every output ships with a clear, commercial-grade license. No surprises." },
          ].map((f, i) => (
            <motion.div key={f.t}
              initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.04 * i }}
              className="rounded-2xl border border-border bg-card p-6 hover:border-accent/40 transition-colors"
            >
              <div className="size-10 rounded-lg bg-muted border border-border flex items-center justify-center text-accent mb-4"><f.icon className="size-5" /></div>
              <h3 className="text-lg font-bold mb-2">{f.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.d}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      <section className="max-w-7xl mx-auto px-4 py-24 border-t border-border">
        <div className="rounded-3xl border border-border bg-card p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-primary-muted/15" />
          <div className="relative max-w-xl">
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">Ready when you are.</h3>
            <p className="text-muted-foreground">Start free with 100 credits. No card required.</p>
          </div>
          <div className="relative flex gap-3 shrink-0">
            <Link to="/register" className="bg-accent text-accent-foreground px-5 py-3 rounded-xl font-bold text-sm hover:opacity-90 inline-flex items-center gap-2">Create account <ArrowRight className="size-4" /></Link>
            <Link to="/pricing" className="border border-border px-5 py-3 rounded-xl font-bold text-sm hover:bg-muted">See pricing</Link>
          </div>
        </div>
      </section>
    </>
  );
}
