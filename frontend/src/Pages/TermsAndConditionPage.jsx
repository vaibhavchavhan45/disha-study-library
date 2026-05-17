import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { termsAndConditionsSections } from "../Data/termsAndConditionData";
import Footer from "../Components/Footer";
import Instagram from "../Components/Buttons/SocialIcons/Instagram";
import Facebook from "../Components/Buttons/SocialIcons/Facebook";
import Mail from "../Components/Buttons/SocialIcons/Mail";

export default function TermsAndConditions() {
  const navigate = useNavigate();

  const navItems = [
    { videoId: "1", label: "Home", onClick: () => navigate('/') },
  ];

  return (
    <div style={{ background: "radial-gradient(ellipse at top, #0f2d3d 0%, #09101f 40%, #060812 70%)" }} className="min-h-screen w-full">

      {/* Navbar */}
      <Navbar navItems={navItems} />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 sm:px-6 md:px-8 pt-22 md:pt-28 lg:pt-32 pb-20">

        <div className="mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-3 text-center lg:text-left">
            Terms & Conditions
          </h1>
          <p className="text-white/40 text-sm text-center lg:text-left">Last updated: March 2026</p>
          <div className="w-full border-t border-white/10 mt-4" />
        </div>

        {/* Intro */}
        <div className="mb-10">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Overview</p>
          <h2 className="text-white text-xl font-bold mb-3">Please Read Carefully</h2>
          <p className="text-white/60 text-sm leading-relaxed">
            By accessing or using Crystal's services, you agree to be bound by these Terms and Conditions. Please read them carefully before using our library space or website.
          </p>
        </div>

        {/* Sections */}
        {termsAndConditionsSections.map((section) => (
          <div key={section.number} className="mb-10 flex gap-6">
            <span className="text-white/10 text-4xl font-black shrink-0 leading-none">{section.number}</span>
            <div>
              <h2 className="text-white text-lg font-bold mb-2">{section.title}</h2>
              <p className="text-white/60 text-sm leading-relaxed mb-2 text-justify">{section.content}</p>
              {section.list && (
                <ul className="space-y-1 mt-2">
                  {section.list.map((item) => (
                    <li key={item} className="text-white/50 text-sm flex items-start gap-2">
                      <span className="text-white/20 mt-1">—</span> {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        ))}

        {/* Contact */}
        <div className="mt-12 p-6 rounded-2xl border border-white/10 bg-white/5">
          <p className="text-white/40 text-xs uppercase tracking-widest mb-2">Get in touch</p>
          <h2 className="text-white text-lg font-bold mb-4">Contact Us</h2>
          <ul className="space-y-2">
            <li className="text-white/60 text-sm">🏛️ Disha Study Library, Arni, Maharashtra, India</li>
            <li className="text-white/60 text-sm">📞 +91 93256 40256</li>
            <li className="text-white/60 text-sm">📞 +91 80809 06525</li>
            <li>
              <div className="flex gap-7 mt-6">
                <Instagram href="https://instagram.com/dishastudycircle" />
                <Facebook href="" />
                <Mail href="https://mail.google.com/mail/?view=cm&fs=1&to=rathodvivek653@gmail.com&su=Inquiry%20about%20Disha%20Library&body=Hello%20Admin%2C%20I%20would%20like%20to%20inquire%20about%20Disha%20Library%20and%20would%20appreciate%20more%20information%20regarding%20admission%2C%20facilities%2C%20and%20membership%20details." />
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Footer */}
      <Footer quickLinks={[
        { label: "Home", onClick: () => navigate("/") },
        { label: "About", onClick: () => navigate("/about") },
        { label: "Facilities", onClick: () => navigate("/facilities") },
        { label: "Gallery", onClick: () => navigate("/gallery") },
        { label: "Testimonials", onClick: () => navigate("/testimonial") },
      ]} />

    </div>
  );
}