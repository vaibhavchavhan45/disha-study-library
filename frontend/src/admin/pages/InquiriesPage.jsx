import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { getAdminToken } from "../utils/adminStorage";
import { config } from "../../config/config";
import InquiryTable from "../components/inquiries/InquiryTable";
import InquiryCards from "../components/inquiries/InquiryCards";
import Pagination from "../components/waiting/Pagination";
import SearchSortToolbar from "../components/common/SearchSortToolbar";
import { ITEMS_PER_PAGE } from "../data/items";


function InquiriesPage () {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await axios.get(`${config.vite_api_url}/api/booking/all`, {
          headers: { Authorization: `Bearer ${getAdminToken()}` },
        });
        setList(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch inquiries.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const filteredList = useMemo(() => {
    const q = search.trim().toLowerCase();
    const searched = q
      ? list.filter((b) =>
          b.full_name?.toLowerCase().includes(q) ||
          b.phone?.toLowerCase().includes(q) ||
          b.email?.toLowerCase().includes(q) ||
          b.field_of_preparation?.toLowerCase().includes(q)
        )
      : list;

    return [...searched].sort((a, b) => {
      const diff = new Date(a.created_at) - new Date(b.created_at);
      return sortOrder === "asc" ? diff : -diff;
    });
  }, [list, search, sortOrder]);

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);

  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredList.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredList, currentPage]);

  useEffect(() => { setCurrentPage(1); }, [search, sortOrder]);
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Inquiries</h1>
        <p className="text-sm text-gray-500 mt-1">Seat booking requests from the public form.</p>
      </div>

      {/* Count badge */}
      {!loading && !error && (
        <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm text-blue-800 shadow-sm">
          <span className="font-semibold text-blue-900 mr-1">{filteredList.length}</span>
          {filteredList.length !== 1 ? "inquiries" : "inquiry"} found
        </div>
      )}

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && list.length === 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl p-10 text-center">
          <p className="text-gray-400 text-sm">No inquiries yet.</p>
        </div>
      )}

      {/* Table + Cards */}
      {!loading && !error && list.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

          <div className="p-4 sm:p-5 border-b border-gray-200 bg-gray-50/80">
            <SearchSortToolbar
              title="Inquiries"
              subtitle="Search by name, phone, email or preparation."
              search={search}
              setSearch={setSearch}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>

          {filteredList.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-gray-500 text-sm">No matching inquiries found.</p>
            </div>
          ) : (
            <>
              <InquiryTable
                list={paginatedList}
                currentPage={currentPage}
                itemsPerPage={ITEMS_PER_PAGE}
              />
              <InquiryCards
                list={paginatedList}
                currentPage={currentPage}
                itemsPerPage={ITEMS_PER_PAGE}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPrev={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                onNext={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              />
            </>
          )}
        </div>
      )}

    </div>
  );
};

export default InquiriesPage;