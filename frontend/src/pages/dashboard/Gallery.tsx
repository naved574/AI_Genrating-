import { useEffect } from "react";

import { DashPageHeader } from "@/components/sections";
import { useGeneration } from "@/store/generation";

export function Gallery() {
  const { results, loadHistory } = useGeneration();

  useEffect(() => {
    void loadHistory();
  }, [loadHistory]);

  return (
    <>
      <DashPageHeader
        title="My Gallery"
        description="Saved images from your generation history."
        breadcrumbs={[{ to: "/dashboard", label: "Dashboard" }, { label: "My Gallery" }]}
      />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 px-6 md:px-8 py-6">
        {results
          .filter((item) => item.cover)
          .map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border border-border bg-card overflow-hidden"
            >
              <img
                src={item.cover}
                alt={item.prompt}
                className="aspect-square w-full object-cover"
              />
              <div className="p-3">
                <p className="text-xs line-clamp-2">{item.prompt}</p>
                <p className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">
                  {item.model} � {item.aspectRatio}
                </p>
              </div>
            </article>
          ))}
        {results.filter((item) => item.cover).length === 0 && (
          <p className="text-sm text-muted-foreground">
            No generated images yet. Create your first one in Generate.
          </p>
        )}
      </div>
    </>
  );
}
