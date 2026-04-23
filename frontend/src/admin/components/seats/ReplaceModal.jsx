import { useState } from "react";
import SeatModal from "./SeatModal";
import { Input, Select } from "./SeatFormFields";
import { replaceSeatApi } from "../../services/seatApi";

const ReplaceModal = ({ seat, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "", phone: "", email: "",
    fee_status: "UNPAID", start_date: "", expiry_date: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async () => {
    if (!form.name || !form.phone || !form.email)
      return setError("Name, phone and email are required.");
    try {
      setLoading(true);
      await replaceSeatApi(seat.id, form);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to replace student.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SeatModal
      title="Replace Student"
      subtitle={`Seat #${seat.seat_number} · ${seat.name} → Ex-Students`}
      onClose={onClose}
    >
      <div className="space-y-3">
        <Input label="New Student Name" name="name" placeholder="Full name" value={form.name} onChange={handle} />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Phone Number" name="phone" placeholder="Phone" value={form.phone} onChange={handle} />
          <Input label="Email Address" name="email" placeholder="Email" value={form.email} onChange={handle} />
        </div>
        <Select
          label="Fee Status"
          name="fee_status"
          value={form.fee_status}
          onChange={handle}
          options={[
            { value: "UNPAID", label: "Unpaid" },
            { value: "PAID", label: "Paid" },
            { value: "PENDING", label: "Pending" },
          ]}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Start Date" name="start_date" type="date" value={form.start_date} onChange={handle} />
          <Input label="Expiry Date" name="expiry_date" type="date" value={form.expiry_date} onChange={handle} />
        </div>
        {error && <p className="text-red-500 text-xs">{error}</p>}
        <button
          onClick={submit}
          disabled={loading}
          className="w-full bg-gray-900 text-white rounded-xl py-2.5 text-sm font-medium hover:bg-gray-700 transition-colors mt-1 disabled:opacity-50"
        >
          {loading ? "Replacing..." : "Replace Student"}
        </button>
      </div>
    </SeatModal>
  );
};

export default ReplaceModal;