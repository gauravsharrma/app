import React, { useState, useEffect } from 'react';

// This is to inform TypeScript about the 'marked' library loaded from the CDN
declare global {
  interface Window {
    marked: {
      // The parse function can be async in newer versions
      parse(markdown: string): string | Promise<string>;
    };
  }
}

const MarkdownReader: React.FC = () => {
  const [markdown, setMarkdown] = useState<string>(
    '# Hello, Markdown!\n\n' +
    'Paste or type your markdown content here to see it rendered live below.\n\n' +
    '## Basic Formatting\n\n' +
    'This is a paragraph with **bold text** and *italic text*.\n\n' +
    '### Bulleted List\n' +
    '- Item 1\n' +
    '- Item 2\n' +
    '  - Sub-item 2.1\n' +
    '  - Sub-item 2.2\n\n' +
    '### Numbered List\n' +
    '1. First item\n' +
    '2. Second item\n' +
    '3. Third item\n\n' +
    '### More\n' +
    '> This is a blockquote.\n\n' +
    'Here is some `inline code` for you.\n\n' +
    '```javascript\n' +
    '// And here is a code block\n' +
    'function greet() {\n' +
    '  console.log("Hello, world!");\n' +
    '}\n' +
    '```'
  );
  const [html, setHtml] = useState<string>('');
  const [fontSize, setFontSize] = useState<number>(16); // Default font size

  const increaseFontSize = () => setFontSize(prevSize => Math.min(prevSize + 2, 40));
  const decreaseFontSize = () => setFontSize(prevSize => Math.max(prevSize - 2, 8));

  useEffect(() => {
    const parseMarkdown = async () => {
      if (window.marked) {
        // Use await to handle the case where parse is async
        const parsedHtml = await window.marked.parse(markdown);
        setHtml(parsedHtml);
      }
    };
    
    parseMarkdown().catch(console.error);
  }, [markdown]);

  return (
    <div className="flex flex-col space-y-6 p-6">
      <h2 className="text-3xl font-bold text-white mb-2">Markdown Reader</h2>
      
      <div>
        <label htmlFor="markdown-input" className="text-white mb-2 font-semibold block">Markdown Input</label>
        <textarea
          id="markdown-input"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          className="w-full h-64 p-4 bg-black/30 text-white rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400 font-mono resize-y"
          placeholder="Type your markdown here..."
        />
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
            <label className="text-white font-semibold block">HTML Preview</label>
            <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-300 w-12 text-center">{fontSize}px</span>
                <button 
                    onClick={decreaseFontSize}
                    aria-label="Decrease font size"
                    className="w-8 h-8 flex items-center justify-center bg-black/40 rounded-md border border-white/20 text-lg hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                    -
                </button>
                <button 
                    onClick={increaseFontSize}
                    aria-label="Increase font size"
                    className="w-8 h-8 flex items-center justify-center bg-black/40 rounded-md border border-white/20 text-lg hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400"
                >
                    +
                </button>
            </div>
        </div>
        <div
          className="prose prose-invert max-w-none p-4 bg-black/30 rounded-lg border border-white/20 min-h-[16rem]"
          style={{ fontSize: `${fontSize}px` }}
          // Using dangerouslySetInnerHTML is safe here because the content is generated
          // client-side from the user's own input.
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
};

export default MarkdownReader;