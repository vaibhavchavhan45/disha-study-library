import { Phone, Mail, Armchair, User } from "lucide-react";

const FEE_BADGE = {
  PAID:    "bg-green-50 text-green-600",
  UNPAID:  "bg-red-50 text-red-500",
  PENDING: "bg-yellow-50 text-yellow-600",
};

const fmt = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const ExStudentCards = ({ list, currentPage, itemsPerPage }) => {
  return (
    <div className="lg:hidden space-y-3 p-3">
      {list.map((s, i) => {
        const rowNumber = (currentPage - 1) * itemsPerPage + i + 1;
        return (
          <div key={s.id} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
                {s.photo_url ? (
                  <img
                    src={s.photo_url}
                    alt={s.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                      e.currentTarget.nextSibling.style.display = "block";
                    }}
                  />
                ) : null}
                <User size={18} className="text-gray-400" style={{ display: s.photo_url ? "none" : "block" }} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-semibold text-gray-900 truncate">{s.name || "—"}</p>
                  <span className="text-xs text-gray-400 shrink-0">#{rowNumber}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  {s.gender && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${s.gender === "GIRLS" ? "bg-pink-50 text-pink-600" : "bg-blue-50 text-blue-600"}`}>
                      {s.gender}
                    </span>
                  )}
                  {s.fee_status && (
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${FEE_BADGE[s.fee_status] || ""}`}>
                      {s.fee_status}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-2">
              {s.phone && (
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Phone size={13} /> {s.phone}
                </div>
              )}
              {s.email && (
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Mail size={13} /> {s.email}
                </div>
              )}
              {s.seat_number && (
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <Armchair size={13} /> Seat #{s.seat_number}
                </div>
              )}
              <div className="grid grid-cols-2 gap-2 mt-2">
                <div className="bg-gray-50 rounded-xl px-3 py-2">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Start</p>
                  <p className="text-xs font-medium text-gray-700">{fmt(s.start_date)}</p>
                </div>
                <div className="bg-gray-50 rounded-xl px-3 py-2">
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-0.5">Exit</p>
                  <p className="text-xs font-medium text-gray-700">{fmt(s.exit_date)}</p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ExStudentCards;