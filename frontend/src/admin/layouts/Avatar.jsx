import { User } from "lucide-react";
import { getAdminPhoto } from "../utils/adminAssets";


export default function Avatar({ adminId, size = "md" }) {
  const dim =
    size === "sm" ? "w-7 h-7" : size === "lg" ? "w-16 h-16" : size === "topbar" ? "w-11 h-11" : "w-9 h-9";

  const iconSize =
    size === "sm" ? 13 : size === "lg" ? 28 : size === "topbar" ? 20 : 18;

  const photo = getAdminPhoto(adminId);

  return (
    <div
      className={`${dim} rounded-full bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center shrink-0`}
    >
      {photo ? (
        <img
          src={photo}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      ) : (
        <User size={iconSize} className="text-gray-500" />
      )}
    </div>
  );
}