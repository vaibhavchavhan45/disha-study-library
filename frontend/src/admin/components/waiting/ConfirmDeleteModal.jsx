import { AlertTriangle } from "lucide-react";
import Modal from "./Modal";

const ConfirmDeleteModal = ({ onClose, onConfirm, loading }) => {
  return (
    <Modal onClose={onClose}>
      <div className="text-center px-2 py-2">
        {/* Icon */}
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50 border border-red-100">
          <AlertTriangle className="h-7 w-7 text-red-500" />
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900">
          Delete Student?
        </h3>

        {/* Subtitle */}
        <p className="mt-2 text-sm text-gray-500 max-w-sm mx-auto leading-relaxed">
          This student will be permanently removed from the waiting list.
          This action cannot be undone.
        </p>

        {/* Buttons */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={onClose}
            className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className="w-full rounded-2xl bg-red-500 px-4 py-3 text-sm font-medium text-white hover:bg-red-600 transition disabled:opacity-60"
          >
            {loading ? "Deleting..." : "Yes, Delete"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteModal;