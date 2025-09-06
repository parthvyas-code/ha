import { DashboardHeader } from '@/components/dashboard-header';
import { DashboardNavigation } from '@/components/dashboard-navigation';

const DashboardProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <DashboardHeader />
      <DashboardNavigation />
      {children}
    </div>
  );
};

export default DashboardProvider;
