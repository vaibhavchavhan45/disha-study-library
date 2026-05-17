import { Search } from "lucide-react";

const WaitingToolbar = ({ search, setSearch }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <div>
        <h2 className="text-xl font-semibold text-gray-900">Waiting Students</h2>
        <p className="text-sm text-gray-500 mt-1">
          Search and manage students by name, phone, email, or fee status.
        </p>
      </div>

      <div className="relative w-full sm:max-w-sm">
        <Search
          size={16}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          placeholder="Search students..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border border-gray-200 rounded-2xl pl-11 pr-4 py-3 text-sm text-gray-800 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
        />
      </div>
    </div>
  );
};

export default WaitingToolbar;