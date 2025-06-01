import React, { useState, useEffect } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

function App() {
  const [markdown, setMarkdown] = useState(`# Welcome to the Markdown Previewer!

## This is a subheading (H2)

**This text is bolded.**

> This is a blockquote — useful for highlighting key ideas.

Here's a [link to NASA](https://www.nasa.gov), where space exploration fuels innovation.

Inline code looks like this: \`const x = 42;\`

### Code block:
\`\`\`js
function greet(name) {
  return \`Hello, \${name}!\`;
}
\`\`\`

- List item one
- List item two
- List item three

![Markdown Logo](https://markdown-here.com/img/icon256.png)
`);

  const [wordCount, setWordCount] = useState(0);

  useEffect(() => {
    const wordsArray = markdown.trim().split(/\s+/);
    if (wordsArray[0] === "") {
      setWordCount(0);
    }
    else {
      setWordCount(wordsArray.length);
    }

  }, [markdown])

  const downloadMarkdown = () => {
    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "markdown-preview.md";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }


  const handleChange = (e) => {
    setMarkdown(e.target.value);
  };

  return (
    <div className="flex lg:flex-row flex-col gap-4 bg-[#0d1117] text-[#f0f6fc] w-screen h-screen p-2">
      <div
        id="textarea-outer"
        className="flex flex-col bg-[#151b23] flex-1 border rounded-md"
        style={{ height: "calc(100vh - 16px)" }}
      >
        <p className="h-[46px] font-bold flex items-center justify-between px-1.5 pr-5 border-b">
          <span className="p-1 px-2 rounded-md bg-black cursor-default">
            Editor
          </span>
          <button onClick={downloadMarkdown} className="p-1 px-2 rounded-md border bg-black cursor-pointer">Download Markdown</button>
          <span>Character count: {markdown.length}</span>
        </p>
        <textarea
          id="editor"
          className="bg-[#0d1117] resize-none focus:outline-none p-3.5 flex-1 overflow-auto roboto-mono-textarea"
          name="markdown"
          value={markdown}
          onChange={handleChange}
        ></textarea>
      </div>

      <div
        id="preview"
        className="flex flex-col flex-1 bg-[#151b23] overflow-auto border rounded-md"
        style={{ height: "calc(100vh - 16px)" }}
      >
        <p className="h-[46px] font-bold flex items-center pl-1.5 border-b justify-between pr-5">
          <span className="p-1 px-2 rounded-md bg-black cursor-default">
            Previewer
          </span>
          <span>Word count: {wordCount}</span>
        </p>
        <div className="markdown-body flex-1 overflow-auto p-3.5 bg-[#0d1117]">
          <Markdown
            remarkPlugins={[[remarkGfm, { singleTilde: false }]]}
          >
            {markdown}
          </Markdown>
        </div>
      </div>
    </div>
  );
}

export default App;