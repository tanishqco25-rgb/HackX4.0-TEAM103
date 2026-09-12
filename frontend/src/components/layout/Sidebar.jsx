import { NavLink } from "react-router-dom";
import {
  BarChart3,
  BrainCircuit,
  FlaskConical,
  LayoutDashboard,
  Map,
  PackageOpen,
  Settings,
  Siren,
} from "lucide-react";

const navigation = [
  {
    label: "OPERATIONS",
    items: [
      { label: "Dashboard", to: "/", icon: LayoutDashboard },
      { label: "Incidents", to: "/incidents", icon: Siren },
      { label: "Resources", to: "/resources", icon: PackageOpen },
      { label: "AI Allocation", to: "/allocation", icon: BrainCircuit },
      { label: "Disaster Map", to: "/map", icon: Map },
    ],
  },
  {
    label: "ANALYSIS",
    items: [
      { label: "Simulation", to: "/simulation", icon: FlaskConical },
      { label: "Analytics", to: "/analytics", icon: BarChart3 },
    ],
  },
  {
    label: "SYSTEM",
    items: [{ label: "Settings", to: "/settings", icon: Settings }],
  },
];

function Sidebar({ isOpen, onNavigate }) {
  return (
    <aside
      className={`fixed inset-y-0 left-0 z-40 flex w-72 shrink-0 flex-col border-r border-slate-800/90 bg-[#101820] transition-transform duration-200 lg:static lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="border-b border-slate-800/90 px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-md border border-cyan-400/40 bg-cyan-400/10 text-sm font-bold text-cyan-300">
            RQ
          </div>
          <div>
            <p className="text-sm font-bold tracking-[0.18em] text-slate-100">
              RESQGRID AI
            </p>
            <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.16em] text-slate-500">
              Emergency Intelligence
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-7 overflow-y-auto px-4 py-7" aria-label="Primary navigation">
        {navigation.map((section) => (
          <div key={section.label}>
            <p className="mb-3 px-3 text-[10px] font-bold tracking-[0.2em] text-slate-500">
              {section.label}
            </p>
            <div className="space-y-1">
              {section.items.map(({ label, to, icon: Icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={to === "/"}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    `group flex items-center gap-3 rounded-md border px-3 py-2.5 text-sm transition-colors ${
                      isActive
                        ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-200"
                        : "border-transparent text-slate-400 hover:border-slate-700 hover:bg-slate-800/60 hover:text-slate-100"
                    }`
                  }
                >
                  <Icon size={17} strokeWidth={1.8} />
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="border-t border-slate-800/90 px-6 py-5">
        <p className="text-[10px] font-bold tracking-[0.2em] text-slate-500">SYSTEM STATUS</p>
        <div className="mt-3 flex items-center gap-2 text-sm text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
          Operational
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;