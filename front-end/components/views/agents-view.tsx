'use client';

import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { AgentCard } from '@/components/agent-card';
import { useQueryState } from 'nuqs';
import { useMemo, useState } from 'react';

interface Agent {
  id: string;
  title: string;
  description: string;
  actions: string[];
  type: 'primary' | 'secondary';
}

interface AgentsViewProps {
  agents: Agent[];
}

export function AgentsView({ agents }: Readonly<AgentsViewProps>) {
  const [selectedView, setSelectedView] = useQueryState('view');
  const [selectedAgentId, setSelectedAgentId] = useQueryState('agentId');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAgents = useMemo(() => {
    return agents.filter((agent) =>
      agent.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [agents, searchQuery]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  };

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgentId(agent.id);
    setSelectedView('chat');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary h-4 w-4" />
          <Input
            placeholder="Search agents..."
            className="pl-10 w-80 bg-white border-border"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {filteredAgents.map((agent, index) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            index={index}
            isSelected={selectedAgentId === agent.id && selectedView === 'chat'}
            onClick={() => handleAgentClick(agent)}
          />
        ))}
        {filteredAgents.length === 0 && (
          <div className="col-span-4 text-center text-text-secondary">
            No agents found
          </div>
        )}
      </div>
    </div>
  );
}
