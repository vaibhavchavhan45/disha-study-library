import NeonText from "../Element/NeonText/NeonText";
import SingleInputField from "../Element/SingleInputField/SingleInputField";
import CyberPlayButton from "../Buttons/CyberPlayButton/CyberPlayButton";
import useDeveloperMessage from "../../Hooks/useDeveloperMessage";
import SectionDivider from "../Element/SectionDivider/SectionDivider";

export default function DeveloperMessageSection() {
  const {
    name,
    message,
    messageType,
    trimmedName,
    busy,
    handleNameChange,
    handleClick,
    handleKeyDown,
    formatName,
  } = useDeveloperMessage();

  return (
    <section className="mt-7 px-4 text-center sm:mt-8 sm:px-6 md:mt-10 lg:mt-12 lg:px-8">
      <h2 className="mb-10 flex items-end justify-center gap-4 text-center md:gap-5">
          <span className="pb-[2px] text-[1.6rem] font-semibold leading-none tracking-[0.01em] text-white/95 md:text-[1.9rem] lg:text-[2.2rem]">
            Developer's
          </span>

          <NeonText className="text-[2rem] leading-none tracking-[0.06em] md:text-[2.5rem] md:tracking-[0.08em] lg:text-[3rem]">
            Note
          </NeonText>
        </h2>

      <div className="mx-auto flex w-full flex-col items-center">
        <SingleInputField
          value={name}
          onChange={handleNameChange}
          onKeyDown={handleKeyDown}
          enterText="ENTER"
          nameText="YOUR NAME"
        />

        <div className="mt-10 flex justify-center">
          <CyberPlayButton onClick={handleClick} disabled={!trimmedName || busy}>
            <span className="px-4 text-white/95 tracking-[0.12em]">
              P L A Y
            </span>
          </CyberPlayButton>
        </div>

          {/* loader on busyy state */}
        {busy && (
        <div className="mt-8 flex flex-col items-center gap-3">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rounded-full border-2 border-violet-500/20" />
            <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-violet-400 animate-spin" />
          </div>
          <p className="text-xs tracking-[0.2em] text-white/30 uppercase animate-pulse">
            Loading...
          </p>
        </div>
      )}

        {messageType === "success" && (
          <div className="mt-7 w-full px-4 pt-3 sm:px-6 md:pt-4 lg:pt-5">
            <div className="mx-auto max-w-[19rem] text-center sm:max-w-[24rem] md:max-w-[30rem] lg:max-w-4xl xl:max-w-4xl">

              {/* Line 1 */}
              <p className="leading-tight text-white sm:text-[1.03rem] md:text-[1.08rem] lg:text-[1.12rem]">
                <span className="mr-1 text-white/90 font-semibold">Hey, </span>
                <span className="bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-300 bg-clip-text text-[1.35em] font-semibold text-transparent md:text-[1.40em] lg:text-[1.7em]">
                  {formatName(trimmedName)}
                </span>
              </p>

              {/* Line 2 */}
              <p
                className="mt-1 font-semibold leading-[1.5] text-white
                           text-[1.02rem]
                           sm:text-[1.08rem]
                           md:text-[1.14rem]
                           lg:text-[1.18rem]"
              >
                {message}
              </p>
            </div>
          </div>
        )}

        {messageType === "error" && (
          <div className="mt-7 w-full px-4 sm:px-6">
            <div className="mx-auto max-w-[22rem] text-center sm:max-w-[26rem] md:max-w-[30rem] lg:max-w-[34rem]">
              <p className="leading-[1.9] text-[1rem] sm:text-[1.05rem] md:text-[1.08rem]">
                <span className="font-medium text-[#FF4D6D] drop-shadow-[0_0_8px_rgba(255,77,109,0.35)]">
                  {message}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>

      {/* HR */}
      <SectionDivider className="mt-16 sm:mt-20 md:mt-24 lg:mt-28" />
    </section>
  );
}