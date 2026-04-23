const Linkeden = ({ href = "#" }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
    <button className="w-[36px] h-[36px] flex items-center justify-center border-none bg-transparent relative rounded-[7px] cursor-pointer group">
      <span className="w-full h-full flex items-center justify-center border border-white/30 rounded-[10px] relative z-10 bg-transparent backdrop-blur-sm transition-all duration-300 group-hover:bg-white/10 group-active:bg-white/10">
        <svg fill="white" viewBox="0 0 448 512" height="1.2em" xmlns="http://www.w3.org/2000/svg">
          <path d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z" />
        </svg>
      </span>
      <span
        className="absolute w-full h-full rounded-[9px] z-0 pointer-events-none transition-all duration-300 group-hover:rotate-[35deg] group-active:rotate-[35deg] origin-bottom"
        style={{ background: "linear-gradient(45deg, #0077b5 0%, #00a0dc 100%)" }}
      />
    </button>
    </a>
  );
};

export default Linkeden;