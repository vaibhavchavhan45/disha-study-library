import AboutAdminSection from "../Components/About/AboutAdminSection";
import AboutHeroSection from "../Components/About/AboutHeroSection";
import VisionMissionSection from "../Components/About/VisionMission";
import Footer from "../Components/Footer";
import { useNavigate } from "react-router-dom";

export default function AboutPage() {
    const navigate = useNavigate()
  
    return (
        <div>
           <AboutHeroSection /> 
           <AboutAdminSection />
           <VisionMissionSection />
           <Footer
                   quickLinks={[
                     { label: "Home",       onClick: () => navigate("/") },
                     { label: "Facilities", onClick: () => navigate("/facilities") },
                     { label: "Gallery",    onClick: () => navigate("/gallery") },
                     { label: "Testimonials", onClick: () => navigate("/testimonial") },
                   ]} 
            />
        </div>
    )
}