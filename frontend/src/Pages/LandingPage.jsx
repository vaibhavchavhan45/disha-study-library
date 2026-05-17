import Navbar from "../Components/Navbar";
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LandingPageHeroSection from "../Components/Landing/LandingPageHeroSection";
import LandingPageFacilities from "../Components/Landing/LandingPageFacilities";
import LandingPageGallery from "../Components/Landing/LandingPageGallery";
import TestimonialsSection from "../Components/Landing/LandingPageTestimonials";
import CTASection from "../Components/CTA/CTASection";
import LandingPageFAQ from "../Components/Landing/LandingPageFAQ";
import Footer from "../Components/Footer"

import VoiceYourVerdict from "../Components/Verdict/VoiceYourVerdict";

function LandingPage() {
  const navigate = useNavigate();
  const location = useLocation();

// Scroll to section if navigated with scrollTo state
useEffect(() => {
  if (location.state?.scrollTo) {
    const target = location.state.scrollTo;
    window.history.replaceState({}, "");
    setTimeout(() => {
      const el = document.getElementById(target);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 35;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 100);
  }
}, [location.state?.scrollTo]);

  const navItems = [
    { id: "1", label: "About", onClick: () => navigate('/about') },
    { id: "2", label: "Facilities", onClick: () => navigate('/facilities') },
    { id: "3", label: "Gallery", onClick: () => navigate('/gallery') },
    { id: "4", label: "Testimonials", onClick: () => navigate('/testimonial') },
    { id: "5", label: "Admin", onClick: () => navigate('/admin') },
    { id: "6", label: "Creator", onClick: () => navigate('/dev') }
  ];

  return (
    <div className="bg-black min-h-screen">
      <Navbar navItems={navItems} />
      <LandingPageHeroSection />
      <LandingPageFacilities />
      <LandingPageGallery />
      <TestimonialsSection />
      <div id="join-form">
        <CTASection  />
      </div>
      <LandingPageFAQ />
      <VoiceYourVerdict />
      <Footer quickLinks={[
          { label: "About", onClick: () => navigate("/about") },
          { label: "Facilities", onClick: () => navigate("/facilities") },
          { label: "Gallery", onClick: () => navigate("/gallery") },
          { label: "Testimonials", onClick: () => navigate("/testimonial") },
        ]} />
    </div>
  );
}

export default LandingPage;