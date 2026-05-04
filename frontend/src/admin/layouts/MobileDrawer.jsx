import { X, LogOut } from "lucide-react";
import NavItem from "./NavItem";
import logo from "../../assets/logo2.webp";

export default function MobileDrawer({
  drawerOpen,
  setDrawerOpen,
  admin,
  handleLogout,
  NAV_ITEMS,
}) {
  return (
    <>
      {drawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setDrawerOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-60 bg-white z-50 shadow-xl flex flex-col transition-transform duration-300 md:hidden ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header — matches sidebar */}
        <div className="flex flex-col items-center justify-center px-3 py-4 border-b border-gray-100 shrink-0 relative">
          <button
            onClick={() => setDrawerOpen(false)}
            className="absolute right-2 top-2 text-gray-400 hover:text-gray-600 p-1.5 rounded-lg hover:bg-gray-100"
          >
            <X size={18} />
          </button>

          <img
            src={logo}
            alt="Disha"
            className="w-10 h-10 rounded-full object-cover mb-2"
          />
          <p className="text-sm font-semibold text-gray-800 text-center leading-tight">
            Disha Library Admin
          </p>
          <p className="text-xs text-gray-400 text-center mt-1 truncate w-full">
            {admin?.name || admin?.email || "Admin"}
          </p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map((item) => (
            <NavItem
              key={item.path}
              item={item}
              collapsed={false}
              onClick={() => setDrawerOpen(false)}
            />
          ))}
        </nav>

        {/* Logout */}
        <div className="p-2 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm text-gray-600 hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      </div>
    </>
  );
}