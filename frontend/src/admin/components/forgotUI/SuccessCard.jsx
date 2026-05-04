function SuccessCard({ heading, subtext, onButtonClick, buttonLabel }) {
  return (
    <div className="text-center py-6 space-y-5">
      <div className="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-14 h-14 text-green-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12l3 3 5-5" />
        </svg>
      </div>
      <p className="text-green-400 font-semibold text-lg syne">{heading}</p>
      <p className="text-white/50 text-sm leading-relaxed max-w-xs mx-auto">{subtext}</p>
      <button
        type="button"
        onClick={onButtonClick}
        className="syne bg-white text-black text-sm font-semibold rounded-xl px-8 py-2.5 tracking-wide"
      >
        {buttonLabel}
      </button>
    </div>
  );
}

export default SuccessCard;