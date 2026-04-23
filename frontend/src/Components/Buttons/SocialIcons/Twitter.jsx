const Twitter = ({ href = "#" }) => {
  return (
  <a href={href} target="_blank" rel="noopener noreferrer">
    <button className="w-[36px] h-[36px] flex items-center justify-center border-none bg-transparent relative rounded-[7px] cursor-pointer group">
      <span className="w-full h-full flex items-center justify-center border border-white/30 rounded-[10px] relative z-10 bg-transparent backdrop-blur-sm transition-all duration-300 group-hover:bg-white/10 group-active:bg-white/10">
        <svg fill="white" viewBox="0 0 512 512" height="1.2em" xmlns="http://www.w3.org/2000/svg">
          <path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8l164.9-188.5L26.8 48h145.6l100.5 132.9L389.2 48zm-24.8 373.8h39.1L151.1 88h-42l255.3 333.8z" />
        </svg>
      </span>
      <span
        className="absolute w-full h-full rounded-[9px] z-0 pointer-events-none transition-all duration-300 group-hover:rotate-[35deg] group-active:rotate-[35deg] origin-bottom"
        style={{ background: "linear-gradient(45deg, #141414 0%, #3a3a3a 100%)" }}
      />
    </button>
    </a>
  );
};

export default Twitter;