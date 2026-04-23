import logo2 from "../assets/logo2.png";
import self from "../assets/self/self.png"
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Instagram from "../Components/Buttons/SocialIcons/Instagram"
import Facebook from "../Components/Buttons/SocialIcons/Facebook"
import Mail from "../Components/Buttons/SocialIcons/Mail"
import GoogleMaps from "../Components/Buttons/SocialIcons/GoogleMaps"


export default function Footer({ quickLinks = [] }) {
  const navigate = useNavigate();
  const location = useLocation();

  //route to Top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <footer
      className="w-full border-t border-white/10"
      style={{
        background: "radial-gradient(ellipse 40% 40% at 0% 0%, #0d2b2e 0%, #0e0e14 60%, #0e0e14 100%)"
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-6">

        {/* Top Section */}
        <div className="flex flex-col xl:grid xl:grid-cols-[2.5fr_1fr_1fr_1fr] gap-10 mb-12">

          {/* Brand */}
          <div className="xl:pr-20 flex flex-col items-center text-center md:items-center md:text-center xl:items-start xl:text-left md:mb-6 xl:mb-0">
            <div className="flex items-center gap-3 mb-4">
              <img src={logo2} alt="logo" className="w-10 h-10 rounded-xl object-cover shrink-0" />
              <div className="flex items-baseline gap-2">
                <span className="text-white text-xl font-black">Disha</span>
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{
                    background: "linear-gradient(90deg, #67e8f9, #818cf8, #be185d)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent"
                  }}
                >
                  Study Center
                </span>
              </div>
            </div>

            <p className="text-white/50 text-sm leading-relaxed text-center xl:text-justify max-w-[300px] md:max-w-[420px] xl:max-w-[260px]" style={{ wordSpacing: "0.1em" }}>
              A quiet and focused library space in Nagpur, built for students who value consistency, deep focus, and a calm distraction-free environment to study and grow every single day.
            </p>
          </div>

          {/* Mobile: Grid (1, 2, 1, hr & license) */}
          {/* md/lg: Grid(1, 3, hr & license) */}
          {/* xl: Grid(4, hr & license) */}
          <div className="flex flex-col md:grid md:grid-cols-3 xl:contents gap-10 md:px-10 xl:px-0">
            <div className="grid grid-cols-2 md:contents gap-6">
              {/* Quick Links */}
              <div className="flex flex-col items-center md:items-start xl:items-start">
                <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4 text-center md:text-left">Quick Links</h4>
                <ul className="space-y-3 flex flex-col items-center md:items-start">
                  {quickLinks.map((link) => (
                    <li key={link.label}>
                      <span
                        className="text-white/50 text-sm hover:text-white cursor-pointer transition-colors duration-200"
                        onClick={link.onClick}
                      >
                        {link.label}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div className="flex flex-col items-center md:items-start xl:items-start">
                <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4 text-center md:text-left">Legal</h4>
                <ul className="space-y-3 flex flex-col items-center md:items-start">
                  <li><span className="text-white/50 text-sm hover:text-white cursor-pointer transition-colors duration-200" onClick={() => { navigate("/privacy-policy"); window.scrollTo(0, 0); }}>Privacy Policy</span></li>
                  <li><span className="text-white/50 text-sm hover:text-white cursor-pointer transition-colors duration-200" onClick={() => { navigate("/terms-condition"); window.scrollTo(0, 0); }}>Terms & Conditions</span></li>
                </ul>
              </div>

            </div>

            {/* Contact Us */}
            <div className="flex flex-col items-center md:items-start xl:items-start">
              <h4 className="text-white font-semibold text-sm uppercase tracking-widest mb-4 text-center md:text-left">Contact Us</h4>
              <ul className="space-y-3 w-full flex flex-col items-center md:items-start">
                <li className="flex items-start justify-center md:justify-start gap-2 text-white/50 text-sm leading-7">
                  {/* Location Icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    className="shrink-0 mt-1"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                      fill="#EA4335"
                    />
                    <circle cx="12" cy="9" r="2.5" fill="white" />
                  </svg>

                  {/* Address */}
                  <span
                    className="leading-7 text-center [text-align-last:center] max-w-[240px] md:text-justify md:max-w-none md:[text-align-last:left]"
                  >
                    Infront of SBI, Shivneri Square, Arni, Tq. Arni, Dist. Yavatmal, Maharashtra 445103
                  </span>
                </li>

                {/* Phone */}
                <li className="flex items-start justify-center md:justify-start gap-2 text-white/50 text-sm leading-7 mt-2">
                  <span className="shrink-0 text-[16px] mt-1">📞</span>
                  <div className="flex flex-col lg:flex-row lg:items-center lg:gap-2">
                    <span className="whitespace-nowrap">+91 93256 40256</span>
                    <span className="hidden lg:inline">|</span>
                    <span className="whitespace-nowrap">+91 80809 06525</span>
                  </div>
                </li>
                <li className="flex gap-7 mt-6 justify-center md:justify-start">
                  <Instagram href="https://instagram.com/dishastudycircle" />
                  <Facebook href="https://www.facebook.com/yourusername" />
                  <Mail href="https://mail.google.com/mail/?view=cm&fs=1&to=rathodvivek653@gmail.com&su=Inquiry%20about%20Disha%20Library&body=Hello%20Admin%2C%20I%20would%20like%20to%20inquire%20about%20Disha%20Library%20and%20would%20appreciate%20more%20information%20regarding%20admission%2C%20facilities%2C%20and%20membership%20details." />
                  <GoogleMaps href="https://maps.app.goo.gl/WsKeVkoHkNcRDVPa7" />
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} Disha. All rights reserved.</p>

          <button
            onClick={() => {
              if (location.pathname === "/dev") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              } else {
                navigate("/dev");
              }
            }}
            className="flex items-center gap-3 text-white/60 transition-all duration-300 cursor-pointer"
            onMouseEnter={(e) => {
              e.currentTarget.style.textShadow = "0 0 16px rgba(103,232,249,0.9)";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textShadow = "none";
              e.currentTarget.style.color = "rgba(255,255,255,0.6)";
            }}
          >
            <img src={self} alt="Vaibhav" className="w-10 h-10 rounded-full object-cover border border-white/20 mr-2" />
            <div className="flex flex-col justify-center">
              <span className="text-xs tracking-wide leading-none">
                Designed and Developed by
              </span>
              <span
                className="leading-none mt-1 -ml-[4px]"
                style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "1.1rem" }}
              >
                Vaibhav Chavhan
              </span>
            </div>
          </button>

          <p className="text-white/30 text-xs">Made with ❤️</p>
        </div>

      </div>
    </footer>
  );
}