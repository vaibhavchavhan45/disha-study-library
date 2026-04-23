import statusConfig from "../../../config/admin/statusConfig";

const STATUS_LETTER = {
  EMPTY:    "E",
  OCCUPIED: "O",
  UNPAID:   "!",
};

const isUnpaidExpired = (seat) => {
  return (
    seat.status === "OCCUPIED" &&
    seat.fee_status?.toUpperCase() === "UNPAID" &&
    seat.expiry_date &&
    new Date(seat.expiry_date) < new Date()
  );
};

const SeatCard = ({ seat, onClick }) => {
  const unpaid  = isUnpaidExpired(seat);
  const cfg    = statusConfig[seat.status] || statusConfig.EMPTY;
  const letter = STATUS_LETTER[seat.status] || "?";
  const isEmpty = seat.status === "EMPTY";

  return (
    <button
      onClick={() => onClick(seat)}
      className={`${cfg.bg} ${cfg.border} border-2 rounded-xl p-3 text-left transition-transform hover:scale-105 hover:shadow-md relative`}
    >
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-bold text-gray-500">#{seat.seat_number}</span>
        <span
          className={`w-5 h-5 rounded-full flex items-center justify-center text-white font-bold ${cfg.dot}`}
          style={{ fontSize: "9px" }}
        >
          {letter}
        </span>
      </div>

      <p className={`font-semibold truncate ${cfg.text} ${isEmpty ? "text-sm tracking-widest" : "text-sm"}`}>
        {isEmpty ? "---" : seat.name}
      </p>

      <p className="text-xs text-gray-400 mt-0.5">
        {unpaid ? "OCCUPIED" : seat.status}
      </p>

      {/* Unpaid badge */}
      {unpaid && (
        <span className="absolute bottom-2 right-2 text-[9px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full">
          ⚠ Unpaid
        </span>
      )}
    </button>
  );
};

export default SeatCard;