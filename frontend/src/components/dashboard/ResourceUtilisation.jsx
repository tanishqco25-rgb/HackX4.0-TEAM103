import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function ResourceUtilisation({ data }) {
  return (
    <section className="rounded-md border border-slate-800 bg-[#111b24] p-4">
      <div className="flex items-center justify-between gap-3">
        <div><p className="text-[10px] font-bold tracking-[0.16em] text-slate-500">RESOURCE UTILISATION</p><h2 className="mt-1 text-sm font-semibold text-slate-100">Deployment capacity</h2></div>
        <div className="flex gap-3 text-[10px] text-slate-500"><span><i className="mr-1 inline-block h-2 w-2 bg-cyan-400" />Used</span><span><i className="mr-1 inline-block h-2 w-2 bg-slate-700" />Available</span></div>
      </div>
      <div className="mt-3 h-52 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 2, right: 8, left: 5, bottom: 2 }} barCategoryGap="28%">
            <CartesianGrid stroke="#24323d" horizontal={false} />
            <XAxis type="number" domain={[0, 100]} tick={{ fill: "#64748b", fontSize: 10 }} axisLine={false} tickLine={false} unit="%" />
            <YAxis type="category" dataKey="name" width={82} tick={{ fill: "#94a3b8", fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip cursor={{ fill: "#1e293b", opacity: 0.4 }} contentStyle={{ background: "#0d151c", border: "1px solid #334155", borderRadius: 4, fontSize: 11 }} formatter={(value) => [`${value}%`, ""]} />
            <Bar dataKey="used" stackId="capacity" fill="#22d3ee" radius={[2, 0, 0, 2]} />
            <Bar dataKey="available" stackId="capacity" fill="#334155" radius={[0, 2, 2, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}

export default ResourceUtilisation;