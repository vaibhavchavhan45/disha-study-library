import { useEffect, useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { getWaitingListApi, deleteWaitingStudentApi } from "../services/waitingApi";
import AddWaitingStudentModal from "../components/waiting/AddWaitingStudentModal";
import AssignWaitingSeatModal from "../components/waiting/AssignWaitingSeatModal";
import ViewWaitingStudentModal from "../components/waiting/ViewWaitingStudentModal";
import EditWaitingStudentModal from "../components/waiting/EditWaitingStudentModal";
import ConfirmDeleteModal from "../components/waiting/ConfirmDeleteModal";
import WaitingTable from "../components/waiting/WaitingTable";
import WaitingCards from "../components/waiting/WaitingCards";
import Pagination from "../components/waiting/Pagination";
import SearchSortToolbar from "../components/common/SearchSortToolbar";
import { ITEMS_PER_PAGE } from "../data/items";


function WaitingPage() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAdd, setShowAdd] = useState(false);
  const [viewing, setViewing] = useState(null);
  const [editing, setEditing] = useState(null);
  const [assigning, setAssigning] = useState(null);
  const [deletingStudent, setDeletingStudent] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchWaitingList = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getWaitingListApi();
      setList(data.waitingStudents || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch waiting list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchWaitingList(); }, []);

  const handleSuccess = () => {
    setShowAdd(false);
    setViewing(null);
    setEditing(null);
    setAssigning(null);
    fetchWaitingList();
  };

  const handleDelete = async () => {
    if (!deletingStudent) return;
    try {
      setDeleteLoading(true);
      await deleteWaitingStudentApi(deletingStudent.id);
      setDeletingStudent(null);
      fetchWaitingList();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to remove student.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const filteredList = useMemo(() => {
    const q = search.trim().toLowerCase();
    const searched = q
      ? list.filter((s) =>
        s.name?.toLowerCase().includes(q) ||
        s.phone?.toLowerCase().includes(q) ||
        s.email?.toLowerCase().includes(q) ||
        s.fee_status?.toLowerCase().includes(q)
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

  const anyModalOpen = showAdd || viewing || editing || assigning || deletingStudent;

  return (
    <div className="space-y-6 relative">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-3xl font-semibold tracking-tight text-gray-900">Waiting List</h1>
          <p className="text-sm text-gray-500 mt-1">Manage students who are currently waiting for a seat.</p>
        </div>
        <button
          onClick={() => setShowAdd(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-900 text-white rounded-xl px-4 py-2.5 text-sm font-medium hover:bg-gray-700 transition-colors"
        >
          <Plus size={16} /> Add Student
        </button>
      </div>

      {/* Count */}
      {!loading && !error && (
        <div className="inline-flex items-center rounded-full border border-yellow-300 bg-yellow-50 px-3 py-1.5 text-sm text-yellow-800 shadow-sm">
          <span className="font-semibold text-yellow-900 mr-1">{filteredList.length}</span>
          student{filteredList.length !== 1 ? "s" : ""} in waiting list
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
          <p className="text-gray-400 text-sm">No students in the waiting list.</p>
        </div>
      )}

      {/* Table / Cards */}
      {!loading && !error && list.length > 0 && (
        <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-gray-200 bg-gray-50/80">
            <SearchSortToolbar
              title="Waiting Students"
              subtitle="Search by name, phone, email or fee status."
              search={search}
              setSearch={setSearch}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          </div>

          {filteredList.length === 0 ? (
            <div className="p-10 text-center">
              <p className="text-gray-500 text-sm">No matching students found.</p>
            </div>
          ) : (
            <>
              <WaitingTable
                list={paginatedList}
                onView={setViewing}
                onEdit={setEditing}
                onAssign={setAssigning}
                onDelete={setDeletingStudent}
                currentPage={currentPage}
                itemsPerPage={ITEMS_PER_PAGE}
              />
              <WaitingCards
                list={paginatedList}
                onView={setViewing}
                onEdit={setEditing}
                onAssign={setAssigning}
                onDelete={setDeletingStudent}
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

      {/* Modals */}
      {showAdd && !anyModalOpen || showAdd ? <AddWaitingStudentModal onClose={() => setShowAdd(false)} onSuccess={handleSuccess} /> : null}
      {viewing && !showAdd ? <ViewWaitingStudentModal student={viewing} onClose={() => setViewing(null)} /> : null}
      {editing && !showAdd && !viewing ? <EditWaitingStudentModal student={editing} onClose={() => setEditing(null)} onSuccess={handleSuccess} /> : null}
      {assigning && !showAdd && !viewing && !editing ? <AssignWaitingSeatModal student={assigning} onClose={() => setAssigning(null)} onSuccess={handleSuccess} /> : null}
      {deletingStudent ? (
        <ConfirmDeleteModal
          onClose={() => setDeletingStudent(null)}
          onConfirm={handleDelete}
          loading={deleteLoading}
        />
      ) : null}

    </div>
  );
};

export default WaitingPage;