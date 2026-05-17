import { useEffect, useState } from "react";
import { Phone, Mail, User, CalendarDays } from "lucide-react";
import Modal from "./Modal";
import { assignWaitingSeatApi } from "../../services/waitingApi";
import { getSeatsApi } from "../../services/seatApi";

const fmt = (d) =>
  d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

const AssignWaitingSeatModal = ({ student, onClose, onSuccess }) => {
  const [seats, setSeats] = useState([]);
  const [seatId, setSeatId] = useState("");
  const [feeStatus, setFeeStatus] = useState(student.fee_status || "UNPAID");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getSeatsApi(student.gender);
        setSeats((data.seats || []).filter((s) => s.status === "EMPTY" || s.status === "RESERVED"));
      } catch {
        setError("Could not load available seats.");
      } finally {
        setFetching(false);
      }
    };
    load();
  }, [student.gender]);

  const submit = async () => {
    if (!seatId) return setError("Please select a seat.");
    try {
      setLoading(true);
      setError("");
      await assignWaitingSeatApi(student.id, {
        seatId: Number(seatId),
        fee_status: feeStatus,
      });
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to assign seat.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="space-y-5">
        <div className="text-center mb-1">
          <h2 className="text-2xl font-semibold text-gray-900">Assign Seat</h2>
          <p className="text-sm text-gray-500 mt-1">Move this student from waiting list to an active seat.</p>
        </div>

        {/* Student Card */}
        <div className="rounded-2xl border border-gray-200 bg-gray-50 px-4 py-4">
          <div className="flex items-start gap-4">
            <img
              src={student.photo_url || "https://via.placeholder.com/60"}
              alt={student.name}
              className="w-14 h-14 rounded-full object-cover border border-gray-200 shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="text-lg font-semibold text-gray-900">{student.name}</h4>
              <div className="mt-2 flex flex-col gap-1 text-sm text-gray-500">
                <span className="inline-flex items-center gap-2"><User size={14} />{student.gender}</span>
                {student.phone && <span className="inline-flex items-center gap-2"><Phone size={14} />{student.phone}</span>}
                {student.email && <span className="inline-flex items-center gap-2"><Mail size={14} /><span className="break-all">{student.email}</span></span>}
              </div>
            </div>
          </div>

          {/* Dates carry-over info */}
          <div className="mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-3">
            <div className="bg-white rounded-xl px-3 py-2.5 border border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Start Date</p>
              <div className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
                <CalendarDays size={13} className="text-gray-400" />
                {fmt(student.start_date)}
              </div>
            </div>
            <div className="bg-white rounded-xl px-3 py-2.5 border border-gray-100">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Expiry Date</p>
              <div className="flex items-center gap-1.5 text-sm font-medium text-gray-800">
                <CalendarDays size={13} className="text-gray-400" />
                {fmt(student.expiry_date)}
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">Dates will carry over automatically to the assigned seat.</p>
        </div>

        {/* Select Seat */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Select Seat</label>
          {fetching ? (
            <div className="border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-400 bg-gray-50">Loading available seats...</div>
          ) : seats.length === 0 ? (
            <div className="border border-red-200 rounded-2xl px-4 py-3 text-sm text-red-500 bg-red-50">No available seats for {student.gender}.</div>
          ) : (
            <select
              value={seatId} onChange={(e) => setSeatId(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-gray-400 bg-white transition"
            >
              <option value="">Select a seat</option>
              {seats.map((s) => (
                <option key={s.id} value={s.id}>Seat #{s.seat_number} ({s.status})</option>
              ))}
            </select>
          )}
        </div>

        {/* Fee Status */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">Fee Status</label>
          <select
            value={feeStatus} onChange={(e) => setFeeStatus(e.target.value)}
            className="w-full border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-800 outline-none focus:border-gray-400 bg-white transition"
          >
            <option value="UNPAID">Unpaid</option>
            <option value="PAID">Paid</option>
            <option value="PENDING">Pending</option>
          </select>
        </div>

        {error && (
          <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl px-3 py-2">{error}</p>
        )}

        <button
          onClick={submit} disabled={loading || fetching || seats.length === 0}
          className="w-full bg-gray-900 text-white rounded-2xl py-3 text-sm font-medium hover:bg-black transition-colors disabled:opacity-50"
        >
          {loading ? "Assigning..." : "Assign Seat"}
        </button>
      </div>
    </Modal>
  );
};

export default AssignWaitingSeatModal;