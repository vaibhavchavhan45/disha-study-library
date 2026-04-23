import { User, Armchair } from "lucide-react";

const FEE_BADGE = {
  PAID:    "bg-green-50 text-green-600",
  UNPAID:  "bg-red-50 text-red-500",
  PENDING: "bg-yellow-50 text-yellow-600",
};

const fmt = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const ExStudentTable = ({ list, currentPage, itemsPerPage }) => {
  return (
    <div className="hidden sm:block overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-100/80 text-xs text-gray-500 uppercase tracking-wide">
            <th className="text-left px-5 py-3">#</th>
            <th className="text-left px-5 py-3">Student</th>
            <th className="text-left px-5 py-3">Phone</th>
            <th className="text-left px-5 py-3">Gender</th>
            <th className="text-left px-5 py-3">Seat</th>
            <th className="text-left px-5 py-3">Fee</th>
            <th className="text-left px-5 py-3">Start Date</th>
            <th className="text-left px-5 py-3">Exit Date</th>
          </tr>
        </thead>
        <tbody>
          {list.map((s, i) => {
            const rowNumber = (currentPage - 1) * itemsPerPage + i + 1;
            return (
              <tr key={s.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 text-gray-400">{rowNumber}</td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden shrink-0">
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
                    <div>
                      <p className="font-medium text-gray-800">{s.name || "—"}</p>
                      <p className="text-xs text-gray-400 truncate">{s.email || "—"}</p>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 text-gray-500">{s.phone || "—"}</td>

                <td className="px-5 py-4">
                  {s.gender ? (
                    <span className={`text-xs font-medium px-2 py-1 rounded-lg ${s.gender === "GIRLS" ? "bg-pink-50 text-pink-600" : "bg-blue-50 text-blue-600"}`}>
                      {s.gender}
                    </span>
                  ) : "—"}
                </td>

                <td className="px-5 py-4">
                  {s.seat_number ? (
                    <span className="flex items-center gap-1 text-gray-500">
                      <Armchair size={13} className="text-gray-400" /> #{s.seat_number}
                    </span>
                  ) : "—"}
                </td>

                <td className="px-5 py-4">
                  {s.fee_status ? (
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${FEE_BADGE[s.fee_status] || ""}`}>
                      {s.fee_status}
                    </span>
                  ) : "—"}
                </td>

                <td className="px-5 py-4 text-gray-500 text-xs">{fmt(s.start_date)}</td>
                <td className="px-5 py-4 text-gray-500 text-xs">{fmt(s.exit_date)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ExStudentTable;