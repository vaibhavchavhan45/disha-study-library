import { useState, useRef, useEffect } from "react";
import { Eye, SquarePen, UserCheck, Trash2, MoreHorizontal, AlertTriangle, User } from "lucide-react";

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
        <div className="absolute right-0 top-9 z-50 bg-white border border-gray-200 rounded-xl shadow-lg w-44 py-1 overflow-hidden">
          <button onClick={() => action(onView)} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <Eye size={14} className="text-blue-500" /> View Detail
          </button>
          <button onClick={() => action(onEdit)} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <SquarePen size={14} className="text-gray-500" /> Edit Detail
          </button>
          <button onClick={() => action(onAssign)} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
            <UserCheck size={14} className="text-green-600" /> Assign Seat
          </button>
          <div className="border-t border-gray-100 my-1" />
          <button onClick={() => action(onDelete)} className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-500 hover:bg-red-50 transition-colors">
            <Trash2 size={14} /> Delete
          </button>
        </div>
      )}
    </div>
  );
};

const IconActions = ({ student, onView, onEdit, onAssign, onDelete }) => (
  <div className="flex items-center gap-1.5">
    <button onClick={() => onView(student)} title="View Detail"
      className="w-8 h-8 flex items-center justify-center rounded-lg border border-blue-100 bg-blue-50 hover:bg-blue-100 transition-colors">
      <Eye size={15} className="text-blue-500" />
    </button>
    <button onClick={() => onEdit(student)} title="Edit Detail"
      className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
      <SquarePen size={15} className="text-gray-500" />
    </button>
    <button onClick={() => onAssign(student)} title="Assign Seat"
      className="w-8 h-8 flex items-center justify-center rounded-lg border border-green-100 bg-green-50 hover:bg-green-100 transition-colors">
      <UserCheck size={15} className="text-green-600" />
    </button>
    <button onClick={() => onDelete(student)} title="Delete"
      className="w-8 h-8 flex items-center justify-center rounded-lg border border-red-100 bg-red-50 hover:bg-red-100 transition-colors">
      <Trash2 size={15} className="text-red-500" />
    </button>
  </div>
);

const WaitingTable = ({ list, onView, onEdit, onAssign, onDelete, currentPage, itemsPerPage }) => {
  return (
    <div className="hidden sm:block overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-100/80 text-xs text-gray-500 uppercase tracking-wide">
            <th className="text-left px-5 py-3">#</th>
            <th className="text-left px-5 py-3">Student</th>
            <th className="text-left px-5 py-3">Phone</th>
            <th className="text-left px-5 py-3">Gender</th>
            <th className="text-left px-5 py-3">Fee</th>
            <th className="text-left px-5 py-3">Expiry</th>
            <th className="text-left px-5 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {list.map((s, i) => {
            const rowNumber = (currentPage - 1) * itemsPerPage + i + 1;
            const daysLeft = getDaysLeft(s.expiry_date);
            const isExpired = daysLeft !== null && daysLeft <= 0;
            const isWarning = daysLeft !== null && daysLeft > 0 && daysLeft <= 7;

            return (
              <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 text-gray-400">{rowNumber}</td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center text-gray-500 overflow-hidden">
                      {s.photo_url ? (
                        <img src={s.photo_url} alt={s.name} className="w-full h-full object-cover"
                          onError={(e) => { e.currentTarget.style.display = "none"; e.currentTarget.nextSibling.style.display = "block"; }} />
                      ) : null}
                      <User size={18} style={{ display: s.photo_url ? "none" : "block" }} />
                    </div>
                    <p className="font-medium text-gray-800">{s.name}</p>
                  </div>
                </td>

                <td className="px-5 py-4 text-gray-500">{s.phone}</td>

                <td className="px-5 py-4">
                  <span className={`text-xs font-medium px-2 py-1 rounded-lg ${s.gender === "GIRLS" ? "bg-pink-50 text-pink-600" : "bg-blue-50 text-blue-600"}`}>
                    {s.gender}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                    s.fee_status === "PAID" ? "bg-green-50 text-green-600"
                    : s.fee_status === "PENDING" ? "bg-yellow-50 text-yellow-600"
                    : "bg-red-50 text-red-600"}`}>
                    {s.fee_status || "UNPAID"}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs text-gray-600">{fmt(s.expiry_date)}</span>
                    {isExpired && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-red-100 text-red-600 w-fit">
                        <AlertTriangle size={9} /> Expired
                      </span>
                    )}
                    {isWarning && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700 w-fit">
                        <AlertTriangle size={9} /> {daysLeft}d left
                      </span>
                    )}
                  </div>
                </td>

                <td className="px-5 py-4">
                  {/* sm only: 3-dot menu */}
                  <div className="md:hidden">
                    <ActionMenu student={s} onView={onView} onEdit={onEdit} onAssign={onAssign} onDelete={onDelete} />
                  </div>
                  {/* md and above: icon buttons */}
                  <div className="hidden md:flex">
                    <IconActions student={s} onView={onView} onEdit={onEdit} onAssign={onAssign} onDelete={onDelete} />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default WaitingTable;