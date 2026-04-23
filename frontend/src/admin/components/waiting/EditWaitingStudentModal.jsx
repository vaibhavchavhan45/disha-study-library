import { useState } from "react";
import { Camera, Plus } from "lucide-react";
import Modal from "./Modal";
import { config } from "../../../config/config";
import { urlConfig } from "../../../config/urlConfig";


const EditWaitingStudentModal = ({ student, onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: student.name || "",
    phone: student.phone || "",
    email: student.email || "",
    gender: student.gender || "GIRLS",
    fee_status: student.fee_status || "UNPAID",
    photo_url: student.photo_url || "",
    start_date: student.start_date ? student.start_date.slice(0, 10) : "",
    expiry_date: student.expiry_date ? student.expiry_date.slice(0, 10) : "",
  });
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handle = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setForm({ ...form, [name]: value.replace(/\D/g, "").slice(0, 10) });
      return;
    }
    setForm({ ...form, [name]: value });
  };

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
      await editWaitingStudentApi(student.id, form);
      onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to update student.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose}>
      <div className="space-y-4">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900">Edit Student</h2>
          <p className="text-sm text-gray-500 mt-1">Update waiting student details</p>
        </div>

        {/* Photo */}
        <div className="flex justify-center">
          <label className="relative group cursor-pointer">
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden">
              {form.photo_url ? (
                <>
                  <img src={form.photo_url} alt="Student" className="w-full h-full object-cover group-hover:opacity-70 transition-opacity" />
                  <div className="absolute inset-0 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera size={20} className="text-white" />
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center text-gray-400">
                  <Camera size={22} />
                  <span className="text-xs mt-1">{uploading ? "Uploading..." : "Add Photo"}</span>
                </div>
              )}
            </div>
            <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-gray-900 text-white flex items-center justify-center border-2 border-white">
              <Plus size={14} />
            </div>
          </label>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input type="text" name="name" placeholder="Student full name" value={form.name} onChange={handle}
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400 transition" />
        </div>

        {/* Phone + Email */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
            <input type="text" name="phone" placeholder="10-digit number" value={form.phone} onChange={handle} maxLength={10}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400 transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
            <input type="text" name="email" placeholder="example@gmail.com" value={form.email} onChange={handle}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400 transition" />
          </div>
        </div>

        {/* Gender + Fee Status */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select name="gender" value={form.gender} onChange={handle}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400 transition">
              <option value="GIRLS">Girls</option>
              <option value="BOYS">Boys</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Fee Status</label>
            <select name="fee_status" value={form.fee_status} onChange={handle}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400 transition">
              <option value="UNPAID">Unpaid</option>
              <option value="PAID">Paid</option>
              <option value="PENDING">Pending</option>
            </select>
          </div>
        </div>

        {/* Start + Expiry */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
            <input type="date" name="start_date" value={form.start_date} onChange={handle}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400 transition" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
            <input type="date" name="expiry_date" value={form.expiry_date} onChange={handle}
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-gray-400 transition" />
          </div>
        </div>

        {error && <p className="text-red-500 text-sm bg-red-50 border border-red-100 rounded-xl px-3 py-2">{error}</p>}

        <button onClick={submit} disabled={loading || uploading}
          className="w-full rounded-2xl bg-gray-900 text-white py-3 text-sm font-medium hover:bg-black transition disabled:opacity-60">
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </Modal>
  );
};

export default EditWaitingStudentModal;