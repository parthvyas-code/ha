export const tabs = {
  dashboard: {
    title: 'Dashboard',
    route: '/',
  },
  actions: {
    title: 'Actions',
    route: '/actions',
  },
  agents: {
    title: 'Agents',
    route: '/agents',
  },
  analytics: {
    title: 'Analytics Dashboard',
    route: '/analytics',
  },
  promptLibrary: {
    title: 'Prompt Library',
    route: '/prompt-library',
  },
  usage: {
    title: 'Usage & Cost',
    route: '/usage',
  },
};

export const leftTabs = [tabs.dashboard, tabs.actions, tabs.promptLibrary];

export const rightTabs = [tabs.agents, tabs.analytics, tabs.usage];
