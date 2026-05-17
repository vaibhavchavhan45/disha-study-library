import { Menu } from "lucide-react";
import Avatar from "./Avatar";
import ProfileDropdown from "./ProfileDropdown";
import logo from "../../assets/logo2.webp";

export default function Topbar({
  admin,
  profileOpen,
  setProfileOpen,
  handleLogout,
  handleResetPassword,
  setDrawerOpen,
}) {
  return (
    <>
      {/* Desktop */}
      <div className="hidden md:block sticky top-0 z-30 px-4 pt-3 pb-1">
        <header
          className="
            flex items-center justify-between px-5 py-1.5
            rounded-full
            bg-white/5 backdrop-blur-3xl
            border border-white/20
            shadow-[0_8px_32px_rgba(0,0,0,0.15)]
            transition-all duration-300
          "
        >
          {/* Left */}
          <div className="flex items-center gap-2.5">
            <img
              src={logo}
              className="w-[45px] h-[45px] rounded-full object-cover"
              alt="Disha"
            />

            <div className="flex flex-col leading-tight">
              <span
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  fontWeight: 700,
                  fontSize: "1rem",
                  letterSpacing: "3px",
                  color: "#111827",
                }}
              >
                DISHA
              </span>

              <span className="text-gray-500 text-[0.6rem] tracking-[3px] uppercase">
                Study Center Arni
              </span>
            </div>
          </div>

          {/* Right */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen((p) => !p)}
              className="
                hover:bg-white/20
                backdrop-blur-md
                rounded-full p-1.5
                transition-all duration-200
              "
            >
              <Avatar adminId={admin?.id} size="topbar" />
            </button>

            {profileOpen && (
              <ProfileDropdown
                admin={admin}
                onResetPassword={handleResetPassword}
                onLogout={handleLogout}
                onClose={() => setProfileOpen(false)}
              />
            )}
          </div>
        </header>
      </div>

      {/* Mobile */}
      <div className="md:hidden sticky top-0 z-30 px-3 pt-2 pb-1">
        <header
          className="
            flex items-center justify-between px-4 py-1.5
            rounded-full relative
            bg-white/5 backdrop-blur-3xl
            border border-white/20
            shadow-[0_8px_32px_rgba(0,0,0,0.15)]
            transition-all duration-300
          "
        >
          {/* Left */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="text-gray-600 hover:text-gray-900 p-1"
          >
            <Menu size={20} />
          </button>

          {/* Center */}
          <div className="flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            <img
              src={logo}
              className="w-[35px] h-[35px] rounded-full object-cover"
              alt="Disha"
            />

            <span
              style={{
                fontFamily: "'Orbitron', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "2.5px",
                color: "#111827",
              }}
            >
              DISHA
            </span>
          </div>

          {/* Right */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen((p) => !p)}
              className="
                hover:bg-white/20
                backdrop-blur-md
                rounded-full p-1
                transition-all duration-200
              "
            >
              <Avatar adminId={admin?.id} size="sm" />
            </button>

            {profileOpen && (
              <ProfileDropdown
                admin={admin}
                onResetPassword={handleResetPassword}
                onLogout={handleLogout}
                onClose={() => setProfileOpen(false)}
              />
            )}
          </div>
        </header>
      </div>
    </>
  );
}