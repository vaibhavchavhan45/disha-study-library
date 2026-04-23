const statusStyle = {
  OCCUPIED: { pill: "bg-orange-100 text-orange-600",   label: "OCCUPIED" },
  EMPTY:    { pill: "bg-green-100 text-green-600", label: "EMPTY"  },
};

const SeatModal = ({ seatNumber, status, studentName, onClose, children }) => {
  const s = statusStyle[status] || statusStyle.EMPTY;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">

        {/* Header */}
        <div className="flex justify-between items-start mb-5">
          <div className="flex flex-col gap-1">
            <span className="text-xs text-gray-400 font-medium tracking-wide">
              Seat #{seatNumber}
            </span>
            <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full w-fit ${s.pill}`}>
              {s.label}
            </span>
            {studentName && (
              <p className="text-lg font-bold text-gray-800 mt-0.5">{studentName}</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none mt-0.5"
          >
            &times;
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default SeatModal;