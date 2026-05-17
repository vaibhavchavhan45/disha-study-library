import { User } from "lucide-react";

const FEE_STYLES = {
  PAID: "bg-green-100 text-green-700",
  UNPAID: "bg-red-100 text-red-600",
  PENDING: "bg-yellow-100 text-yellow-700",
};

const InfoTile = ({ label, children }) => (
  <div className="bg-gray-50 rounded-xl px-4 py-3">
    <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">{label}</p>
    {children}
  </div>
);

const fmt = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const getDaysLeft = (expiry_date) => {
  if (!expiry_date) return null;
  return Math.ceil((new Date(expiry_date) - new Date()) / (1000 * 60 * 60 * 24));
};

const ExpiryChip = ({ expiry_date }) => {
  const daysLeft = getDaysLeft(expiry_date);
  if (daysLeft === null) return null;

  let style, label;

  if (daysLeft <= 0) {
    style = "bg-red-100 text-red-600";
    label = "Expired";
  }
  else if (daysLeft <= 7) {
    style = "bg-red-100 text-red-600";
    label = `Expires in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`;
  }
  else if (daysLeft <= 30) {
    style = "bg-yellow-100 text-yellow-700";
    label = `Expires in ${daysLeft} days`;
  }
  else {
    style = "bg-green-100 text-green-700";
    label = `Expires in ${daysLeft} days`;
  }

  return (
    <span className={`inline-flex items-center gap-1 mt-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full ${style}`}>
      {label}
    </span>
  );
};

const ViewStudentModal = ({ seat, onClose }) => {
  const { seat_number, status, name, phone, email, fee_status, start_date, expiry_date, photo_url, pending_amount } = seat;
  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">

        {/* Header */}
        <div className="flex items-start gap-4 px-5 pt-5 pb-4 border-b border-gray-100">
          <div className="w-20 h-20 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
            {photo_url ? (
              <img src={photo_url} alt={name} className="w-full h-full object-cover" />
            ) : (
              <User size={28} className="text-gray-400" />
            )}
          </div>

          <div className="flex-1 min-w-0 pt-1">
            <p className="text-xs text-gray-400 mb-0.5">Seat #{seat_number}</p>
            <p className="text-lg font-semibold text-gray-900 truncate">{name || "—"}</p>
            <span className={`inline-block mt-1.5 text-[11px] font-semibold px-3 py-0.5 rounded-full ${status === "OCCUPIED" ? "bg-orange-100 text-orange-600" : "bg-green-100 text-green-600"
              }`}>
              {status}
            </span>
          </div>

          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors mt-1 shrink-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Info tiles */}
        <div className="px-5 py-4 flex flex-col gap-3">

          <InfoTile label="Email">
            <p className="text-sm font-medium text-gray-800">{email || "—"}</p>
          </InfoTile>

          <div className="grid grid-cols-2 gap-3">
            <InfoTile label="Phone">
              <p className="text-sm font-medium text-gray-800">{phone || "—"}</p>
            </InfoTile>
            <InfoTile label="Fee Status">
              <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mt-0.5 ${FEE_STYLES[fee_status] || "bg-gray-100 text-gray-500"}`}>
                {fee_status || "—"}
              </span>
            </InfoTile>
            {fee_status === "PENDING" && (
              <InfoTile label="Pending Amount">
                <p className="text-sm font-medium text-gray-800">₹{pending_amount || 0}</p>
              </InfoTile>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <InfoTile label="Start Date">
              <p className="text-sm font-medium text-gray-800">{fmt(start_date)}</p>
            </InfoTile>
            <InfoTile label="Expiry Date">
              <p className="text-sm font-medium text-gray-800">{fmt(expiry_date)}</p>
              <ExpiryChip expiry_date={expiry_date} />
            </InfoTile>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewStudentModal;