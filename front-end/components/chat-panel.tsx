'use client';

import { Button } from '@/components/ui/button';
import { Settings, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useQueryState } from 'nuqs';
import { useMemo } from 'react';
import { agents } from '@/constants/agents';
import Agent from './agents/chat';

export function ChatPanel() {
  const [selectedView, setSelectedView] = useQueryState('view');
  const [selectedAgentId] = useQueryState('agentId');

  const selectedAgent = useMemo(() => {
    return agents.find((agent) => agent.id === selectedAgentId);
  }, [selectedAgentId]);

  return (
    <div
      className={cn(
        'fixed right-0 top-0 h-full w-3/4 bg-background border-l border-border transform transition-transform duration-300 z-50',
        selectedView === 'chat' ? 'translate-x-0' : 'translate-x-full'
      )}
    >
      <div className="flex flex-col h-full">
        {/* Chat Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold text-text-primary">Chat</h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-text-secondary">
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-text-secondary"
              onClick={() => setSelectedView(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {selectedAgent && (
          <div className="font-bold mx-2 my-4 text-sm rounded-lg">
            Agent: {selectedAgent.title}
          </div>
        )}

        {/* Chat Content */}
        <div className="flex-1 overflow-y-auto">
          {selectedAgentId && (
            <div className="h-full">
              <Agent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
