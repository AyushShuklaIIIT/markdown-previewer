
import React, { useState, useEffect, useRef, useCallback } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  }
}

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

  useEffect(() => {
    const saved = localStorage.getItem("markdown");
    if(saved) {
      setMarkdown(saved);
    }
  }, [])
  

  const fileInputRef = useRef();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.name.endsWith(".md")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMarkdown(e.target.result);
      };
      reader.readAsText(file);
    }
    else {
      alert("Please upload a valid .md file");
    }
  }

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

  const insertMarkdown = (prefix, suffix = "") => {
    const textarea = document.getElementById("editor");
    textarea.focus();
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const formattedText = `${prefix}${selectedText}${suffix}`;
    textarea.setRangeText(formattedText, start, end, "end");

    const event = new Event('input', {bubbles: true});
    textarea.dispatchEvent(event);
  }

  const saveToLocalStorage = useCallback(
    debounce((value) => {
      localStorage.setItem("markdown", value);
    }, 300),
    []
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setMarkdown(value);
    saveToLocalStorage(value);
  };

  return (
    <div className="flex lg:flex-row flex-col gap-4 bg-[#0d1117] text-[#f0f6fc] w-screen h-screen p-2">
      <div
        id="textarea-outer"
        className="flex flex-col bg-[#151b23] flex-1 border rounded-md"
        style={{ height: "calc(100vh - 16px)" }}
      >
        <p className="h-[46px] font-bold flex items-center justify-between px-1.5 pr-5 border-b relative">
          <span className="p-1 px-2 rounded-md bg-black cursor-default">
            Editor
          </span>
          <button onClick={downloadMarkdown} className="p-1 px-2 rounded-md border bg-black cursor-pointer">Download</button>
          <button onClick={handleUploadClick} className="p-1 px-2 rounded-md border bg-black cursor-pointer">Upload</button>
          <input type="file" ref={fileInputRef} accept=".md" onChange={handleFileChange} className="hidden" />
          <div className="absolute top-12 w-[95%] flex items-center justify-around backdrop-blur-sm p-1 rounded-md">
            <button onClick={() => insertMarkdown("**", "**")} className="cursor-pointer"><span className="material-symbols-outlined">format_bold</span></button>
            <button onClick={() => insertMarkdown("_", "_")} className="cursor-pointer"><span className="material-symbols-outlined">format_italic</span></button>
            <button onClick={() => insertMarkdown("`", "`")} className="cursor-pointer"><span className="material-symbols-outlined">code</span></button>
            <button onClick={() => insertMarkdown("\n```\n", "\n```")} className="cursor-pointer"><span className="material-symbols-outlined">code_blocks</span></button>
            <button onClick={() => insertMarkdown("[", "](https://)")} className="cursor-pointer">
              <span className="material-symbols-outlined">link</span>
            </button>
            <button onClick={() => insertMarkdown("> ")} className="cursor-pointer">BQ</button>
            <button onClick={() => insertMarkdown("- ")} className="cursor-pointer"><span className="material-symbols-outlined">format_list_bulleted</span></button>
          </div>
        </p>
        <textarea
          id="editor"
          className="bg-[#0d1117] resize-none focus:outline-none p-3.5 pt-11 flex-1 overflow-auto roboto-mono-textarea"
          name="markdown"
          value={markdown}
          onInput={handleChange}
        ></textarea>
        <p className="px-1 hidden md:block">Tip: To render text on the next line, use double space after the text before pressing 'Enter'</p>
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