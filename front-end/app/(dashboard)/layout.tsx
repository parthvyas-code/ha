import DashboardProvider from '@/providers/dashboard-provider';
import DashboardTabTitle from '@/components/dashboard-tab-title';
import { cn } from '@/lib/utils';
import { ChatPanel } from '@/components/chat-panel';
import { Suspense } from 'react';

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <DashboardProvider>
      <div className="flex flex-1">
        <main className={cn('flex-1 p-6 transition-all duration-300')}>
          <div className="max-w-7xl mx-auto">
            <DashboardTabTitle />
            {children}
          </div>
        </main>
      </div>
      <Suspense fallback={<div>Loading chat...</div>}>
        <ChatPanel />
      </Suspense>
    </DashboardProvider>
  );
}
