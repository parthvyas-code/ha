'use client';
import { useDashboardTabs } from '@/hooks/use-dashboard-tabs';

const DashboardTabTitle = () => {
  const { activeTab } = useDashboardTabs();

  return (
    <div className="flex items-center justify-between mb-8">
      <h1 className="text-3xl font-bold text-text-primary">
        {activeTab?.title}
      </h1>
    </div>
  );
};

export default DashboardTabTitle;
