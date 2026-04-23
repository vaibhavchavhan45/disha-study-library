export const Input = ({ label, ...props }) => (
  <div>
    <label className="text-xs text-gray-500 mb-1 block">{label}</label>
    <input
      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400"
      {...props}
    />
  </div>
);

export const Select = ({ label, options, ...props }) => (
  <div>
    <label className="text-xs text-gray-500 mb-1 block">{label}</label>
    <select
      className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-gray-400 bg-white"
      {...props}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  </div>
);