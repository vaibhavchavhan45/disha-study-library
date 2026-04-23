import { FaJsSquare } from "react-icons/fa";
import { techStack } from "../../Data/TechStack";
import "../../Styles/techstackLeft.css"

export default function TechStackLeft() {
  let lineNumber = 1;
  let itemNumber = 1;

  return (
    <div className="w-full lg:w-[58%]">

      {/* Tab bar — mobile */}
      <div className="tab-bar px-3 py-0 sm:px-5 lg:hidden">
        <div className="flex items-end gap-1">
          <div className="active-tab flex items-center gap-2 px-4 py-2.5 font-mono text-[12px]">
            <FaJsSquare className="text-yellow-300 text-[13px]" />
            <span>techStack.js</span>
          </div>
        </div>
      </div>

      {/* Code body */}
      <div className="editor-scrollbar overflow-x-auto px-0 py-5 sm:py-6">
        <div className="code-wrap min-w-[640px] text-[12.5px] leading-[1.7] sm:min-w-[720px] sm:text-[13.5px] lg:text-[14px]">

          {/* Line: const techStack = [ */}
          <div className="code-line px-4 sm:px-6">
            <span className="line-num token-num w-8 select-none pr-4 text-right sm:w-10 sm:pr-5">
              {lineNumber++}
            </span>
            <div>
              <span className="token-keyword glow-violet">const</span>{" "}
              <span className="token-var glow-blue">techStack</span>{" "}
              <span className="token-op">=</span>{" "}
              <span className="token-bracket">[</span>
            </div>
          </div>

          {techStack.map((section) => (
            <div key={section.title}>

              {/* { */}
              <div className="code-line px-4 sm:px-6">
                <span className="line-num token-num w-8 select-none pr-4 text-right sm:w-10 sm:pr-5">
                  {lineNumber++}
                </span>
                <div className="pl-5 token-bracket sm:pl-7">{"{"}</div>
              </div>

              {/* title: "..." */}
              <div className="code-line px-4 sm:px-6">
                <span className="line-num token-num w-8 select-none pr-4 text-right sm:w-10 sm:pr-5">
                  {lineNumber++}
                </span>
                <div className="pl-10 sm:pl-14">
                  <span className="token-key glow-emerald">title</span>
                  <span className="token-op">:</span>{" "}
                  <span className="token-string glow-amber">"{section.title}"</span>
                  <span className="token-plain">,</span>
                </div>
              </div>

              {/* items: [ */}
              <div className="code-line px-4 sm:px-6">
                <span className="line-num token-num w-8 select-none pr-4 text-right sm:w-10 sm:pr-5">
                  {lineNumber++}
                </span>
                <div className="pl-10 sm:pl-14">
                  <span className="token-key glow-emerald">items</span>
                  <span className="token-op">:</span>{" "}
                  <span className="token-bracket">[</span>
                </div>
              </div>

              {/* each item */}
              {section.items.map((item) => {
                const Icon = item.icon;
                const currentItemNumber = itemNumber++;
                return (
                  <div className="code-line item-row px-4 sm:px-6" key={item.name}>
                    <span className="line-num token-num w-8 select-none pr-4 text-right sm:w-10 sm:pr-5">
                      {lineNumber++}
                    </span>
                    <div className="pl-[52px] sm:pl-[72px]">
                      <p className="flex items-center gap-2.5 sm:gap-3">
                        <span className="token-icon-num">{currentItemNumber}.</span>
                        <Icon className={`text-[14px] sm:text-[15px] ${item.color}`} style={{ filter: 'drop-shadow(0 0 6px currentColor)' }} />
                        <span className="token-plain">{item.name}</span>
                        <span className="token-op">,</span>
                      </p>
                    </div>
                  </div>
                );
              })}

              {/* ], */}
              <div className="code-line px-4 sm:px-6">
                <span className="line-num token-num w-8 select-none pr-4 text-right sm:w-10 sm:pr-5">
                  {lineNumber++}
                </span>
                <div className="pl-10 token-plain sm:pl-14">],</div>
              </div>

              {/* }, */}
              <div className="code-line px-4 sm:px-6">
                <span className="line-num token-num w-8 select-none pr-4 text-right sm:w-10 sm:pr-5">
                  {lineNumber++}
                </span>
                <div className="pl-5 token-bracket sm:pl-7">{"},"}</div>
              </div>

            </div>
          ))}

          {/* ]; */}
          <div className="code-line px-4 sm:px-6">
            <span className="line-num token-num w-8 select-none pr-4 text-right sm:w-10 sm:pr-5">
              {lineNumber++}
            </span>
            <div className="token-bracket">];</div>
          </div>

        </div>
      </div>
    </div>
  );
}

