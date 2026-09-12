import { Bell, Menu, Search, UserCircle, Wifi } from "lucide-react";
import { useLocation } from "react-router-dom";

const pageTitles = {
  "/": "Emergency Command Center",
  "/incidents": "Incident Operations",
  "/resources": "Emergency Resources",
  "/allocation": "AI Resource Allocation",
  "/map": "Disaster Response Map",
  "/simulation": "What-If Simulation",
  "/analytics": "Response Analytics",
  "/settings": "System Settings",
};

function Header({ onMenuClick }) {
  const { pathname } = useLocation();
  const pageTitle = pageTitles[pathname] || "Disaster Command Center";

  return (
    <header className="flex min-h-20 flex-wrap items-center gap-4 border-b border-slate-800/90 bg-[#111b24] px-5 py-4 sm:px-8">
      <button
        type="button"
        onClick={onMenuClick}
        className="rounded-md border border-slate-700 p-2 text-slate-300 hover:bg-slate-800 lg:hidden"
        aria-label="Open navigation"
      >
        <Menu size={19} />
      </button>

      <div className="min-w-0 flex-1">
        <p className="truncate text-lg font-semibold text-slate-100">{pageTitle}</p>
        <div className="mt-1 flex items-center gap-2 text-[10px] font-bold tracking-[0.18em] text-orange-300">
          <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
          EARTHQUAKE RESPONSE
        </div>
      </div>

      <div className="flex w-full items-center gap-2 sm:w-auto">
        <label className="relative min-w-0 flex-1 sm:w-48">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
          <input
            type="search"
            placeholder="Search operations"
            aria-label="Search operations"
            className="h-9 w-full rounded-md border border-slate-700 bg-[#0d151c] pl-9 pr-3 text-xs text-slate-200 outline-none placeholder:text-slate-600 focus:border-cyan-400/60"
          />
        </label>
        <button type="button" aria-label="Notifications" className="relative rounded-md border border-slate-700 p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-100">
          <Bell size={17} />
          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-red-400" />
        </button>
        <div className="hidden items-center gap-2 border-l border-slate-800 pl-3 text-[10px] font-bold tracking-[0.16em] text-emerald-400 md:flex">
          <Wifi size={15} />
          LIVE
        </div>
        <button type="button" aria-label="Open profile" className="rounded-md border border-slate-700 p-1.5 text-slate-400 hover:bg-slate-800 hover:text-slate-100">
          <UserCircle size={21} />
        </button>
      </div>
    </header>
  );
}

export default Header;