import { Activity, Clock3, Radio, ShieldCheck } from "lucide-react";

const icons = [Activity, ShieldCheck, Radio, Clock3];

function OperationalStatus({ items }) {
  return (
    <section className="grid grid-cols-2 divide-x divide-slate-800/80 rounded-md border border-slate-800 bg-[#111b24] sm:grid-cols-4">
      {items.map((item, index) => {
        const Icon = icons[index];
        return (
          <div key={item.label} className="flex items-center gap-3 px-4 py-3">
            <Icon size={16} className="shrink-0 text-slate-500" />
            <div className="min-w-0">
              <p className="truncate text-[9px] font-bold tracking-[0.15em] text-slate-500">{item.label}</p>
              <p className={`mt-1 truncate text-xs font-medium ${item.tone}`}>
                {item.dot && <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-current align-middle" />}
                {item.value}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default OperationalStatus;