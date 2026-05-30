import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { cn } from '@/lib/utils';

interface AIMessageRendererProps {
  content: string;
  className?: string;
}

/**
 * Premium mobile-first markdown renderer for AI chat output.
 *
 * Design principles:
 *  - Regular body weight (not semibold). Heavy weight on every paragraph was
 *    the #1 reason the chat felt visually loud and exhausting on mobile.
 *  - leading-relaxed (1.625) is the sweet spot for narrow phone bubbles —
 *    looser leading (1.75) made paragraphs feel disconnected.
 *  - Bullets are plain • and counter numbers, not rounded-full chrome.
 *  - First-child margin resets so bubble padding controls the top spacing,
 *    not the markdown content.
 */
export const AIMessageRenderer = ({ content, className }: AIMessageRendererProps) => {
  return (
    <div
      className={cn(
        "text-[15px] leading-relaxed text-foreground/90",
        // CRITICAL: min-w-0 + break-words so the renderer never demands more
        // width than its bubble parent. Without min-w-0 a flex grandparent
        // (chat bubble) silently ignores its own max-width and overflows the
        // viewport — which is exactly the bug we hit on mobile.
        "min-w-0 break-words [overflow-wrap:anywhere]",
        // First and last children should not push the bubble padding around
        "[&>*:first-child]:mt-0 [&>*:last-child]:mb-0",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // ─── Headings ───────────────────────────────────────────────────
          h1: ({ children }) => (
            <h1 className="text-lg font-semibold text-foreground mt-4 mb-2 first:mt-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-base font-semibold text-foreground mt-4 mb-2 first:mt-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-[15px] font-semibold text-foreground mt-3 mb-1.5 first:mt-0">
              {children}
            </h3>
          ),

          // ─── Paragraphs — regular weight, generous line-height ──────────
          p: ({ children }) => (
            <p className="mb-3 last:mb-0 text-foreground/90">
              {children}
            </p>
          ),

          // ─── Emphasis ───────────────────────────────────────────────────
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-foreground/85">{children}</em>
          ),

          // ─── Lists — clean bullets, tight spacing ───────────────────────
          ul: ({ children }) => (
            <ul className="my-2 space-y-1.5 pl-1 list-none">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="my-2 space-y-1.5 pl-1 list-none [counter-reset:list-counter]">
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => {
            // remark-gfm gives ordered list items an ordered flag we can use
            const isOrdered = (props as { ordered?: boolean }).ordered;
            return (
              <li
                className={cn(
                  "flex gap-2.5 text-foreground/90 min-w-0",
                  isOrdered &&
                    "[counter-increment:list-counter] before:content-[counter(list-counter)'.'] before:flex-shrink-0 before:font-medium before:text-primary before:min-w-[1.25rem]",
                )}
              >
                {!isOrdered && (
                  <span
                    aria-hidden
                    className="flex-shrink-0 mt-[0.55em] w-1.5 h-1.5 rounded-full bg-primary/70"
                  />
                )}
                <span className="flex-1 min-w-0">{children}</span>
              </li>
            );
          },

          // ─── Inline code ────────────────────────────────────────────────
          code: ({ children, className }) => {
            const isInline = !className;
            if (isInline) {
              return (
                <code className="px-1.5 py-0.5 rounded bg-muted text-primary text-[0.875em] font-mono break-words">
                  {children}
                </code>
              );
            }
            return (
              <code className="block p-3 rounded-lg bg-muted text-foreground text-[13px] font-mono overflow-x-auto my-2.5 leading-relaxed">
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="my-2.5 rounded-lg overflow-hidden">{children}</pre>
          ),

          // ─── Blockquote ─────────────────────────────────────────────────
          blockquote: ({ children }) => (
            <blockquote className="my-3 pl-3 border-l-[3px] border-primary/50 text-foreground/80 italic">
              {children}
            </blockquote>
          ),

          // ─── Links ──────────────────────────────────────────────────────
          a: ({ children, href }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-2 decoration-primary/40 hover:decoration-primary break-words"
            >
              {children}
            </a>
          ),

          // ─── Horizontal rule ────────────────────────────────────────────
          hr: () => <hr className="my-4 border-t border-border" />,

          // ─── Tables — horizontally scrollable on mobile ─────────────────
          table: ({ children }) => (
            <div className="my-3 -mx-1 sm:mx-0">
              <div
                className="overflow-x-auto rounded-lg border border-border"
                style={{ WebkitOverflowScrolling: 'touch' }}
              >
                <table className="w-full text-[13px] border-collapse">{children}</table>
              </div>
              <p className="text-[10px] text-muted-foreground mt-1 text-right sm:hidden">
                ← swipe →
              </p>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted/60">{children}</thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-border last:border-b-0">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-2.5 py-2 text-left font-semibold text-foreground border-r border-border last:border-r-0 whitespace-nowrap">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-2.5 py-2 text-foreground/85 border-r border-border last:border-r-0 align-top">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
