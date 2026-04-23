import SeatsSection from "../components/seats/SeatsSection";

const SeatsPage = () => (
  <div className="space-y-6">
    <div>
      <h1 className="text-2xl font-semibold text-gray-800">Seat Management</h1>
      <p className="text-sm text-gray-400 mt-1">View and manage all seat assignments across the library.</p>
    </div>
    <SeatsSection />
  </div>
);

export default SeatsPage;