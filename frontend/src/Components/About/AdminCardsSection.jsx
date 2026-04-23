import adminImg1 from "../../assets/admin/admin1.png";
import adminImg2 from "../../assets/admin/admin2.png";

import AdminCard from "./AdminCard";

export default function AdminCardsSection() {
    return (
        <div className="mx-auto max-w-5xl">
            {/* images */}
            <div className="grid grid-cols-2 gap-5 sm:gap-8 md:gap-12 lg:gap-16 justify-items-center items-start">
                <AdminCard
                    image={adminImg1}
                    name="VIVEK RATHOD"
                    role="Co-Founder"
                    glowColor="bg-cyan-400/12"
                />

                <AdminCard
                    image={adminImg2}
                    name="AVINASH RATHOD"
                    role="Co-Founder"
                    glowColor="bg-fuchsia-500/12"
                />
            </div>

            {/* shared description */}
            <div className="mx-auto mt-10 sm:mt-14 md:mt-16 max-w-4xl">
                {/* mobile single para */}
                <p className="block sm:hidden text-[14.5px] leading-[1.95] text-white/72 text-justify">
                    Disha Study Center was built with a shared vision to create a disciplined, calm, and thoughtfully designed space where students can study with clarity, consistency, and confidence. More than just a place to sit and study, it stands as an environment shaped by intention — where ambition feels natural, distractions are reduced, and daily effort turns into real growth over time.
                </p>

                {/* sm and above two paras */}
                <div className="hidden sm:block">
                    <p className="text-[16px] md:text-[17px] leading-[1.95] text-white/85 text-justify">
                        Disha Study Center was built with a shared vision to create a disciplined, calm, and thoughtfully designed space where students can study with clarity, consistency, and confidence. Every detail of the environment reflects a deeper commitment to helping learners stay focused, motivated, and connected to meaningful progress.
                    </p>

                    <p className="mt-5 text-[16px] md:text-[17px] leading-[1.95] text-white/85 text-justify">
                        More than just a place to sit and study, it stands as an environment shaped by intention where ambition feels natural, distractions are reduced, and daily effort turns into real growth over time.
                    </p>
                </div>
            </div>
        </div>
    );
}