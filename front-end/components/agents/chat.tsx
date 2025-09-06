import { useQueryState } from 'nuqs';
import CustomChatView from '../custom-chat-view';

const agentComponentMap = {
  'insights-engine': CustomChatView,
  // 'account-marketing': CustomChatView,
  // 'intent-abm': CustomChatView,
  // 'marketing-brief': CustomChatView,
  // 'ad-spend': CustomChatView,
  // 'lead-scoring': CustomChatView,
  // Add your new agents here
};

const Agent = () => {
  const [selectedAgentId] = useQueryState('agentId');
  const AgentComponent =
    agentComponentMap[selectedAgentId as keyof typeof agentComponentMap];

  if (!AgentComponent || !selectedAgentId) {
    return <div>Agent not found</div>;
  }

  return <AgentComponent agentId={selectedAgentId} />;
};

export default Agent;
