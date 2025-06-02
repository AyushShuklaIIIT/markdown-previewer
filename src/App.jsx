import React, { useState, useEffect, useRef, useCallback } from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

function App() {
  const [markdown, setMarkdown] = useState(`# 📝 Markdown Previewer

A modern, responsive **Markdown Editor + Live Previewer** built with React.

Write Markdown, see the preview instantly, expand editor/previewer panes, and even save your work — all inside a sleek and user-friendly interface.

---

## ✨ Features

- 🪄 **Live Markdown Preview** using [\`react-markdown\`](https://github.com/remarkjs/react-markdown) and [\`remark-gfm\`](https://github.com/remarkjs/remark-gfm)
- 🔁 **Pane Expansion** - Focus mode for editor or preview
- 💾 **Auto Save to Local Storage** (with debounce)
- 📂 **Upload \`.md\` Files** directly into the editor
- 📥 **Download Markdown** to your system
- 🧠 **Word Count** Tracker
- 🧰 **Toolbar Formatting Shortcuts**  
  (Try bold, italic, headings, blockquotes, code, etc!)

---

## 🚀 Getting Started

\`\`\`bash
# Clone the repo
git clone https://github.com/AyushShuklaIIIT/markdown-previewer.git
cd markdown-previewer

# Install dependencies
npm install

# Start development server
npm run dev
\`\`\`

---

## 🧪 Tech Stack

- React
- Tailwind CSS
- react-markdown
- remark-gfm
- LocalStorage

---

## 🔤 Text Styling

### Headings

# H1  
## H2  
### H3  
#### H4  
##### H5  
###### H6

### Emphasis

- *Italic*  
- **Bold**  
- ***Bold & Italic***  
- ~~Strikethrough~~

### Quotes

> This is a blockquote.  
> Great for showing citations or notes.

---

## 🔢 Lists

### Ordered

1. First item  
2. Second item  
3. Third item

### Unordered

- Bullet 1  
- Bullet 2  
  - Nested bullet  
  - Another one

---

## 🔗 Links

[Visit my GitHub](https://github.com/AyushShuklaIIIT)

---

## 🔤 Code

### Inline Code

Here’s some inline code: \`const x = 42;\`

### Code Block

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}! 👋\`;
}
console.log(greet("Markdown World"));
\`\`\`

---

## 📊 Tables

| Feature         | Status  | Notes                      |
|-----------------|---------|----------------------------|
| Live Preview    | ✅      | Real-time updates          |
| Upload \`.md\`    | ✅      | Drag-and-drop supported    |
| Export Markdown | ✅      | Saves to \`.md\` file        |
| Word Count      | ✅      | Updates as you type        |
| Dark Mode       | 🚧      | Coming soon!               |

---

## 📦 Future Plans

- Real-time collaboration using Firebase or WebSockets
- Dark/light mode toggle 🌗
- Export to HTML or PDF
- Spellcheck & Markdown linting

---

## 🙋‍♂️ Author

**Ayush Shukla**  
Made with 💙 and caffeine.

GitHub: [@AyushShuklaIIIT](https://github.com/AyushShuklaIIIT)

---

## 🛡️ License

MIT License.  
Use it, fork it, improve it — just don't forget to give credit 😊

---

🧪 *Try editing this document! Everything updates live in the preview pane.*
`);

  const [wordCount, setWordCount] = useState(0);
  const [expandedPane, setExpandedPane] = useState(null);

  useEffect(() => {
    const wordsArray = markdown.trim().split(/\s+/);
    if (wordsArray[0] === "") {
      setWordCount(0);
    } else {
      setWordCount(wordsArray.length);
    }
  }, [markdown]);

  useEffect(() => {
    const saved = localStorage.getItem("markdown");
    if (saved) {
      setMarkdown(saved);
    }
  }, []);

  const fileInputRef = useRef();
  const editorRef = useRef();
  const previewerRef = useRef();

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file?.name?.endsWith(".md")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMarkdown(e.target.result);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid .md file");
    }
  };

  const handleFullEditor = () => {
    setExpandedPane((prev) => (prev === "editor" ? null : "editor"));
  };

  const handleFullPreviewer = () => {
    setExpandedPane((prev) => (prev === "previewer" ? null : "previewer"));
  };

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
  };

  const insertMarkdown = (prefix, suffix = "") => {
    const textarea = document.getElementById("editor");
    textarea.focus();
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = textarea.value.substring(start, end);
    const formattedText = `${prefix}${selectedText}${suffix}`;
    textarea.setRangeText(formattedText, start, end, "end");

    const event = new Event("input", { bubbles: true });
    textarea.dispatchEvent(event);
  };

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
        className={`flex flex-col bg-[#151b23] border rounded-md ${
          expandedPane === "previewer" ? "hidden" : "flex-1"
        }
        ${expandedPane === "editor" ? "flex-[3]" : ""}`}
        style={{ height: "calc(100vh - 16px)" }}
        ref={editorRef}
      >
        <div className="h-[46px] font-bold flex items-center justify-between px-1.5 pr-5 border-b relative">
          <div className="w-[90%] flex justify-between">
            <span className="p-1 px-2 rounded-md bg-black cursor-default">
              Editor
            </span>
            <button
              onClick={downloadMarkdown}
              className="p-1 px-2 rounded-md border bg-black cursor-pointer"
            >
              Download
            </button>
            <button
              onClick={handleUploadClick}
              className="p-1 px-2 rounded-md border bg-black cursor-pointer"
            >
              Upload
            </button>
            <input
              type="file"
              ref={fileInputRef}
              accept=".md"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
          <button className="cursor-pointer" onClick={handleFullEditor}>
            <span className="material-symbols-outlined">
              {expandedPane === "editor"
                ? "collapse_content"
                : "expand_content"}
            </span>
          </button>
          <div className="absolute top-12 w-[95%] flex items-center justify-around backdrop-blur-sm p-1 rounded-md">
            <button
              onClick={() => insertMarkdown("**", "**")}
              className="cursor-pointer"
            >
              <span className="material-symbols-outlined">format_bold</span>
            </button>
            <button
              onClick={() => insertMarkdown("_", "_")}
              className="cursor-pointer"
            >
              <span className="material-symbols-outlined">format_italic</span>
            </button>
            <button
              onClick={() => insertMarkdown("`", "`")}
              className="cursor-pointer"
            >
              <span className="material-symbols-outlined">code</span>
            </button>
            <button
              onClick={() => insertMarkdown("\n```\n", "\n```")}
              className="cursor-pointer"
            >
              <span className="material-symbols-outlined">code_blocks</span>
            </button>
            <button
              onClick={() => insertMarkdown("[", "](https://)")}
              className="cursor-pointer"
            >
              <span className="material-symbols-outlined">link</span>
            </button>
            <button
              onClick={() => insertMarkdown("> ")}
              className="cursor-pointer"
            >
              BQ
            </button>
            <button
              onClick={() => insertMarkdown("- ")}
              className="cursor-pointer"
            >
              <span className="material-symbols-outlined">
                format_list_bulleted
              </span>
            </button>
          </div>
        </div>
        <textarea
          id="editor"
          className="bg-[#0d1117] resize-none focus:outline-none p-3.5 pt-11 flex-1 overflow-auto roboto-mono-textarea text-sm"
          name="markdown"
          value={markdown}
          onInput={handleChange}
        ></textarea>
        <p className="px-1 hidden md:block">
          Tip: To render text on the next line, use double space after the text
          before pressing 'Enter'
        </p>
      </div>

      <div
        id="preview"
        className={`flex flex-col bg-[#151b23] overflow-auto border rounded-md ${
          expandedPane === "editor" ? "hidden" : "flex-1"
        }
        ${expandedPane === "previewer" ? "flex-[3]" : ""}`}
        style={{ height: "calc(100vh - 16px)" }}
        ref={previewerRef}
      >
        <div className="h-[46px] font-bold flex items-center pl-1.5 border-b justify-between pr-5">
          <div className="w-[90%] flex justify-between">
            <span className="p-1 px-2 rounded-md bg-black cursor-default">
              Previewer
            </span>
            <span>Word count: {wordCount}</span>
          </div>
          <button className="cursor-pointer" onClick={handleFullPreviewer}>
            <span className="material-symbols-outlined">
              {expandedPane === "previewer"
                ? "collapse_content"
                : "expand_content"}
            </span>
          </button>
        </div>
        <div className="markdown-body flex-1 overflow-auto p-3.5 bg-[#0d1117]">
          <Markdown
            remarkPlugins={[[remarkGfm, {singleTilde: false}]]}
            components={{
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || "");
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              },
            }}
          >
            {markdown}
          </Markdown>
        </div>
      </div>
    </div>
  );
}

export default App;
