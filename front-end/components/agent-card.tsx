'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Agent {
  id: string;
  title: string;
  description: string;
  actions: string[];
  type: 'primary' | 'secondary';
}

interface AgentCardProps {
  agent: Agent;
  index: number;
  isSelected: boolean;
  onClick: () => void;
}

export function AgentCard({
  agent,
  index,
  isSelected,
  onClick,
}: AgentCardProps) {
  return (
    <Card
      className={cn(
        'cursor-pointer transition-all duration-200 hover:shadow-lg border bg-card',
        index === 0 ? 'col-span-3' : 'col-span-1',
        isSelected
          ? 'text-white border-primary bg-primary'
          : 'border-border hover:border-primary-light'
      )}
      onClick={onClick}
    >
      <CardHeader>
        <CardTitle
          className={cn(
            'text-lg font-semibold',
            isSelected ? 'text-white' : 'text-text-primary'
          )}
        >
          {agent.title}
        </CardTitle>
        <CardDescription
          className={cn(
            'text-sm leading-relaxed',
            isSelected ? 'text-gray-200' : 'text-text-secondary'
          )}
        >
          {agent.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col h-full">
        {index === 0 ? (
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-2 gap-2 mb-4">
              {agent.actions.slice(0, 4).map((action, actionIndex) => (
                <div
                  key={actionIndex}
                  className={cn(
                    'text-sm font-medium p-2 rounded',
                    isSelected ? 'text-gray-100' : 'text-primary-light'
                  )}
                >
                  {action}
                </div>
              ))}
            </div>
            <div className="mt-auto">
              <div
                className={cn(
                  'text-sm font-medium',
                  isSelected ? 'text-gray-100' : 'text-primary-light'
                )}
              >
                {agent.actions[4]}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1"></div>
            <div className="mt-auto">
              <div
                className={cn(
                  'text-sm font-medium',
                  isSelected ? 'text-gray-100' : 'text-primary-light'
                )}
              >
                {agent.actions[0]}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
