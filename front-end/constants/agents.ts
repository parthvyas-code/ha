interface Agent {
  id: string;
  title: string;
  description: string;
  actions: string[];
  type: 'primary' | 'secondary';
  endpoint: string;
}

export const agents: Agent[] = [
  {
    id: 'insights-engine',
    title: 'Insights Engine',
    description:
      'An AI-powered solution that transforms raw data into real-time, actionable intelligence and integrates multiple data sources, applies advanced analytics, and delivers personalized recommendations to empower faster, smarter decision-making across the organization.',
    actions: ['View All Actions >'],
    type: 'primary',
    endpoint: 'http://127.0.0.1:8000',
  },
  // {
  //   id: 'account-marketing',
  //   title: 'Account Based Marketing',
  //   description:
  //     'A strategic B2B approach where marketing and sales teams work together to target high-value accounts with personalized campaigns, tailored messaging, and deeper engagement — driving stronger relationships and higher ROI.',
  //   actions: ['View All Actions >'],
  //   type: 'secondary',
  //   endpoint: 'http://localhost:8001',
  // },
];
