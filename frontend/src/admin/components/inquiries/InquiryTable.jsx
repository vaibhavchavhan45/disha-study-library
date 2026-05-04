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

const InquiryTable = ({ list, currentPage, itemsPerPage }) => {
  return (
    <div className="hidden lg:block overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-100/80 text-xs text-gray-500 uppercase tracking-wide">
            <th className="text-left px-5 py-3">#</th>
            <th className="text-left px-5 py-3">Full Name</th>
            <th className="text-left px-5 py-3">Phone</th>
            <th className="text-left px-5 py-3">Email</th>
            <th className="text-left px-5 py-3">Field of Preparation</th>
            <th className="text-left px-5 py-3">Date</th>
          </tr>
        </thead>
        <tbody>
          {list.map((b, i) => {
            const rowNumber = (currentPage - 1) * itemsPerPage + i + 1;
            return (
              <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-5 py-4 text-gray-400">{rowNumber}</td>
                <td className="px-5 py-4 font-medium text-gray-800">{b.full_name || "—"}</td>
                <td className="px-5 py-4 text-gray-500">{b.phone || "—"}</td>
                <td className="px-5 py-4 text-gray-500">{b.email || "—"}</td>
                <td className="px-5 py-4">
                  {b.field_of_preparation ? (
                    <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${getFieldBadgeClass(b.field_of_preparation)}`}>
                      {b.field_of_preparation}
                    </span>
                  ) : "—"}
                </td>
                <td className="px-5 py-4 text-gray-400 text-xs">{fmt(b.created_at)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default InquiryTable;