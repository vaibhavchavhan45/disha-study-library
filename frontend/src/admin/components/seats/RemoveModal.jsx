import { useState } from "react";
import SeatModal from "./SeatModal";
import { removeSeatApi } from "../../services/seatApi";

const RemoveModal = ({ seat, onClose, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    try {
      setLoading(true);
      await removeSeatApi(seat.id);
      onSuccess();
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  return (
    <SeatModal
      seatNumber={seat.seat_number}
      status={seat.status}
      studentName={seat.name}
      onClose={onClose}
    >
      <p className="text-sm text-gray-500 mb-2">
        This student will be moved to <span className="font-medium text-gray-700">Ex-Students</span> and the seat will be cleared.
      </p>
      <p className="text-xs text-gray-400 mb-5">This action cannot be undone.</p>
      <div className="flex gap-3">
        <button
          onClick={onClose}
          className="flex-1 border border-gray-200 rounded-xl py-2.5 text-sm text-gray-600 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          onClick={submit}
          disabled={loading}
          className="flex-1 bg-red-500 text-white rounded-xl py-2.5 text-sm font-medium hover:bg-red-400 transition-colors disabled:opacity-50"
        >
          {loading ? "Removing..." : "Yes, Remove"}
        </button>
      </div>
    </SeatModal>
  );
};

export default RemoveModal;