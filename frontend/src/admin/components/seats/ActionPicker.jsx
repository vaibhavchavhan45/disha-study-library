import SeatModal from "./SeatModal";

const ActionPicker = ({ seat, onClose, onSelect }) => (
  <SeatModal
    seatNumber={seat.seat_number}
    status={seat.status}
    studentName={seat.name}
    onClose={onClose}
  >
    <p className="text-sm text-gray-500 mb-4">Choose an action:</p>
    <div className="space-y-2">

      {seat.status === "EMPTY" && (
        <button
          onClick={() => onSelect("assign")}
          className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
            <path d="M20 6 9 17l-5-5" />
          </svg>
          Assign Student
        </button>
      )}

      {seat.status === "OCCUPIED" && (
        <>
          <button
            onClick={() => onSelect("view")}
            className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            View Student Detail
          </button>
          <button
            onClick={() => onSelect("edit")}
            className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4Z" />
            </svg>
            Edit Student Detail
          </button>
          <button
            onClick={() => onSelect("replace")}
            className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 text-sm font-medium flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-600">
              <path d="M17 2l4 4-4 4" />
              <path d="M3 11V9a4 4 0 0 1 4-4h14" />
              <path d="M7 22l-4-4 4-4" />
              <path d="M21 13v2a4 4 0 0 1-4 4H3" />
            </svg>
            Replace Student
          </button>
          <button
            onClick={() => onSelect("remove")}
            className="w-full text-left px-4 py-3 rounded-xl border border-gray-200 hover:bg-red-50 text-sm font-medium text-red-500 flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
            Remove Student
          </button>
        </>
      )}

    </div>
  </SeatModal>
);

export default ActionPicker;