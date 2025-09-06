'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BarChart3, Users, MessageSquare } from 'lucide-react';

const ActionsView = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-card border-border hover:border-primary-light cursor-pointer transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg font-semibold text-text-primary">
                Generate Report
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-text-secondary">
              Create comprehensive analytics reports from your data sources
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="bg-card border-border hover:border-primary-light cursor-pointer transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg font-semibold text-text-primary">
                Identify Prospects
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-text-secondary">
              Find and prioritize high-value prospects based on engagement data
            </CardDescription>
          </CardContent>
        </Card>
        <Card className="bg-card border-border hover:border-primary-light cursor-pointer transition-colors">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <CardTitle className="text-lg font-semibold text-text-primary">
                Create Campaign
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-text-secondary">
              Design and launch targeted marketing campaigns
            </CardDescription>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ActionsView;
