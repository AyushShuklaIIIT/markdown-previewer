const demoText = `# 📝 Markdown Previewer

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
`;

export default demoText;