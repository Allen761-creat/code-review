import "prismjs/themes/prism-tomorrow.css";
import prism from "prismjs";
import Editor from "react-simple-code-editor";
import { useEffect, useState } from "react";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
// import remarkGfm from "remark-gfm";
import "highlight.js/styles/github-dark.css";

const App = () => {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  useEffect(() => {
    prism.highlightAll();
  }, []);

  const review = async () => {
    try {
      setOutput("")
      const { data } = await axios.post("http://localhost:1111/ai/getreview", { code });
    setOutput(data);
    } catch (error) {
      console.error("Error fetching review:", error);
    }
   
  };

  return (
    <div>
      <main className="bg-black absolute w-screen flex xs:flex-col lg:flex-row h-screen m-0 p-0 justify-evenly items-center">
        {/* ✅ Code Editor Section */}

        <div style={{ borderRadius: "10px" }} className="lg:h-[94%] xs:h-[47%] xs:gap-1 xs:w-[97%] relative lg:w-[48%] bg-[#202124]">
          <div className="h-full overflow-auto" style={{ border: "2px solid white", borderRadius: "10px", scrollbarWidth: "none", msOverflowStyle: "none", }}>
            <Editor
              className="placeholder-custom"
              value={code}
              onValueChange={(value) => setCode(value)}
              highlight={(code) => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              placeholder="TYPE YOUR CODE HERE"
              style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: 16,
                lineHeight: 1.4,
                width: "100%",
                minHeight: "100%",
                color: "white",
                backgroundColor: "#202124",
                overflow: "auto",


              }}
            />

          </div>
          <button onClick={review} className="rounded-md w-[100px] absolute bottom-3 right-3 hover:bg-[#ffffffc3] h-10 text-[20px] bg-white">
            REVIEW
          </button>
        </div>

        {/* ✅ Markdown Output Section */}
        <div style={{
          borderRadius: "10px", border: "2px solid white",
          scrollbarWidth: "none",
          msOverflowStyle: "none"
        }} className="lg:h-[94%] lg:w-[48%] xs:gap-1 xs:w-[97%] xs:h-[47%] xs:p-1 text-[17px]  overflow-auto scrollbar-hidden bg-gray-900 p-5 text-white">

          {
            output ? (
              <div className="p-3">
              <Markdown  rehypePlugins={[rehypeHighlight]}

                components={{
                  h1: ({ children }) => <h1 className="text-red-400 text-3xl font-bold">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-yellow-400 text-2xl font-semibold">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-green-400 text-xl font-medium">{children}</h3>,
                  strong: ({ children }) => <strong className="text-blue-400">{children}</strong>,
                  pre: ({ children }) => <pre className="bg-gray-800 p-3 rounded">{children}</pre>,
                  code: ({ className, children }) => (
                    <code className={`${className} text-yellow-300`}>{children}</code>
                  ),
                }}

              >
                {output}
              </Markdown>
              </div>

            ) : <div className="relative flex justify-center top-28 items-center">
              <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500" />
              <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className="rounded-full h-28 w-28" />
            </div>
          }




        </div>
      </main>
    </div>
  );
};

export default App;
