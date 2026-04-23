import { Phone, Mail, CalendarDays, User, Armchair, Trash2, Eye, Pencil, MoreHorizontal, AlertTriangle } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const getDaysLeft = (expiry_date) => {
  if (!expiry_date) return null;
  return Math.ceil((new Date(expiry_date) - new Date()) / (1000 * 60 * 60 * 24));
};

const fmt = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const ActionMenu = ({ student, onView, onEdit, onAssign, onDelete }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const action = (fn) => { setOpen(false); fn(student); };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-center w-8 h-8 rounded-lg border border-gray-200 hover:border-gray-400 hover:bg-gray-50 transition-colors"
      >
        <MoreHorizontal size={15} />
      </button>

      {open && (
        <div className="absolute right-0 bottom-10 z-50 bg-white border border-gray-200 rounded-xl shadow-lg w-44 py-1 overflow-hidden">
          <button onClick={() => action(onView)}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Eye size={14} className="text-blue-500" /> View Detail
          </button>
          <button onClick={() => action(onEdit)}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Pencil size={14} className="text-gray-500" /> Edit Detail
          </button>
          <button onClick={() => action(onAssign)}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Armchair size={14} className="text-green-600" /> Assign Seat
          </button>
          <div className="border-t border-gray-100 my-1" />
          <button onClick={() => action(onDelete)}
            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

const WaitingCards = ({ list, onView, onEdit, onAssign, onDelete, currentPage, itemsPerPage }) => {
  return (
    <div className="sm:hidden space-y-3 p-3">
      {list.map((s, i) => {
        const rowNumber = (currentPage - 1) * itemsPerPage + i + 1;
        const daysLeft = getDaysLeft(s.expiry_date);
        const isExpired = daysLeft !== null && daysLeft <= 0;
        const isWarning = daysLeft !== null && daysLeft > 0 && daysLeft <= 7;

        return (
          <div key={s.id} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            {/* Top */}
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 overflow-hidden shrink-0">
                  {s.photo_url ? (
                    <img src={s.photo_url} alt={s.name} className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "block"; }} />
                  ) : null}
                  <User size={18} style={{ display: s.photo_url ? "none" : "block" }} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{s.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Student #{rowNumber}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${s.gender === "GIRLS" ? "bg-pink-50 text-pink-600" : "bg-blue-50 text-blue-600"}`}>
                  {s.gender}
                </span>
                <ActionMenu student={s} onView={onView} onEdit={onEdit} onAssign={onAssign} onDelete={onDelete} />
              </div>
            </div>

            {/* Info */}
            <div className="mt-4 space-y-2">
              {s.phone && <div className="flex items-center gap-2 text-xs text-gray-600"><Phone size={13} />{s.phone}</div>}
              {s.email && <div className="flex items-center gap-2 text-xs text-gray-600"><Mail size={13} />{s.email}</div>}
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <CalendarDays size={13} />
                Expires: {fmt(s.expiry_date)}
                {isExpired && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-red-100 text-red-600">
                    <AlertTriangle size={9} /> Expired
                  </span>
                )}
                {isWarning && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                    <AlertTriangle size={9} /> {daysLeft}d left
                  </span>
                )}
              </div>
            </div>

            {/* Fee badge */}
            <div className="mt-3">
              <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${
                s.fee_status === "PAID" ? "bg-green-50 text-green-600"
                : s.fee_status === "PENDING" ? "bg-yellow-50 text-yellow-600"
                : "bg-red-50 text-red-600"}`}>
                {s.fee_status || "UNPAID"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WaitingCards;