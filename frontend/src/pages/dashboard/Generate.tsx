import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  Plus, Sparkles, MoreHorizontal, Download, Info, Trash2, Search, Camera, ChevronDown,
} from "lucide-react";
import { useGeneration, type AspectRatio } from "@/store/generation";
import { mockModels, aspectRatios } from "@/data/mock";

export function Generate() {
  const s = useGeneration();
  const [modelPickerOpen, setModelPickerOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div className="relative h-[calc(100vh-3.5rem)] flex overflow-hidden">
      <aside className="hidden md:flex w-64 shrink-0 border-r border-border bg-card flex-col overflow-y-auto">
        <div className="p-5 space-y-7">
          <div className="space-y-3">
            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Active model</label>
            <button onClick={() => setModelPickerOpen(true)} className="w-full flex items-center gap-3 p-3 rounded-xl bg-background border border-border hover:border-accent/40 transition-colors">
              <div className="size-12 rounded-lg bg-gradient-to-br from-accent to-primary-muted relative">
                <Camera className="absolute top-1 right-1 size-3 text-white/70" />
              </div>
              <div className="text-left flex-1 min-w-0">
                <p className="text-xs font-bold truncate">{s.model}</p>
                <p className="text-[10px] text-muted-foreground">Switch model</p>
              </div>
              <ChevronDown className="size-3.5 text-muted-foreground" />
            </button>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Additional</label>
            <button className="w-full px-3 py-2 rounded-lg border border-dashed border-border text-xs text-muted-foreground hover:border-accent hover:text-accent transition-colors flex items-center justify-center gap-1.5">
              <Plus className="size-3.5" /> Add more
            </button>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Image setting</label>
            <div className="flex flex-wrap gap-1.5">
              {aspectRatios.map((a) => (
                <button key={a} onClick={() => s.setAspect(a as AspectRatio)}
                  className={`px-2.5 py-1.5 rounded-md text-[10px] font-medium border transition-colors ${
                    s.aspectRatio === a ? "bg-accent text-accent-foreground border-accent" : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}>{a}</button>
              ))}
              <button className="px-2.5 py-1.5 rounded-md text-[10px] font-medium border border-border text-muted-foreground hover:text-foreground">more</button>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Image quantity</label>
              <span className="text-xs font-mono">{s.quantity}</span>
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {[1, 2, 3, 4, 5].map((n) => (
                <button key={n} onClick={() => s.setQuantity(n)}
                  className={`h-8 rounded-md text-xs font-medium border transition-colors ${
                    s.quantity === n ? "bg-accent text-accent-foreground border-accent" : "border-border text-muted-foreground hover:text-foreground"
                  }`}>{n}</button>
              ))}
            </div>
          </div>

          <div className="space-y-4 pt-2 border-t border-border">
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">Set speed</label>
              <div className="p-1 bg-background rounded-lg flex gap-1 border border-border">
                {(["steady", "turbo"] as const).map((sp) => (
                  <button key={sp} onClick={() => s.setSpeed(sp)} className={`flex-1 py-1.5 text-[10px] font-medium rounded capitalize ${s.speed === sp ? "bg-muted text-foreground" : "text-muted-foreground"}`}>{sp}</button>
                ))}
              </div>
            </div>
            <button onClick={s.toggleNegative} className="w-full flex items-center justify-between">
              <span className="text-xs font-medium">Negative prompt</span>
              <span className={`relative w-8 h-4 rounded-full transition-colors ${s.negativeEnabled ? "bg-accent" : "bg-muted"}`}>
                <span className={`absolute top-0.5 size-3 bg-white rounded-full transition-transform ${s.negativeEnabled ? "translate-x-4" : "translate-x-0.5"}`} />
              </span>
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 relative flex flex-col overflow-hidden">
        <AnimatePresence>
          {modelPickerOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              className="absolute top-6 left-1/2 -translate-x-1/2 z-30 w-[92%] max-w-md bg-card/95 border border-border backdrop-blur-xl rounded-2xl shadow-2xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Search className="size-4 text-muted-foreground" />
                <input autoFocus placeholder="Search models…" className="flex-1 bg-transparent text-xs focus:outline-none" />
                <button onClick={() => setModelPickerOpen(false)} className="text-xs text-muted-foreground hover:text-foreground">Esc</button>
              </div>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground mb-2">Recommended models</p>
              <div className="grid grid-cols-2 gap-2">
                {mockModels.slice(0, 4).map((m) => (
                  <button key={m.id} onClick={() => { s.setModel(m.name); setModelPickerOpen(false); }}
                    className={`flex items-center gap-2.5 p-2 rounded-lg border transition-colors text-left ${s.model === m.name ? "bg-accent/15 border-accent/40" : "border-border hover:border-accent/40"}`}>
                    <div className={`size-8 rounded-md bg-gradient-to-br ${m.gradient} shrink-0`} />
                    <div className="min-w-0 flex-1">
                      <p className="text-[11px] font-bold truncate">{m.name}</p>
                      <p className="text-[9px] text-muted-foreground truncate">{m.tagline}</p>
                    </div>
                    <Plus className="size-3.5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex-1 overflow-y-auto px-6 py-8 pb-56 space-y-10">
          <AnimatePresence initial={false}>
            {s.results.map((r) => (
              <motion.div key={r.id}
                layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
                className="flex flex-col md:flex-row gap-5 group"
              >
                <div className="w-full md:w-48 shrink-0">
                  <div className="w-full aspect-square bg-muted rounded-xl border border-border overflow-hidden relative">
                    {r.loading ? (
                      <div className="absolute inset-0 shimmer flex items-center justify-center"><Sparkles className="size-5 text-muted-foreground animate-pulse" /></div>
                    ) : (
                      <motion.img initial={{ filter: "blur(20px)", opacity: 0 }} animate={{ filter: "blur(0)", opacity: 1 }} transition={{ duration: 0.6 }}
                        src={r.cover} alt={r.prompt} className="w-full h-full object-cover" />
                    )}
                  </div>
                </div>
                <div className="flex-1 py-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm leading-relaxed text-foreground/90 line-clamp-3">{r.prompt}</p>
                    <div className="relative">
                      <button onClick={() => setOpenMenu(openMenu === r.id ? null : r.id)} className="p-1.5 hover:bg-muted rounded-md text-muted-foreground"><MoreHorizontal className="size-4" /></button>
                      <AnimatePresence>
                        {openMenu === r.id && (
                          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                            className="absolute right-0 top-9 z-20 w-48 bg-popover border border-border rounded-lg shadow-xl py-1">
                            <button className="w-full px-3 py-2 text-left text-xs hover:bg-muted flex items-center gap-2"><Download className="size-3.5" /> Download image</button>
                            <button className="w-full px-3 py-2 text-left text-xs hover:bg-muted flex items-center gap-2"><Info className="size-3.5" /> Take info</button>
                            <button onClick={() => { s.remove(r.id); setOpenMenu(null); }} className="w-full px-3 py-2 text-left text-xs hover:bg-destructive/10 hover:text-destructive flex items-center gap-2"><Trash2 className="size-3.5" /> Delete image</button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <div className="flex gap-4 text-[10px] text-muted-foreground uppercase tracking-wider mt-3">
                    <span>{r.model}</span><span>Step: {r.step}</span><span>Seed: {r.seed}</span><span>{r.aspectRatio}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-3xl z-20">
          <div className="bg-card/95 border border-border backdrop-blur-xl rounded-2xl p-3 shadow-2xl">
            <div className="flex gap-2 items-start">
              <button title="Upload image" className="size-10 rounded-lg border border-border flex items-center justify-center hover:bg-muted text-muted-foreground shrink-0 mt-0.5"><Plus className="size-4" /></button>
              <textarea
                value={s.prompt} onChange={(e) => s.setPrompt(e.target.value)}
                placeholder="Describe what you want to see…"
                rows={2}
                className="flex-1 bg-transparent text-sm focus:outline-none resize-none py-1.5"
              />
              <button onClick={() => s.generate()} className="bg-accent text-accent-foreground px-4 h-10 rounded-lg font-bold text-xs uppercase tracking-wider shrink-0 mt-0.5 hover:opacity-90 animate-pulse-glow flex items-center gap-1.5">
                <Sparkles className="size-3.5" /> Gen img
              </button>
            </div>
            {s.negativeEnabled && (
              <div className="border-t border-border mt-2 pt-2 flex items-center gap-2 px-1">
                <span className="text-[10px] font-mono uppercase text-muted-foreground shrink-0">Negative:</span>
                <input value={s.negativePrompt} onChange={(e) => s.setNegativePrompt(e.target.value)}
                  placeholder="Avoid… (blurry, low quality, distorted)"
                  className="flex-1 bg-transparent text-[11px] text-muted-foreground focus:outline-none" />
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
