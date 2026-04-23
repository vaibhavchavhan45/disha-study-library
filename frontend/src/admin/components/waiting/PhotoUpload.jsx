import { useRef, useState } from "react";
import { Camera, Loader } from "lucide-react";
import { config } from "../../../config/config";
import urlConfig from "../../../config/urlConfig";


const PhotoUpload = ({ value, onChange }) => {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // basic client side validation
    if (!file.type.startsWith("image/")) {
      return setError("Please select an image file.");
    }

    if (file.size > 5 * 1024 * 1024) {
      return setError("Image must be under 5MB.");
    }

    try {
      setUploading(true);
      setError("");

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", config.cloudinary_upload_preset);

      const res = await fetch(
                    urlConfig.cloudinaryUploadUrl, 
                    { 
                      method: "POST", 
                      body: formData
                    }
                  );

      if (!res.ok) throw new Error("Upload failed");

      const data = await res.json();
      onChange(data.secure_url);
    } catch {
      setError("Photo upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="relative w-20 h-20 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 hover:border-gray-400 flex items-center justify-center overflow-hidden transition group"
      >
        {/* preview uploaded photo */}
        {value && !uploading && (
          <img
            src={value}
            alt="Student"
            className="w-full h-full object-cover rounded-full"
          />
        )}

        {/* spinner while uploading */}
        {uploading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-full">
            <Loader size={20} className="animate-spin text-gray-500" />
          </div>
        )}

        {/* + camera icon overlay */}
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center rounded-full transition
            ${value ? "bg-black/30 opacity-0 group-hover:opacity-100" : "opacity-100"}`}
        >
          <Camera size={20} className={value ? "text-white" : "text-gray-400"} />
          {!value && (
            <span className="text-[10px] text-gray-400 mt-1">Add Photo</span>
          )}
        </div>
      </button>

      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}

      {/* hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default PhotoUpload;