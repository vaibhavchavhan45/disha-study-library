const GoogleMaps = ({ href = "#" }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <button className="w-[36px] h-[36px] flex items-center justify-center border-none bg-transparent relative rounded-[7px] cursor-pointer group">
        <span className="w-full h-full flex items-center justify-center border border-white/30 rounded-[10px] relative z-10 bg-white backdrop-blur-sm transition-all duration-300 group-hover:bg-white group-active:bg-white">
          <svg
            viewBox="0 0 92 92"
            className="w-[26px] h-[26px]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M46 4C28.4 4 14 18.4 14 36c0 10.6 5 20 12.7 26.1L46 88l19.3-25.9C73 56 78 46.6 78 36 78 18.4 63.6 4 46 4z"
              fill="#34A853"
            />
            <path
              d="M46 4c9.6 0 18.3 4 24.6 10.4L46 36 32.8 14.8C37 7.6 43.2 4 46 4z"
              fill="#4285F4"
            />
            <path
              d="M14 36c0-10.2 4.4-19.4 11.4-25.8L46 36H14z"
              fill="#EA4335"
            />
            <path
              d="M14 36c0 6.6 2 12.7 5.4 17.8L46 36H14z"
              fill="#FBBC04"
            />
            <path
              d="M70.6 14.4C74.8 19.8 78 27.6 78 36H46L70.6 14.4z"
              fill="#4285F4"
              opacity="0.85"
            />
            <circle cx="46" cy="36" r="12" fill="white" />
          </svg>
        </span>

        <span
          className="absolute w-full h-full rounded-[9px] z-0 pointer-events-none transition-all duration-300 group-hover:rotate-[35deg] group-active:rotate-[35deg] origin-bottom"
          style={{
            background:
              "linear-gradient(45deg, #4285F4 0%, #34A853 35%, #FBBC04 70%, #EA4335 100%)",
          }}
        />
      </button>
    </a>
  );
};

export default GoogleMaps;