import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WhatsApp from "../Components/Buttons/SocialIcons/Whatsapp";
import Mail from "../Components/Buttons/SocialIcons/Mail";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const LANGUAGES = ["English", "हिंदी", "मराठी"];

const CONTENT = {
    English: {
        badge: "True Faces. Honest Stories.",
        heading1: "Real Stories Start Here",
        heading2: "Make It Yours",
        sub: "We’re building a space that reflects the people who study here, capturing real moments, meaningful experiences, and a community you belong to.",
        bodyTitle: "Want to be part of it?",
        body: "If you're a student at DISHA and would like to share your photo, we’d be happy to feature you on our website. Be part of the space you study in and help shape its story. It’s entirely your choice.",
        adminLabel: "Admin",
        adminName: "Vivek Rathod",
        adminDesc: "Drop a WhatsApp message",
        devLabel: "Developer",
        devName: "Vaibhav Chavhan",
        devDesc: "Send an email",
        note: "Your photo will only be added with your explicit consent.",
    },
    हिंदी: {
        badge: "सच्चे चेहरे। सच्ची कहानियाँ।",
        heading1: "यहीं से कहानियाँ शुरू होती हैं",
        heading2: "इसे अपना बनाइए",
        sub: "हम एक ऐसा स्थान बना रहे हैं जो यहाँ पढ़ने वाले छात्रों को दर्शाता है, जिसमें सच्चे पल, अनुभव और एक ऐसा समुदाय है जिसका आप हिस्सा हैं।", bodyTitle: "क्या आप इसका हिस्सा बनना चाहते हैं?",
        body: "यदि आप DISHA के छात्र हैं और अपनी फोटो साझा करना चाहते हैं, तो हम उसे अपनी वेबसाइट पर फीचर करना पसंद करेंगे। जिस जगह पर आप पढ़ते हैं, उसका हिस्सा बनें और उसकी कहानी को आकार दें। यह पूरी तरह आपकी पसंद है।",
        adminLabel: "Admin",
        adminName: "Vivek Rathod",
        adminDesc: "WhatsApp पर message करें",
        devLabel: "Developer",
        devName: "Vaibhav Chavhan",
        devDesc: "Email भेजें",
        note: "आपकी फोटो सिर्फ आपकी सहमति से ही लगाई जाएगी।",
    },
    मराठी: {
        badge: "खरे चेहरे. प्रामाणिक कथा.",
        heading1: "इथूनच कथा सुरू होतात",
        heading2: "त्यांना तुमचं बनवा",
        sub: "आम्ही अशी space तयार करत आहोत जी इथल्या विद्यार्थ्यांना प्रतिबिंबित करते, जिथे खरे क्षण, अनुभव आणि असा समुदाय आहे ज्याचा तुम्ही भाग आहात.",
        bodyTitle: "तुम्हाला त्याचा भाग व्हायचे आहे का?",
        body: "जर तुम्ही DISHA मधील विद्यार्थी असाल आणि तुमचा फोटो शेअर करू इच्छित असाल, तर आम्हाला तो आमच्या वेबसाइटवर फीचर करायला आवडेल. ज्या ठिकाणी तुम्ही शिकता, त्या जागेचा भाग बना आणि तिची कथा घडवा. हे पूर्णपणे तुमच्या निवडीवर आहे.",
        adminLabel: "Admin",
        adminName: "Vivek Rathod",
        adminDesc: "WhatsApp वर message करा",
        devLabel: "Developer",
        devName: "Vaibhav Chavhan",
        devDesc: "Email पाठवा",
        note: "तुमचा फोटो फक्त तुमच्या संमतीनेच लावला जाईल.",
    },
};


export default function PhotoRequestPage() {
    const navigate = useNavigate();
    const [lang, setLang] = useState("English");
    const c = CONTENT[lang];

    const navItems = [
        { id: "1", label: "Home", onClick: () => navigate("/") },
    ];

    return (
        <div
            style={{ background: "radial-gradient(ellipse at top, #0f2d3d 0%, #09101f 40%, #060812 70%)" }}
            className="min-h-screen w-full flex flex-col text-white"
        >
            <Navbar navItems={navItems} />

            <main className="flex-1 w-full max-w-2xl mx-auto px-5 sm:px-6 pt-32 pb-24">

                {/* Language Toggle */}
                <div className="flex justify-center mb-14">
                    <div className="flex gap-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-1 shadow-lg">
                        {LANGUAGES.map((l) => (
                            <button
                                key={l}
                                onClick={() => setLang(l)}
                                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${lang === l
                                    ? "bg-white text-black shadow-md"
                                    : "text-white/40 hover:text-white hover:bg-white/5"
                                    }`}
                            >
                                {l}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Badge */}
                <div className="flex justify-center mb-6">
                    <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-cyan-300/80 bg-white/[0.05] backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full shadow-[0_0_20px_rgba(34,211,238,0.15)]">
                        {c.badge}
                    </p>
                </div>

                {/* Heading */}
                <h1
                    className="text-center text-3xl sm:text-4xl md:text-5xl font-semibold leading-tight mb-6"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                    {c.heading1}
                    <br />
                    <span className="text-cyan-400">{c.heading2}</span>
                </h1>

                {/* Subtext */}
                <p className="text-center text-white/50 text-sm sm:text-base leading-relaxed mb-12 max-w-xl mx-auto">
                    {c.sub}
                </p>

                {/* Divider */}
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mx-auto mb-12" />

                {/* Body */}
                <div className="mb-14 text-center sm:text-left">
                    <h2
                        className="text-white/90 text-lg sm:text-xl font-semibold mb-3"
                        style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                        {c.bodyTitle}
                    </h2>
                    <p className="text-white/50 text-sm sm:text-base leading-relaxed max-w-xl">
                        {c.body}
                    </p>
                </div>

                {/* Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">

                    {/* Admin */}
                    <div className="bg-white/[0.04] backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                        <WhatsApp href="https://wa.me/919325640256?text=Hello%2C%20I%20am%20a%20student%20at%20Disha%20Library%20and%20I%20would%20like%20to%20share%20my%20photo%20for%20the%20website." />
                        <div>
                            <p className="text-white/30 text-[10px] uppercase tracking-widest">{c.adminLabel}</p>
                            <p className="text-white text-sm font-medium">{c.adminName}</p>
                            <p className="text-white/40 text-xs mt-0.5">{c.adminDesc}</p>
                        </div>
                    </div>

                    {/* Developer */}
                    <div className="bg-white/[0.04] backdrop-blur-lg border border-white/10 rounded-2xl p-6 flex items-center gap-4">
                        <Mail href="https://mail.google.com/mail/?view=cm&fs=1&to=chavhanvaibhav708@gmail.com&su=Photo%20for%20Disha%20Library%20Website&body=Hello%2C%20I%20am%20a%20student%20at%20Disha%20Library%20and%20I%20would%20like%20to%20share%20my%20photo%20for%20the%20website." />
                        <div>
                            <p className="text-white/30 text-[10px] uppercase tracking-widest">{c.devLabel}</p>
                            <p className="text-white text-sm font-medium">{c.devName}</p>
                            <p className="text-white/40 text-xs mt-0.5">{c.devDesc}</p>
                        </div>
                    </div>

                </div>

                {/* Note */}
                <p className="text-center text-white/25 text-xs tracking-wide">
                    🔒 {c.note}
                </p>

            </main>

            <Footer quickLinks={[
                { label: "About", onClick: () => navigate("/about") },
                { label: "Facilities", onClick: () => navigate("/facilities") },
                { label: "Gallery", onClick: () => navigate("/gallery") },
                { label: "Testimonials", onClick: () => navigate("/testimonial") },
            ]} />
        </div>
    );
}