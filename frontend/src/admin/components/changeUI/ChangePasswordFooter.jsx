import { Loader2 } from "lucide-react";

function ChangePasswordFooter({ blocked, busy, onClose, onSubmit }) {
  return (
    <div className="px-6 pb-6 flex gap-2">
      <button
        onClick={onClose}
        className="flex-1 border rounded-xl py-2"
      >
        Cancel
      </button>

      {!blocked && (
        <button
          onClick={onSubmit}
          className="flex-1 bg-gray-900 text-white rounded-xl py-2 flex items-center justify-center gap-2"
        >
          {busy
            ? <Loader2 size={14} className="animate-spin" />
            : "Update"}
        </button>
      )}
    </div>
  );
}

export default ChangePasswordFooter;