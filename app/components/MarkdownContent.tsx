'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
}

export default function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        // Headings with proper IDs for TOC linking
        h2: ({ children, ...props }) => {
          const text = children?.toString() || '';
          const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
          return (
            <h2
              id={id}
              className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-24"
              {...props}
            >
              {children}
            </h2>
          );
        },
        h3: ({ children, ...props }) => {
          const text = children?.toString() || '';
          const id = text
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-');
          return (
            <h3
              id={id}
              className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mt-6 mb-3 scroll-mt-24"
              {...props}
            >
              {children}
            </h3>
          );
        },
        h4: ({ children, ...props }) => (
          <h4
            className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white mt-4 mb-2"
            {...props}
          >
            {children}
          </h4>
        ),
        // Paragraphs
        p: ({ children, ...props }) => (
          <p
            className="text-gray-800 dark:text-gray-200 leading-relaxed mb-4"
            {...props}
          >
            {children}
          </p>
        ),
        // Lists
        ul: ({ children, ...props }) => (
          <ul
            className="list-disc list-inside text-gray-800 dark:text-gray-200 mb-4 space-y-2 ml-4"
            {...props}
          >
            {children}
          </ul>
        ),
        ol: ({ children, ...props }) => (
          <ol
            className="list-decimal list-inside text-gray-800 dark:text-gray-200 mb-4 space-y-2 ml-4"
            {...props}
          >
            {children}
          </ol>
        ),
        li: ({ children, ...props }) => (
          <li className="text-gray-800 dark:text-gray-200" {...props}>
            {children}
          </li>
        ),
        // Links - preserve existing internal links
        a: ({ href, children, ...props }) => (
          <a
            href={href}
            className="text-purple-600 dark:text-purple-400 hover:underline font-medium"
            {...props}
          >
            {children}
          </a>
        ),
        // Blockquotes
        blockquote: ({ children, ...props }) => (
          <blockquote
            className="border-l-4 border-purple-500 pl-4 italic text-gray-700 dark:text-gray-300 my-4"
            {...props}
          >
            {children}
          </blockquote>
        ),
        // Code blocks
        code: ({ children, className, ...props }) => {
          const isInline = !className;
          if (isInline) {
            return (
              <code
                className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono text-purple-600 dark:text-purple-400"
                {...props}
              >
                {children}
              </code>
            );
          }
          return (
            <code
              className="block bg-gray-100 dark:bg-gray-800 p-4 rounded-lg text-sm font-mono overflow-x-auto my-4"
              {...props}
            >
              {children}
            </code>
          );
        },
        // Strong (bold)
        strong: ({ children, ...props }) => (
          <strong className="font-bold text-gray-900 dark:text-white" {...props}>
            {children}
          </strong>
        ),
        // Emphasis (italic)
        em: ({ children, ...props }) => (
          <em className="italic" {...props}>
            {children}
          </em>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
