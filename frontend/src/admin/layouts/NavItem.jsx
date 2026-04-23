import { NavLink } from "react-router-dom";

export default function NavItem({ item, collapsed, onClick }) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.path}
      onClick={onClick}
      title={collapsed ? item.name : undefined}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
          collapsed ? "justify-center" : ""
        } ${
          isActive
            ? "bg-gray-900 text-white"
            : "text-gray-600 hover:bg-gray-100"
        }`
      }
    >
      <Icon size={17} className="shrink-0" />
      {!collapsed && <span>{item.name}</span>}
    </NavLink>
  );
}