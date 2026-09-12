import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function Layout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen min-h-screen w-full overflow-hidden bg-[#0b1218] text-slate-200">
      <Sidebar isOpen={isSidebarOpen} onNavigate={() => setIsSidebarOpen(false)} />
      {isSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-slate-950/70 lg:hidden"
        />
      )}
      <main className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <div className="min-h-0 flex-1 overflow-auto p-5 sm:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;