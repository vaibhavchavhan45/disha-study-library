import { User, KeyRound, LogOut } from "lucide-react";
import { getAdminPhoto } from "../utils/adminAssets";
import { createPortal } from "react-dom";

export default function ProfileDropdown({
  admin,
  onResetPassword,
  onLogout,
  onClose,
}) {
  const photo = getAdminPhoto(admin?.id);

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[999]"
        onClick={onClose}
      />

      {/* Dropdown */}
      <div
        className="fixed top-[72px] right-4 md:right-6 z-[1000] w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gray-900 px-5 py-5 flex flex-col items-center gap-3">
          <div className="w-16 h-16 rounded-full bg-gray-700 border-2 border-gray-600 overflow-hidden flex items-center justify-center">
            {photo ? (
              <img
                src={photo}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <User size={28} className="text-gray-300" />
            )}
          </div>

          <div className="text-center">
            <p className="text-white font-semibold text-base leading-tight">
              {admin?.name || "Admin"}
            </p>
            <p className="text-gray-400 text-xs mt-0.5">
              {admin?.email || "—"}
            </p>
            <span className="inline-block mt-2 text-[10px] font-semibold px-2.5 py-0.5 rounded-full bg-gray-700 text-gray-300 uppercase tracking-widest">
              Administrator
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="p-2">
          <button
            onClick={onResetPassword}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <KeyRound size={15} className="text-blue-500" />
            </div>
            <div className="text-left">
              <p className="font-medium text-gray-800 leading-tight">
                Reset Password
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                Change your admin password
              </p>
            </div>
          </button>

          <div className="border-t border-gray-100 my-1" />

          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center shrink-0">
              <LogOut size={15} className="text-red-500" />
            </div>
            <div className="text-left">
              <p className="font-medium leading-tight">Logout</p>
              <p className="text-xs text-red-400 mt-0.5">
                Sign out of admin panel
              </p>
            </div>
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}