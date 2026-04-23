export default function AdminCard({ image, name, role, glowColor }) {
    return (
        <div className="relative flex flex-col items-center text-center">
            {/* subtle premium glow */}
            <div
                className={`pointer-events-none absolute top-10 h-[180px] w-[180px] sm:h-[230px] sm:w-[230px] rounded-full ${glowColor} blur-[90px] sm:blur-[110px]`}
            />

            {/* image card */}
            <div className="relative w-[155px] sm:w-[215px] md:w-[245px] lg:w-[265px] xl:w-[280px]">
                {/* premium outer frame */}
                <div className="relative rounded-[28px] sm:rounded-[34px] border border-white/15 bg-white/[0.07] p-[6px] sm:p-[7px] shadow-[0_20px_65px_rgba(0,0,0,0.30)] backdrop-blur-xl ring-1 ring-white/10">
                    {/* inner image wrapper */}
                    <div className="relative overflow-hidden rounded-[24px] sm:rounded-[30px]">
                        <img
                            src={image}
                            alt={name}
                            className="h-[210px] sm:h-[290px] md:h-[325px] lg:h-[350px] xl:h-[370px] w-full object-cover object-center"
                        />

                        {/* top glossy shine */}
                        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.20)_0%,rgba(255,255,255,0.06)_18%,rgba(0,0,0,0)_42%,rgba(0,0,0,0.28)_100%)]" />

                        {/* inner edge highlight */}
                        <div className="pointer-events-none absolute inset-0 rounded-[24px] sm:rounded-[30px] ring-1 ring-inset ring-white/10" />
                    </div>
                </div>
            </div>

            {/* label */}
            <div className="mt-4 sm:mt-5 inline-flex rounded-full border border-white/[0.08] bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05))] px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-md shadow-[0_8px_24px_rgba(0,0,0,0.16)]">
                <p className="text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.24em] sm:tracking-[0.28em] text-white/70">
                    Admin
                </p>
            </div>

            {/* name */}
            <h3
                className="mt-3 sm:mt-4 text-[18px] sm:text-[27px] md:text-[30px] lg:text-[32px] font-semibold tracking-[-0.03em] leading-tight"
                style={{
                    background:
                        "linear-gradient(90deg, #FFFFFF 0%, #E8ECFF 45%, #C9D6FF 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    textShadow: "0 1px 14px rgba(120,160,255,0.08)",
                }}
            >
                {name}
            </h3>

            {/* role */}
            <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-[14px] font-medium tracking-[0.16em] sm:tracking-[0.22em] uppercase text-white/42">
                {role}
            </p>
        </div>
    );
}