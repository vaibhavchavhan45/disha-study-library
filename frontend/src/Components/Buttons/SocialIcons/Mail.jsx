const Mail = ({ href = "#" }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <button className="w-[36px] h-[36px] flex items-center justify-center border-none bg-transparent relative rounded-[7px] cursor-pointer group">
        <span className="w-full h-full flex items-center justify-center border border-white/30 rounded-[10px] relative z-10 bg-transparent backdrop-blur-sm transition-all duration-300 group-hover:bg-white/10 group-active:bg-white/10">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="1.4em">
            <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L12 9.548l8.073-6.055C21.69 2.28 24 3.434 24 5.457z" fill="#EA4335"/>
          </svg>
        </span>
        <span
          className="absolute w-full h-full rounded-[9px] z-0 pointer-events-none transition-all duration-300 group-hover:rotate-[35deg] group-active:rotate-[35deg] origin-bottom"
          style={{ background: "linear-gradient(45deg, #1a1a1a 0%, #2d2d2d 100%)" }}
        />
      </button>
    </a>
  );
};

export default Mail;