import { useEffect, useState } from 'react';

export const useChatStorage = (agentId: string) => {
  const [threadId, setThreadId] = useState<string | null>(null);

  useEffect(() => {
    const threadId = localStorage.getItem(`thread_${agentId}`);

    if (threadId) {
      setThreadId(threadId);
    } else {
      const newThreadId = crypto.randomUUID();
      setThreadId(newThreadId);
      localStorage.setItem(`thread_${agentId}`, newThreadId);
    }
  }, [agentId]);

  return { threadId, setThreadId };
};
