const WhatsApp = ({ href = "#" }) => {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer">
      <button className="w-[20px] h-[20px] sm:w-[21px] sm:h-[21px] md:w-[22px] md:h-[22px] lg:w-[23px] lg:h-[23px] xl:w-[24px] xl:h-[24px] flex items-center justify-center border-none bg-transparent relative rounded-[5px] sm:rounded-[6px] cursor-pointer group shrink-0">
        
        <span className="w-full h-full flex items-center justify-center border border-white/20 rounded-[6px] sm:rounded-[7px] relative z-10 bg-transparent backdrop-blur-sm transition-all duration-300 group-hover:bg-white/10 group-active:bg-white/10">
          <svg
            fill="white"
            viewBox="0 0 448 512"
            className="h-[0.6em] sm:h-[0.62em] md:h-[0.66em] lg:h-[0.7em] xl:h-[0.72em]"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M380.9 97.1C339-6.1 215.5-31.2 123.5 29.3 37.1 86.3 4.2 197.4 44.1 290.7L0 480l194.3-43.5c88.1 47.1 197.8 16.5 250.4-70.7 54.7-90.5 33.7-206.7-63.8-268.7zM224.1 438.3c-31.1 0-61.6-8.4-88.2-24.2l-6.3-3.7-115.3 25.8 26.4-111.8-4.1-6.6c-52.5-84.3-27-195.1 57.2-247.7 84.2-52.5 195-27 247.6 57.2 52.5 84.2 27 195-57.2 247.6-28.7 17.9-61.7 27.4-95.1 27.4zm101.3-138.2c-5.5-2.8-32.8-16.2-37.9-18.1-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.5-14.4 18.1-17.6 21.8-3.2 3.7-6.5 4.2-12 .9-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.4 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.5-19.4 19-19.4 46.2s19.9 53.5 22.7 57.2c2.8 3.7 39.1 59.7 94.8 83.7 35.2 15.2 49 16.5 66.6 14 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.4-2.3-5.1-3.7-10.6-6.5z" />
          </svg>
        </span>

        <span
          className="absolute w-full h-full rounded-[6px] sm:rounded-[7px] z-0 pointer-events-none transition-all duration-300 group-hover:rotate-[35deg] group-active:rotate-[35deg] origin-bottom"
          style={{
            background: "linear-gradient(45deg, #25D366 0%, #128C7E 100%)",
          }}
        />
      </button>
    </a>
  );
};

export default WhatsApp;