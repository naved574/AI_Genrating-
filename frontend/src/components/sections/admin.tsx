import type { ReactNode } from "react";
import { DashPageHeader, DashTable } from "./dashboard";

export function AdminPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
}) {
  return <DashPageHeader title={title} description={description} actions={actions} />;
}

export { DashTable as AdminTable };

export function AdminDetail({
  title,
  fields,
}: {
  title: string;
  fields: { label: string; value: ReactNode }[];
}) {
  return (
    <div className="px-6 md:px-8 py-6">
      <div className="rounded-2xl border border-border bg-card p-6">
        <h3 className="font-bold mb-5">{title}</h3>
        <dl className="grid sm:grid-cols-2 gap-4">
          {fields.map((f) => (
            <div key={f.label}>
              <dt className="text-[10px] uppercase tracking-widest text-muted-foreground mb-1">{f.label}</dt>
              <dd className="text-sm">{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
