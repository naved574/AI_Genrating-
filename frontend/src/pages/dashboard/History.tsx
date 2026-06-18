import { useEffect } from "react";

import { DashPageHeader, DashTable } from "@/components/sections";
import { useGeneration } from "@/store/generation";

export function History() {
  const { results, loadHistory } = useGeneration();

  useEffect(() => {
    void loadHistory();
  }, [loadHistory]);

  return (
    <>
      <DashPageHeader
        title="History"
        description="Every generation, in order."
        breadcrumbs={[{ to: "/dashboard", label: "Dashboard" }, { label: "History" }]}
      />
      <DashTable
        columns={[
          { key: "prompt", label: "Prompt" },
          { key: "model", label: "Model" },
          { key: "aspectRatio", label: "Aspect" },
          { key: "status", label: "Status" },
        ]}
        rows={results.map((item) => ({
          prompt: item.prompt,
          model: item.model,
          aspectRatio: item.aspectRatio,
          status: item.status ?? "succeeded",
        }))}
        emptyLabel="No generations yet"
      />
    </>
  );
}
