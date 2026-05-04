import { LogOut, PanelLeftClose, PanelLeftOpen } from "lucide-react";
import NavItem from "./NavItem";
import logo from "../../assets/logo2.webp";

export default function Sidebar({
  collapsed,
  setCollapsed,
  admin,
  handleLogout,
  NAV_ITEMS,
}) {
  return (
    <aside
      className={`hidden md:flex flex-col bg-white border-r border-gray-200 shrink-0 h-screen sticky top-0 transition-all duration-300 ${
        collapsed ? "w-16" : "w-56"
      }`}
    >
      {/* Header */}
      <div className="relative flex flex-col items-center justify-center px-3 py-4 border-b border-gray-100 shrink-0 overflow-hidden min-h-[72px]">

        {/* Toggle button */}
        <button
          onClick={() => setCollapsed((p) => !p)}
          className={`absolute top-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg p-1.5 transition-all duration-300 ${
            collapsed ? "left-1/2 -translate-x-1/2" : "right-2"
          }`}
        >
          {collapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>

        {/* Always in DOM — fades in/out smoothly */}
        <div
          className={`flex flex-col items-center transition-all duration-300 mt-1 ${
            collapsed ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <img
            src={logo}
            alt="Disha"
            className="w-10 h-10 rounded-full object-cover mb-2"
          />
          <p className="text-sm font-semibold text-gray-800 text-center leading-tight whitespace-nowrap">
            Disha Library Admin
          </p>
          <p className="text-xs text-gray-400 text-center mt-1 whitespace-nowrap">
            {admin?.name || admin?.email || "Admin"}
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto overflow-x-hidden">
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.path} item={item} collapsed={collapsed} />
        ))}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-gray-100 shrink-0">
        <button
          onClick={handleLogout}
          className={`w-full flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-600 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-colors ${
            collapsed ? "justify-center" : ""
          }`}
        >
          <LogOut size={15} className="shrink-0" />
          <span
            className={`transition-all duration-300 whitespace-nowrap overflow-hidden ${
              collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
            }`}
          >
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}