import { Search, ArrowUpDown } from "lucide-react";

const SearchSortToolbar = ({ title, subtitle, search, setSearch, sortOrder, setSortOrder }) => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">

      {/* Title */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mt-2 sm:mt-0">

        {/* Search */}
        <div className="relative flex-1 md:w-72">
          <label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] font-medium text-gray-400 z-10">
            Search
          </label>
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Name, phone, email..."
            className="w-full border border-gray-200 rounded-2xl pl-9 pr-3 py-2.5 text-sm text-gray-800 outline-none focus:border-gray-400 focus:ring-2 focus:ring-gray-100 transition"
          />
        </div>

        {/* Sort — only when setSortOrder is provided */}
        {setSortOrder && (
          <div className="relative w-[148px]">
            <label className="absolute -top-2.5 left-3 bg-white px-1 text-[11px] font-medium text-gray-400 z-10">
              Sort By
            </label>
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