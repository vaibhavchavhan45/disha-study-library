import GithubStarButton from "../Buttons/GithubStarButton/GithubStarButton";
import "../../Styles/terminalStyling.css"

function TechStackTerminal() {
  return (
    <div className="border-t border-white/10 lg:w-[42%] lg:border-l lg:border-t-0">

      <div className="terminal-wrap px-4 py-5 text-[12.5px] leading-7 sm:px-6 sm:text-[13px]">

        {/* mobile header */}
        <div className="mb-5 flex justify-center lg:hidden">
          <p className="font-mono text-sm text-white/60 tracking-widest uppercase text-[11px]">terminal</p>
        </div>

        <p className="mb-5 text-center text-[10px] uppercase tracking-[0.2em] terminal-label">
          Latest Build
        </p>

        <div className="space-y-10">

          {/* CMD 1 — always visible */}
          <div>
            <p className="break-all">
              <span className="terminal-prompt-user">vaibhavchavhan45@dev</span>
              <span className="terminal-prompt-tilde"> ~ </span>
              <span className="terminal-prompt-pct">%</span>{" "}
              <span className="terminal-prompt-cmd">open fluxintel-ai</span>
            </p>
            <div className="mt-3 space-y-1.5 pl-1">
              <p>
                <span className="terminal-arrow mr-2">{">"}</span>
                <span className="terminal-label">project: </span>
                <span className="terminal-bold">FluxIntel AI</span>
              </p>
              <p>
                <span className="terminal-arrow mr-2">{">"}</span>
                <span className="terminal-value">AI that lets you chat with any YouTube video.</span>
              </p>
              <p>
                <span className="terminal-arrow mr-2">{">"}</span>
                <span className="terminal-label">live link: </span>
                {/* Working link */}
                {/* <a
                  href="https://fluxintel-ai.vercel.app"
                  target="_blank"
                  rel="noreferrer"
                  className="terminal-link font-medium"
                >
                  fluxintel-ai.vercel.app
                </a> */}

                {/* Disabled link */}
                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="terminal-link font-medium cursor-not-allowed"
                >
                  fluxintel-ai.in
              </a>
              </p>
            </div>
          </div>

          {/* CMD 2 — always visible */}
          <div>
            <p className="break-all">
              <span className="terminal-prompt-user">vaibhavchavhan45@dev</span>
              <span className="terminal-prompt-tilde"> ~ </span>
              <span className="terminal-prompt-pct">%</span>{" "}
              <span className="terminal-prompt-cmd">open source-code</span>
            </p>
            <div className="mt-3 space-y-1.5 pl-1">
              <p>
                <span className="terminal-arrow mr-2">{">"}</span>
                <span className="terminal-label">source code: </span>
                <a
                  href="https://github.com/vaibhavchavhan45/disha-study-library"
                  target="_blank"
                  rel="noreferrer"
                  className="terminal-link font-medium"
                >
                  vaibhavchavhan45.ai/github
                </a>
              </p>
            </div>
          </div>

          {/* CMD 3 — lg only */}
          <div className="terminal-section-hidden">
            <p className="break-all">
              <span className="terminal-prompt-user">vaibhavchavhan45@dev</span>
              <span className="terminal-prompt-tilde"> ~ </span>
              <span className="terminal-prompt-pct">%</span>{" "}
              <span className="terminal-prompt-cmd">show stack</span>
            </p>
            <div className="mt-3 space-y-1.5 pl-1">
              <p>
                <span className="terminal-arrow mr-2">{">"}</span>
                <span className="terminal-label">stack: </span>
                <span className="terminal-value">React, FastAPI, Node.js</span>
              </p>
              <p>
                <span className="terminal-arrow mr-2">{">"}</span>
                <span className="terminal-label">ORM: </span>
                <span className="terminal-value">SQLAlchemy</span>
              </p>
              <p>
                <span className="terminal-arrow mr-2">{">"}</span>
                <span className="terminal-label">language: </span>
                <span className="terminal-value">JavaScript, Python</span>
              </p>
            </div>
          </div>

          {/* CMD 4 — lg only */}
          <div className="terminal-section-hidden">
            <p className="break-all">
              <span className="terminal-prompt-user">vaibhavchavhan45@dev</span>
              <span className="terminal-prompt-tilde"> ~ </span>
              <span className="terminal-prompt-pct">%</span>{" "}
              <span className="terminal-prompt-cmd">inspect ai-system</span>
            </p>
            <div className="mt-3 space-y-1.5 pl-1">
              <p><span className="terminal-arrow mr-2">{">"}</span><span className="terminal-value">transcript → chunking → embeddings</span></p>
              <p><span className="terminal-arrow mr-2">{">"}</span><span className="terminal-value">vector store → retriever → reranker</span></p>
              <p><span className="terminal-arrow mr-2">{">"}</span><span className="terminal-value">chains → contextual answers</span></p>
            </div>
          </div>

          {/* CMD 5 — lg only */}
          <div className="terminal-section-hidden">
            <p className="break-all">
              <span className="terminal-prompt-user">vaibhavchavhan45@dev</span>
              <span className="terminal-prompt-tilde"> ~ </span>
              <span className="terminal-prompt-pct">%</span>{" "}
              <span className="terminal-prompt-cmd">status --now</span>
            </p>
            <div className="mt-3 space-y-1.5 pl-1">
              <p>
                <span className="terminal-arrow mr-2">{">"}</span>
                <span className="terminal-label">current focus: </span>
                <span className="terminal-value">RAG systems + Fullstack AI apps</span>
              </p>
            </div>
          </div>

        </div>

        <div className="mt-8 xl:mt-20 flex justify-center lg:mt-14">
          <GithubStarButton href="https://github.com/vaibhavchavhan45/disha-study-library" />
        </div>

      </div>
    </div>
  );
}

export default TechStackTerminal;