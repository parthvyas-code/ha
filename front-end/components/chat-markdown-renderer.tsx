'use client';

import { type FC, memo } from 'react';
import { cn } from '@/lib/utils';

interface ChatMarkdownRendererProps {
  content: string;
  className?: string;
}

const ChatMarkdownRendererImpl: FC<ChatMarkdownRendererProps> = ({
  content,
  className,
}) => {
  // Simple markdown-like rendering for basic formatting
  const renderMarkdown = (text: string) => {
    return (
      text
        // Headers
        .replace(
          /^### (.*$)/gim,
          '<h3 class="mb-2 mt-3 text-lg font-semibold">$1</h3>'
        )
        .replace(
          /^## (.*$)/gim,
          '<h2 class="mb-2 mt-4 text-xl font-semibold">$1</h2>'
        )
        .replace(/^# (.*$)/gim, '<h1 class="mb-3 text-2xl font-bold">$1</h1>')
        // Bold and italic
        .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
        // Code blocks
        .replace(
          /```([\s\S]*?)```/g,
          '<pre class="overflow-x-auto rounded-lg bg-muted p-3 text-sm my-2"><code>$1</code></pre>'
        )
        .replace(
          /`(.*?)`/g,
          '<code class="bg-muted rounded px-1.5 py-0.5 text-sm font-mono">$1</code>'
        )
        // Links
        .replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" class="text-primary font-medium underline underline-offset-4 hover:text-primary/80">$1</a>'
        )
        // Line breaks
        .replace(/\n/g, '<br />')
    );
  };

  return (
    <div
      className={cn('prose prose-sm max-w-none', className)}
      dangerouslySetInnerHTML={{ __html: renderMarkdown(content) }}
    />
  );
};

export const ChatMarkdownRenderer = memo(ChatMarkdownRendererImpl);
