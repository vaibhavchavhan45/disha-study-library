import { User } from "lucide-react";
import Modal from "./Modal";

const FEE_STYLES = {
  PAID:    "bg-green-100 text-green-700",
  UNPAID:  "bg-red-100 text-red-600",
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
  } else if (daysLeft <= 7) {
    style = "bg-red-100 text-red-600";
    label = `Expires in ${daysLeft} day${daysLeft === 1 ? "" : "s"}`;
  } else if (daysLeft <= 30) {
    style = "bg-yellow-100 text-yellow-700";
    label = `Expires in ${daysLeft} days`;
  } else {
    style = "bg-green-100 text-green-700";
    label = `Expires in ${daysLeft} days`;
  }

  return (
    <span className={`inline-flex items-center mt-1.5 text-[11px] font-medium px-2 py-0.5 rounded-full ${style}`}>
      {label}
    </span>
  );
};

const ViewWaitingStudentModal = ({ student, onClose }) => {
  const { name, phone, email, gender, fee_status, photo_url, start_date, expiry_date } = student;

  return (
    <Modal onClose={onClose}>
      <div className="space-y-4">

        {/* Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
          <div className="w-20 h-20 rounded-full border border-gray-200 bg-gray-100 flex items-center justify-center overflow-hidden shrink-0">
            {photo_url ? (
              <img src={photo_url} alt={name} className="w-full h-full object-cover" />
            ) : (
              <User size={28} className="text-gray-400" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-400 mb-0.5">Waiting Student</p>
            <p className="text-lg font-semibold text-gray-900 truncate">{name || "—"}</p>
            <span className={`inline-block mt-1.5 text-[11px] font-semibold px-3 py-0.5 rounded-full ${
              gender === "GIRLS" ? "bg-pink-100 text-pink-600" : "bg-blue-100 text-blue-600"
            }`}>
              {gender}
            </span>
          </div>
        </div>

        {/* Info Tiles */}
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
    </Modal>
  );
};

export default ViewWaitingStudentModal;