import { Clock } from "lucide-react";

export default function BlockedScreen({ type, timeLeft }) {
  const isLockout = type === "locked";

  return (
    <div className="text-center">
      <Clock size={30} className="mx-auto text-red-400" />

      <p className="font-semibold mt-2">
        {isLockout ? "Account Locked" : "Cooldown Active"}
      </p>

      <p className="text-sm text-gray-500 mt-1">
        {isLockout
          ? "Too many attempts"
          : "Password recently changed"}
      </p>

      <p className="mt-3 font-bold text-red-500">{timeLeft}</p>
    </div>
  );
}