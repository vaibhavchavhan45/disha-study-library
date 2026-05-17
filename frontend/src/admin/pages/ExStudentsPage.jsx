import { useEffect, useMemo, useState } from "react";
import { getExStudentsApi } from "../services/exStudentApi";
import ExStudentTable from "../components/exStudents/ExStudentTable";
import ExStudentCards from "../components/exStudents/ExStudentCards";
import Pagination from "../components/waiting/Pagination";
import SearchSortToolbar from "../components/common/SearchSortToolbar";
import { ITEMS_PER_PAGE } from "../data/items";


function ExStudentsPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getExStudentsApi();
        setList(data.exStudents || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch ex-students.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, []);

  const filteredList = useMemo(() => {
    const query = search.trim().toLowerCase();
    if (!query) return list;
    return list.filter((s) =>
      s.name?.toLowerCase().includes(query) ||
      s.phone?.toLowerCase().includes(query) ||
      s.email?.toLowerCase().includes(query) ||
      s.gender?.toLowerCase().includes(query)
    );
  }, [list, search]);

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);

  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredList.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredList, currentPage]);

  useEffect(() => { setCurrentPage(1); }, [search]);

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Ex Students</h1>
        <p className="text-sm text-gray-500 mt-1">Students who have left the library.</p>
      </div>

      {/* Count badge */}
      {!loading && !error && (
        <div className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-sm text-red-800 shadow-sm">
          <span className="font-semibold text-red-900 mr-1">{filteredList.length}</span>
          ex-student{filteredList.length !== 1 ? "s" : ""} found
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
          <p className="text-gray-400 text-sm">No ex-students yet.</p>
        </div>
      )}

      {/* Table + Cards */}
      {!loading && !error && list.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">

          {/* Toolbar */}
          <div className="p-4 sm:p-5 border-b border-gray-200 bg-gray-50/80">
            <SearchSortToolbar
              title="Ex Students"
              subtitle="Search by name, phone, email or gender."
              search={search}
              setSearch={setSearch}
            />
          </div>

          {filteredList.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-gray-500 text-sm">No matching ex-students found.</p>
            </div>
          ) : (
            <>
              <ExStudentTable
                list={paginatedList}
                currentPage={currentPage}
                itemsPerPage={ITEMS_PER_PAGE}
              />
              <ExStudentCards
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

export default ExStudentsPage;