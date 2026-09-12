function SettingsSection({ id, eyebrow, title, description, children, icon: Icon }) {
  return <section id={id} className="scroll-mt-4 rounded-md border border-slate-800 bg-[#111b24] p-4"><div className="flex items-start gap-3 border-b border-slate-800/80 pb-4">{Icon && <span className="mt-0.5 text-cyan-300"><Icon size={17} /></span>}<div><p className="text-[10px] font-bold tracking-[0.16em] text-cyan-400">{eyebrow}</p><h2 className="mt-1 text-sm font-semibold text-slate-100">{title}</h2>{description && <p className="mt-1 text-xs text-slate-500">{description}</p>}</div></div><div className="pt-4">{children}</div></section>;
}

export default SettingsSection;