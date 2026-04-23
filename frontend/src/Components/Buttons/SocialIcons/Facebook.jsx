const Facebook = ({ href = "#" }) => {
  return (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <button className="w-[36px] h-[36px] flex items-center justify-center border-none bg-transparent relative rounded-[7px] cursor-pointer group">
      <span className="w-full h-full flex items-center justify-center border border-white/30 rounded-[10px] relative z-10 bg-transparent backdrop-blur-sm transition-all duration-300 group-hover:bg-white/10 group-active:bg-white/10">
        <svg fill="white" viewBox="0 0 320 512" height="1.2em" xmlns="http://www.w3.org/2000/svg">
          <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
        </svg>
      </span>
      <span
        className="absolute w-full h-full rounded-[9px] z-0 pointer-events-none transition-all duration-300 group-hover:rotate-[35deg] group-active:rotate-[35deg] origin-bottom"
        style={{ background: "linear-gradient(45deg, #0062e0 0%, #19afff 100%)" }}
      />
    </button>
    </a>
  );
};

export default Facebook;