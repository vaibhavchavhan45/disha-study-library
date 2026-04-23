const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-gray-100 px-4 sm:px-5 py-4">
      <button
        onClick={onPrev}
        disabled={currentPage === 1}
        className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 text-gray-700 hover:border-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Prev
      </button>

      <p className="text-sm text-gray-500">
        Page <span className="font-medium text-gray-800">{currentPage}</span> of{" "}
        <span className="font-medium text-gray-800">{totalPages}</span>
      </p>

      <button
        onClick={onNext}
        disabled={currentPage === totalPages}
        className="px-4 py-2 text-sm font-medium rounded-xl border border-gray-200 text-gray-700 hover:border-gray-400 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;