import { Phone, Mail, BookOpen, CalendarDays } from "lucide-react";

const fmt = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const BOARD   = ["HSC (12th)", "SSC Board (10th)", "JEE / NEET / CET"];
const STATE   = ["MPSC", "Saral Seva Bharti", "Police Bharti"];
const CENTRAL = ["SSC CGL", "Banking / IBPS"];

const getFieldBadgeClass = (field) => {
  if (BOARD.includes(field))   return "bg-purple-50 text-purple-700 border border-purple-200";
  if (STATE.includes(field))   return "bg-amber-50 text-amber-700 border border-amber-200";
  if (CENTRAL.includes(field)) return "bg-orange-50 text-orange-700 border border-orange-200";
  return "bg-teal-50 text-teal-700 border border-teal-200";
};

const InquiryCards = ({ list, currentPage, itemsPerPage }) => {
  return (
    <div className="sm:hidden space-y-3 p-3">
      {list.map((b, i) => {
        const rowNumber = (currentPage - 1) * itemsPerPage + i + 1;
        return (
          <div key={b.id} className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900 truncate">{b.full_name || "—"}</p>
                <p className="text-xs text-gray-400 mt-0.5">#{rowNumber}</p>
              </div>
              {b.field_of_preparation && (
                <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full shrink-0 ${getFieldBadgeClass(b.field_of_preparation)}`}>
                  {b.field_of_preparation}
                </span>
              )}
            </div>
            <div className="space-y-2">
              {b.phone && (
                <div className="flex items-center gap-2 text-xs text-gray-600"><Phone size={13} />{b.phone}</div>
              )}
              {b.email && (
                <div className="flex items-center gap-2 text-xs text-gray-600"><Mail size={13} />{b.email}</div>
              )}
              {b.field_of_preparation && (
                <div className="flex items-center gap-2 text-xs text-gray-600"><BookOpen size={13} />{b.field_of_preparation}</div>
              )}
              <div className="flex items-center gap-2 text-xs text-gray-400"><CalendarDays size={13} />{fmt(b.created_at)}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InquiryCards;