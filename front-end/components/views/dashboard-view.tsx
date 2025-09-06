import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  Activity,
  TrendingUp,
  DollarSign,
  BarChart3,
} from 'lucide-react';

export function DashboardView() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              Total Agents
            </CardTitle>
            <Users className="h-4 w-4 text-primary-light" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">6</div>
            <p className="text-xs text-text-secondary">+1 from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              Active Sessions
            </CardTitle>
            <Activity className="h-4 w-4 text-primary-light" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">127</div>
            <p className="text-xs text-text-secondary">+15% from yesterday</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              Engagement Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-primary-light" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">89%</div>
            <p className="text-xs text-text-secondary">+5% from last week</p>
          </CardContent>
        </Card>
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-text-secondary">
              Revenue Impact
            </CardTitle>
            <DollarSign className="h-4 w-4 text-primary-light" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-text-primary">$2.4M</div>
            <p className="text-xs text-text-secondary">
              +12% from last quarter
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-text-primary">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-light rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-text-primary">
                    Insights Engine generated new report
                  </p>
                  <p className="text-xs text-text-secondary">2 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-light rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-text-primary">
                    Account Based Marketing campaign launched
                  </p>
                  <p className="text-xs text-text-secondary">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-primary-light rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm text-text-primary">
                    New high-value account identified
                  </p>
                  <p className="text-xs text-text-secondary">1 hour ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-background border-border">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-text-primary">
              Performance Overview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-background rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-primary-light mx-auto mb-2" />
                <p className="text-sm text-text-secondary">
                  Performance chart would appear here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
