import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface AIMessageRendererProps {
  content: string;
  className?: string;
}

export const AIMessageRenderer = ({ content, className }: AIMessageRendererProps) => {
  return (
    <div className={cn("prose prose-sm max-w-none", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings with professional styling - underlined and numbered appearance
          h1: ({ children }) => (
            <h1 className="text-xl font-bold text-foreground mt-5 mb-3 pb-2 border-b-2 border-primary first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-lg font-semibold text-foreground mt-5 mb-3 pb-1.5 border-b border-primary/40 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-base font-semibold text-foreground mt-4 mb-2 pb-1 border-b border-border/60 first:mt-0">
              {children}
            </h3>
          ),
          
          // Paragraphs with optimized typography
          p: ({ children }) => (
            <p className="text-[15px] leading-[1.75] tracking-[0.01em] text-black font-semibold mb-3 last:mb-0">
              {children}
            </p>
          ),
          
          // Bold text stands out
          strong: ({ children }) => (
            <strong className="font-bold text-black">{children}</strong>
          ),
          
          // Italic for emphasis
          em: ({ children }) => (
            <em className="italic text-black">{children}</em>
          ),
          
          // Professional unordered lists
          ul: ({ children }) => (
            <ul className="my-4 space-y-3 pl-0 list-none">{children}</ul>
          ),
          
          // Professional ordered lists with counter
          ol: ({ children }) => (
            <ol className="my-4 space-y-3 pl-0 list-none [counter-reset:list-counter]">{children}</ol>
          ),
          
          // List items with styled bullets
          li: ({ children }) => {
            return (
              <li className="flex items-start gap-3 text-[15px] leading-[1.75] text-black font-semibold">
                <span className="flex-shrink-0 mt-1">
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  </span>
                </span>
                <span className="flex-1">{children}</span>
              </li>
            );
          },
          
          // Code blocks with syntax highlighting style
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="px-1.5 py-0.5 rounded bg-muted text-primary text-sm font-mono">
                  {children}
                </code>
              );
            }
            return (
              <code className="block p-3 rounded-lg bg-muted text-foreground text-sm font-mono overflow-x-auto my-3">
                {children}
              </code>
            );
          },
          
          // Pre blocks for code
          pre: ({ children }) => (
            <pre className="my-3 rounded-lg overflow-hidden">{children}</pre>
          ),
          
          // Blockquotes for important notes
          blockquote: ({ children }) => (
            <blockquote className="my-3 pl-4 border-l-4 border-accent bg-accent/20 py-2 pr-3 rounded-r-lg text-black font-semibold italic">
              {children}
            </blockquote>
          ),
          
          // Links styled professionally
          a: ({ children, href }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline underline-offset-2 decoration-primary/50 hover:decoration-primary transition-colors"
            >
              {children}
            </a>
          ),
          
          // Horizontal rules
          hr: () => (
            <hr className="my-4 border-t border-border" />
          ),
          
          // Tables for structured data — VISIBLE borders
          table: ({ children }) => (
            <div className="my-3 overflow-x-auto rounded-lg border-2 border-gray-300 shadow-sm">
              <table className="min-w-full border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-emerald-50">{children}</thead>
          ),
          tbody: ({ children }) => (
            <tbody className="bg-white">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="border-b border-gray-300 last:border-b-0">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2.5 text-left text-xs font-bold text-emerald-800 uppercase tracking-wider border-r border-gray-300 last:border-r-0 border-b-2 border-emerald-300">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-sm text-gray-800 font-medium border-r border-gray-200 last:border-r-0">{children}</td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
