export default function SectionMiniHeader({ label }) {
    return (
        <div className="flex flex-col items-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.36em] text-white/28">
                {label}
            </p>
            <div className="mt-2 h-px w-12 rounded-full bg-white/10" />
        </div>
    );
}