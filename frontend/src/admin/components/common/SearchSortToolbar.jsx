import { Search, ArrowUpDown } from "lucide-react";

const SearchSortToolbar = ({ title, subtitle, search, setSearch, sortOrder, setSortOrder }) => {
  return (
    <div className="flex flex-col gap-3">

      {/* Title */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>

      {/* Search + Sort — always one row */}
      <div className="flex items-center gap-2">

        {/* Search */}
        <div className="relative flex-1">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, phone, email..."
            autoComplete="off"
            name="search"
            className="w-full border border-gray-200 rounded-2xl pl-9 pr-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
          />
        </div>

        {/* Sort */}
        {setSortOrder && (
          <div className="relative shrink-0 w-36">
            <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full border border-gray-200 rounded-2xl pl-8 pr-3 py-2.5 text-sm text-gray-700 bg-white outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition appearance-none cursor-pointer"
            >
              <option value="asc">Oldest First</option>
              <option value="desc">Newest First</option>
            </select>
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchSortToolbar;