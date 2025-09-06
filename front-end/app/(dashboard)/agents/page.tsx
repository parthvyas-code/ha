import { AgentsView } from '@/components/views/agents-view';
import { agents } from '@/constants/agents';
import { Suspense } from 'react';

export default function Dashboard() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AgentsView agents={agents} />
    </Suspense>
  );
}
