'use client';

import { leftTabs, rightTabs } from '@/constants/tabs';
import { useDashboardTabs } from '@/hooks/use-dashboard-tabs';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function DashboardNavigation() {
  const { activeTab } = useDashboardTabs();

  return (
    <nav className="border-b border-border-light bg-background px-6">
      <div className="flex justify-between">
        <div className="flex gap-8">
          {leftTabs.map((tab) => (
            <Link
              key={tab.route}
              href={tab.route}
              className={cn(
                'py-4 text-sm font-medium border-b-4 transition-colors cursor-pointer',
                activeTab?.route === tab.route
                  ? 'border-primary text-primary-light'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              )}
            >
              {tab.title}
            </Link>
          ))}
        </div>
        <div className="flex gap-8">
          {rightTabs.map((tab) => (
            <Link
              key={tab.route}
              href={tab.route}
              className={cn(
                'py-4 text-sm font-medium border-b-4 transition-colors cursor-pointer',
                activeTab?.route === tab.route
                  ? 'border-primary text-primary-light'
                  : 'border-transparent text-text-secondary hover:text-text-primary'
              )}
            >
              {tab.title}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
