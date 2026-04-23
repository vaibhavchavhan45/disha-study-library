import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getDashboardStatsApi } from "../services/dashboardApi";
import { clearAdminAuth } from "../utils/adminStorage";
import SeatsSection from "../components/seats/SeatsSection";
import { STAT_CARDS } from "../data/statCards";


const StatCard = ({ label, value, accent }) => (
  <div className={`bg-white rounded-2xl p-5 border-l-4 shadow-sm ${accent}`}>
    <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{label}</p>
    <p className="text-3xl font-bold text-gray-800">{value ?? "—"}</p>
  </div>
);

const Loader = () => (
  <div className="flex flex-col items-center justify-center py-32 gap-3">
    <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
    <p className="text-sm text-gray-400">Loading dashboard...</p>
  </div>
);

function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStatsApi();
        setStats(data.stats);
      } catch {
        setError(true);
        clearAdminAuth();
        navigate("/admin");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, [navigate]);

  return (
    <div className="space-y-8">

      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-800">Overview</h1>
        <p className="text-sm text-gray-400 mt-1">Live snapshot of the library.</p>
      </div>

      {/* Stats */}
      {loading ? (
        <Loader />
      ) : error ? null : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-4">
          {STAT_CARDS.map(({ key, label, accent }) => (
            <StatCard key={key} label={label} value={stats?.[key]} accent={accent} />
          ))}
        </div>
      )}

      {/* Divider */}
      {!loading && !error && (
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-2xl px-4 py-2 shadow-sm">
            <span className="text-yellow-400">✦</span>
            <span className="text-sm font-semibold text-gray-700">Seat Management</span>
          </div>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
      )}

      {/* Seat grid */}
      {!loading && !error && <SeatsSection />}

    </div>
  );
};

export default AdminDashboard;