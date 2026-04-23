import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Armchair,
  Clock3,
  MessageSquareMore,
  Users,
} from "lucide-react";

import Sidebar from "./Sidebar";
import MobileDrawer from "./MobileDrawer";
import Topbar from "./Topbar";

import { clearAdminAuth, getAdminUser } from "../utils/adminStorage";
import ResetPasswordModal from "../components/profile/ResetPasswordModal";

const NAV_ITEMS = [
  { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Seats", path: "/admin/seats", icon: Armchair },
  { name: "Waiting", path: "/admin/waiting", icon: Clock3 },
  { name: "Inquiries", path: "/admin/inquiries", icon: MessageSquareMore },
  { name: "Ex Students", path: "/admin/ex-students", icon: Users },
];

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  const navigate = useNavigate();
  const admin = getAdminUser();

  const handleLogout = () => {
    clearAdminAuth();
    navigate("/admin");
  };

  const handleResetPassword = () => {
    setProfileOpen(false);
    setShowResetPassword(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        admin={admin}
        handleLogout={handleLogout}
        NAV_ITEMS={NAV_ITEMS}
      />

      <MobileDrawer
        drawerOpen={drawerOpen}
        setDrawerOpen={setDrawerOpen}
        admin={admin}
        handleLogout={handleLogout}
        NAV_ITEMS={NAV_ITEMS}
      />

      <div className="flex-1 flex flex-col">
        <Topbar
          admin={admin}
          profileOpen={profileOpen}
          setProfileOpen={setProfileOpen}
          handleLogout={handleLogout}
          handleResetPassword={handleResetPassword}
          setDrawerOpen={setDrawerOpen}
        />

        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>

      {showResetPassword && (
        <ResetPasswordModal onClose={() => setShowResetPassword(false)} />
      )}
    </div>
  );
}