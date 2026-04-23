import { useState } from "react";
import { Camera, Plus } from "lucide-react";
import SeatModal from "./SeatModal";
import { Input, Select } from "./SeatFormFields";
import { editSeatApi } from "../../services/seatApi";
import { config } from "../../../config/config.js";
import { urlConfig } from "../../../config/urlConfig.js";

const EditStudentModal = ({ seat, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: seat.name || "",
    phone: seat.phone || "",
    email: seat.email || "",
    fee_status: seat.fee_status || "UNPAID",
    start_date: seat.start_date ? seat.start_date.slice(0, 10) : "",
    expiry_date: seat.expiry_date ? seat.expiry_date.slice(0, 10) : "",
    photo_url: seat.photo_url || "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handlePhotoUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setUploading(true);
      setError("");
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", config.cloudinary_upload_preset);

      const res = await fetch(
        urlConfig.cloudinaryUploadUrl, 
        { 
          method: "POST", 
          body: data 
        }
      );

      const result = await res.json();
      if (!result.secure_url) throw new Error("Upload failed");
      setForm((prev) => ({ ...prev, photo_url: result.secure_url }));
    } catch {
      setError("Photo upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const submit = async () => {
    if (!form.name || !form.phone || !form.email)
      return setError("Name, phone and email are required.");
    if (!/^\d{10}$/.test(form.phone))
      return setError("Phone must be exactly 10 digits.");
    if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(form.email))
      return setError("Email must be a valid @gmail.com address.");
    try {
      setLoading(true);
      setError("");
      await editSeatApi(seat.id, form);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update student details.");
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
      <div className="space-y-3">

        {/* Photo Upload */}
        <div className="flex justify-center mb-2">
          <label className="relative group cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
            <div className="w-20 h-20 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden">
              {form.photo_url ? (
                <>
                  <img
                    src={form.photo_url}
                    alt="Student"
                    className="w-full h-full object-cover group-hover:opacity-70 transition-opacity"
                  />
                  <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={20} className="text-white drop-shadow" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <Camera size={20} />
                  <span className="text-xs mt-1">
                    {uploading ? "Uploading..." : "Add Photo"}
                  </span>
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-gray-900 text-white flex items-center justify-center border-2 border-white">
              <Plus size={12} />
            </div>
          </label>
        </div>

        <Input label="Full Name" name="name" placeholder="Student full name" value={form.name} onChange={handle} />
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
          disabled={loading || uploading}
          className="w-full bg-gray-900 text-white rounded-xl py-2.5 text-sm font-medium hover:bg-gray-700 transition-colors mt-1 disabled:opacity-50"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>

      </div>
    </SeatModal>
  );
};

export default EditStudentModal;