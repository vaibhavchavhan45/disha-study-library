import { X } from "lucide-react";

const Modal = ({ title, subtitle, onClose, children }) => {
  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl px-4 sm:px-5 pt-3 pb-5"
        onClick={(e) => e.stopPropagation()}
      >
        {/* X button — mobile only */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 sm:hidden text-gray-400 hover:text-gray-700 transition-colors"
        >
          <X size={26} />
        </button>

        {/* Title + Subtitle + X — sm and above */}
        <div className="relative items-start justify-center pt-2 pb-2 mb-2 hidden sm:flex">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900">{title}</h3>
            {subtitle && (
              <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            className="absolute right-0 top-0 text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X size={26} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;