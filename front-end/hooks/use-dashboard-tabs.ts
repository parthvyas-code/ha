import { usePathname, useRouter } from 'next/navigation';
import { tabs } from '@/constants/tabs';

export const useDashboardTabs = () => {
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = Object.values(tabs).find((tab) => tab.route === pathname);

  const onTabChange = (tab: string) => {
    router.push(tab);
  };

  return { activeTab, onTabChange };
};
