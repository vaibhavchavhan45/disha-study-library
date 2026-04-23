import Facebook from "../../Components/Buttons/SocialIcons/Facebook";
import Instagram from "../../Components/Buttons/SocialIcons/Instagram";
import GoogleMaps from "../../Components/Buttons/SocialIcons/GoogleMaps";
import Mail from "../../Components/Buttons/SocialIcons/Mail";
import WhatsApp from "../../Components/Buttons/SocialIcons/Whatsapp";
import ContactInfoCard from "./ContactInfoCard";

export default function AdminContactSection() {
    return (
        <div className="mt-10 sm:mt-12 md:mt-16">
            {/* pill */}
            <div className="flex justify-center">
                <div className="inline-flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-[linear-gradient(135deg,rgba(255,255,255,0.10),rgba(255,255,255,0.03))] px-4 sm:px-5 py-2 backdrop-blur-md">
                    <span className="relative flex h-[5px] w-[5px] shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/50" />
                        <span className="relative inline-flex h-[5px] w-[5px] rounded-full bg-white/55" />
                    </span>
                    <p className="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.26em] text-white/58">
                        Visit &amp; Connect
                    </p>
                </div>
            </div>

            {/* ── PREMIUM GLASS CARD ── */}
            <div
                className="relative mt-5 sm:mt-7 overflow-hidden rounded-[24px] sm:rounded-[32px]"
                style={{
                    background:
                        "linear-gradient(160deg, rgba(255,255,255,0.075) 0%, rgba(255,255,255,0.032) 50%, rgba(255,255,255,0.015) 100%)",
                    border: "1px solid rgba(255,255,255,0.09)",
                    backdropFilter: "blur(40px) saturate(1.4)",
                    WebkitBackdropFilter: "blur(40px) saturate(1.4)",
                    boxShadow: [
                        "0 40px 100px rgba(0,0,0,0.45)",
                        "0 12px 32px rgba(0,0,0,0.28)",
                        "0 2px 8px rgba(0,0,0,0.20)",
                        "inset 0 1px 0 rgba(255,255,255,0.14)",
                        "inset 0 -1px 0 rgba(255,255,255,0.03)",
                    ].join(", "),
                }}
            >
                {/* top shimmer line */}
                <div
                    className="pointer-events-none absolute inset-x-0 top-0 h-px"
                    style={{
                        background:
                            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.30) 20%, rgba(255,255,255,0.30) 80%, transparent 100%)",
                    }}
                />

                {/* ambient inner glow */}
                <div
                    className="pointer-events-none absolute -top-32 -left-32 h-72 w-72 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 65%)",
                    }}
                />
                <div
                    className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full"
                    style={{
                        background:
                            "radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 65%)",
                    }}
                />

                {/* 3-col grid */}
                <div className="grid grid-cols-1 md:grid-cols-3">
                    {/* ── Address ── */}
                    <ContactInfoCard
                        label="Address"
                        title="Disha Study Center"
                        wrapperClassName="px-8 sm:px-10 md:px-8 lg:px-10 xl:px-12 pt-4 pb-3 md:py-8 lg:py-9"
                        titleTracking="tracking-[-0.025em]"
                    >
                        <p
                            className="mt-3 text-[14px] leading-[1.6] md:text-[14.5px] md:leading-[1.75] font-medium flex flex-wrap justify-center items-center gap-x-2 gap-y-1"
                            style={{ color: "rgba(255,255,255,0.62)" }}
                        >
                            <span>Infront of SBI</span>
                            <span className="text-white/20">•</span>
                            <span>Shivneri Square, Arni</span>
                            <span className="text-white/20">•</span>
                            <span>Tq. Arni, Dist. Yavatmal</span>
                            <span className="text-white/20">•</span>
                            <span>Maharashtra – 445103</span>
                        </p>

                        <a
                            href="https://maps.app.goo.gl/WsKeVkoHkNcRDVPa7"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group mt-5 inline-flex items-center gap-3 transition-all duration-300"
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(-1px)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform =
                                    "translateY(0px)";
                            }}
                        >
                            <div className="relative h-10 w-10 shrink-0">
                                <svg
                                    viewBox="0 0 64 64"
                                    className="h-full w-full"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M8 12C8 9.8 9.8 8 12 8H36L56 28V52C56 54.2 54.2 56 52 56H12C9.8 56 8 54.2 8 52V12Z"
                                        fill="#22A861"
                                    />
                                    <path
                                        d="M10 52L34 28L40 34L16 58C12.7 58 10 55.3 10 52Z"
                                        fill="#F4C20D"
                                    />
                                    <path
                                        d="M16 58L40 34L56 50V52C56 54.2 54.2 56 52 56H16Z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M34 28L40 34L56 50V28H36L34 28Z"
                                        fill="#EDEDED"
                                    />
                                    <path
                                        d="M40 34L56 50V42L46 32L40 34Z"
                                        fill="#D5D5D5"
                                    />
                                    <path
                                        d="M22 17.5C17.3 17.5 13.5 21.3 13.5 26C13.5 30.7 17.3 34.5 22 34.5C25.6 34.5 28.7 32.3 29.9 29.1H22V24.8H34.5C34.6 25.5 34.7 26.2 34.7 27C34.7 35 29.3 40.5 22 40.5C14 40.5 7.5 34 7.5 26C7.5 18 14 11.5 22 11.5C25.9 11.5 29.1 12.9 31.5 15.2L27.8 18.9C26.4 17.9 24.5 17.5 22 17.5Z"
                                        fill="white"
                                        transform="translate(4 2) scale(0.7)"
                                    />
                                    <path
                                        d="M44 4C35.7 4 29 10.7 29 19C29 30.5 44 45 44 45C44 45 59 30.5 59 19C59 10.7 52.3 4 44 4Z"
                                        fill="#EA4335"
                                    />
                                    <circle
                                        cx="44"
                                        cy="19"
                                        r="4.5"
                                        fill="#8E2A22"
                                    />
                                </svg>
                            </div>

                            <span
                                className="text-[14px] sm:text-[15px] font-semibold tracking-[-0.012em] leading-none transition-all duration-300 group-hover:translate-x-[1px]"
                                style={{
                                    background:
                                        "linear-gradient(90deg, #4285F4 0%, #34A853 38%, #EA4335 72%)",
                                    WebkitBackgroundClip: "text",
                                    WebkitTextFillColor: "transparent",
                                    textShadow:
                                        "0 1px 10px rgba(66,133,244,0.08)",
                                }}
                            >
                                Get Directions
                            </span>
                        </a>
                    </ContactInfoCard>

                    {/* mobile divider */}
                    <div
                        className="md:hidden h-px mx-8 sm:mx-10"
                        style={{
                            background:
                                "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 20%, rgba(255,255,255,0.07) 80%, transparent)",
                        }}
                    />

                    {/* ── Contact ── */}
                    <ContactInfoCard
                        label="Contact"
                        title="Admin Contacts"
                        wrapperClassName="px-6 sm:px-8 md:px-8 lg:px-10 xl:px-12 py-3 md:py-8 lg:py-9"
                        titleTracking="tracking-[-0.03em]"
                    >
                        <div className="mt-4 flex w-full max-w-[280px] flex-col gap-3 md:gap-4">
                            <div className="flex items-center justify-between gap-3 sm:gap-4 md:flex-col md:items-center md:justify-center">
                                <p className="text-[13.5px] sm:text-[14px] md:text-[15px] font-semibold tracking-[-0.01em] text-white/88 whitespace-nowrap">
                                    VIVEK RATHOD
                                </p>

                                <div className="flex items-center gap-3 sm:gap-3.5 md:gap-4">
                                    <WhatsApp href="https://wa.me/919325640256?text=Hello%20Admin%2C%20I%20would%20like%20to%20get%20information%20regarding%20admission%20at%20Disha%20Library." />
                                    <span className="text-[13px] sm:text-[13.5px] md:mt-1 md:text-[14px] font-medium tracking-[0.01em] text-white/55">
                                        +91 93256 40256
                                    </span>
                                </div>
                            </div>

                            <div
                                className="mx-auto h-px w-20 md:w-16"
                                style={{
                                    background:
                                        "linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent)",
                                }}
                            />

                            <div className="flex items-center justify-between gap-3 sm:gap-4 md:flex-col md:items-center md:justify-center">
                                <p className="text-[13.5px] sm:text-[14px] md:text-[15px] font-semibold tracking-[-0.01em] text-white/88 whitespace-nowrap">
                                    AVINASH RATHOD
                                </p>

                                <div className="flex items-center gap-3 sm:gap-3.5 md:gap-4">
                                    <WhatsApp href="https://wa.me/919325640256?text=Hello%20Admin%2C%20I%20would%20like%20to%20get%20information%20regarding%20admission%20at%20Disha%20Library." />
                                    <span className="text-[13px] sm:text-[13.5px] md:mt-1 md:text-[14px] font-medium tracking-[0.01em] text-white/55">
                                        +91 80809 06525
                                    </span>
                                </div>
                            </div>
                        </div>
                    </ContactInfoCard>

                    {/* mobile divider */}
                    <div
                        className="md:hidden h-px mx-8 sm:mx-10"
                        style={{
                            background:
                                "linear-gradient(90deg, transparent, rgba(255,255,255,0.07) 20%, rgba(255,255,255,0.07) 80%, transparent)",
                        }}
                    />

                    {/* ── Social ── */}
                    <ContactInfoCard
                        label="Connect"
                        title="Stay in Touch"
                        wrapperClassName="px-8 sm:px-10 md:px-8 lg:px-10 xl:px-12 pt-4 pb-3 md:py-8 lg:py-9"
                        titleTracking="tracking-[-0.02em]"
                    >
                        <p className="hidden md:block mt-3 text-[13.5px] lg:text-[14px] leading-[1.75] text-white/46 max-w-[230px] lg:max-w-[240px]">
                            Follow us for updates and announcements.
                        </p>

                        <div className="mt-4 md:mt-5 flex items-center justify-center gap-4 sm:gap-5 lg:gap-6">
                            <Instagram href="https://instagram.com/dishastudycircle" />
                            <Facebook href="https://www.facebook.com/yourusername" />
                            <Mail href="https://mail.google.com/mail/?view=cm&fs=1&to=rathodvivek653@gmail.com&su=Inquiry%20about%20Disha%20Library&body=Hello%20Admin%2C%20I%20would%20like%20to%20inquire%20about%20Disha%20Library%20and%20would%20appreciate%20more%20information%20regarding%20admission%2C%20facilities%2C%20and%20membership%20details." />
                            <GoogleMaps href="https://maps.app.goo.gl/WsKeVkoHkNcRDVPa7" />
                        </div>
                    </ContactInfoCard>
                </div>

                {/* vertical divider — col 1 | 2 */}
                <div
                    className="pointer-events-none absolute inset-y-0 hidden md:block"
                    style={{
                        left: "33.333%",
                        width: "1px",
                        background:
                            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.07) 8%, rgba(255,255,255,0.07) 92%, transparent 100%)",
                    }}
                />

                {/* vertical divider — col 2 | 3 */}
                <div
                    className="pointer-events-none absolute inset-y-0 hidden md:block"
                    style={{
                        left: "66.666%",
                        width: "1px",
                        background:
                            "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.07) 8%, rgba(255,255,255,0.07) 92%, transparent 100%)",
                    }}
                />
            </div>
        </div>
    );
}