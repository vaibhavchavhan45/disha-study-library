import { useEffect, useState } from "react";
import { getSeatsApi } from "../../services/seatApi";
import statusConfig from "../../../config/admin/statusConfig";
import SeatLoader from "./SeatLoader";
import SeatCard from "./SeatCard";
import ActionPicker from "./ActionPicker";
import AssignModal from "./AssignModal";
import RemoveModal from "./RemoveModal";
import ReplaceModal from "./ReplaceModal";
import ViewStudentModal from "./ViewStudentModal";
import EditStudentModal from "./EditStudentModal";

const SeatsSection = () => {
  const [gender, setGender]             = useState("GIRLS");
  const [girlsSeats, setGirlsSeats]     = useState([]);
  const [boysSeats, setBoysSeats]       = useState([]);
  const [loading, setLoading]           = useState(true);
  const [selectedSeat, setSelectedSeat] = useState(null);
  const [activeModal, setActiveModal]   = useState(null);

  const fetchBoth = async () => {
    try {
      setLoading(true);
      const [girls, boys] = await Promise.all([
        getSeatsApi("GIRLS"),
        getSeatsApi("BOYS"),
      ]);
      setGirlsSeats(girls.seats);
      setBoysSeats(boys.seats);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBoth(); }, []);

  const handleSeatClick    = (seat)   => { setSelectedSeat(seat); setActiveModal("picker"); };
  const handleActionSelect = (action) => setActiveModal(action);
  const handleClose        = ()       => { setSelectedSeat(null); setActiveModal(null); };
  const handleSuccess      = ()       => { handleClose(); fetchBoth(); };

  const activeSeats = gender === "GIRLS" ? girlsSeats : boysSeats;

  return (
    <div>

      {/* Toggle */}
      <div className="flex bg-gray-100 rounded-xl p-1 gap-1 w-36 mb-3">
        {["GIRLS", "BOYS"].map((g) => (
          <button
            key={g}
            onClick={() => setGender(g)}
            className={`flex-1 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              gender === g
                ? "bg-white shadow text-gray-800"
                : "text-gray-400 hover:text-gray-600"
            }`}
          >
            {g === "GIRLS" ? "Girls" : "Boys"}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="flex gap-4 mb-4 flex-wrap">
        {Object.entries(statusConfig).map(([status, cfg]) => (
          <div key={status} className="flex items-center gap-1.5">
            <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
            <span className="text-xs text-gray-400">{status}</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div style={{ minHeight: "400px" }}>
        {loading ? (
          <SeatLoader />
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3">
            {activeSeats.map((seat) => (
              <SeatCard key={seat.id} seat={seat} onClick={handleSeatClick} />
            ))}
          </div>
        )}
      </div>

      {/* Modals */}
      {selectedSeat && activeModal === "picker"  && <ActionPicker     seat={selectedSeat} onClose={handleClose} onSelect={handleActionSelect} />}
      {selectedSeat && activeModal === "assign"  && <AssignModal      seat={selectedSeat} onClose={handleClose} onSuccess={handleSuccess} />}
      {selectedSeat && activeModal === "remove"  && <RemoveModal      seat={selectedSeat} onClose={handleClose} onSuccess={handleSuccess} />}
      {selectedSeat && activeModal === "replace" && <ReplaceModal     seat={selectedSeat} onClose={handleClose} onSuccess={handleSuccess} />}
      {selectedSeat && activeModal === "view"    && <ViewStudentModal seat={selectedSeat} onClose={handleClose} />}
      {selectedSeat && activeModal === "edit"    && <EditStudentModal seat={selectedSeat} onClose={handleClose} onSuccess={handleSuccess} />}

    </div>
  );
};

export default SeatsSection;