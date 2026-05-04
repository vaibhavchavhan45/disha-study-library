import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

// Public Pages
import LandingPage from "./Pages/LandingPage";
import FacilitiesPage from "./Pages/FacilitiesPage";
import GalleryPage from "./Pages/GalleryPage";
import PrivacyPolicyPage from "./Pages/PrivacyPolicyPage";
import TermsAndConditionPage from "./Pages/TermsAndConditionPage";
import TestimonialPage from "./Pages/TestimonialPage";
import DevPage from "./Pages/DevPage";
import NotFoundPage from "./Pages/NotFoundPage";
import AboutPage from "./Pages/AboutPage";
import PhotoRequestPage from "./Pages/PhotoRequestPage";

// Admin Pages
import AdminLogin from "./admin/pages/AdminLogin";
import AdminForgotPassword from "./admin/pages/AdminForgotPassword";
import AdminDashboard from "./admin/pages/AdminDashboard";
import SeatsPage from "./admin/pages/SeatsPage";
import WaitingPage from "./admin/pages/WaitingPage";
import InquiriesPage from "./admin/pages/InquiriesPage";
import ExStudentsPage from "./admin/pages/ExStudentsPage";

// Admin Auth & Layout
import ProtectedAdminRoute from "./admin/routes/ProtectedAdminRoute";
import AdminLayout from "./admin/layouts/AdminLayout";

const FloatingPhotoBtn = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  if (isAdminRoute) return null;

  return (
    <button
      onClick={() => navigate("/photo-request")}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/15 text-white/70 hover:text-white text-xs font-medium px-4 py-2.5 rounded-full shadow-lg transition-all duration-200"
    >
      📸 Feature Your Photo
    </button>
  );
};

function App() {
  return (
    <BrowserRouter>

      <FloatingPhotoBtn />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/facilities" element={<FacilitiesPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/testimonial" element={<TestimonialPage />} />
        <Route path="/dev" element={<DevPage />} />
        <Route path="/photo-request" element={<PhotoRequestPage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-condition" element={<TermsAndConditionPage />} />

        {/* Admin Auth */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />

        {/* Admin Protected */}
        <Route
          path="/admin"
          element={
            <ProtectedAdminRoute>
              <AdminLayout />
            </ProtectedAdminRoute>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="seats" element={<SeatsPage />} />
          <Route path="waiting" element={<WaitingPage />} />
          <Route path="inquiries" element={<InquiriesPage />} />
          <Route path="ex-students" element={<ExStudentsPage />} />
          <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;