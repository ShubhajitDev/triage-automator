
import React, { useState } from 'react';
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Ticket } from '@/data/mockTickets';
import TabsNavigation from './dashboard/TabsNavigation';
import SummaryTab from './dashboard/SummaryTab';
import FieldsAnalysisTab from './dashboard/FieldsAnalysisTab';
import ComparisonTab from './dashboard/ComparisonTab';
import DrilldownTab from './dashboard/DrilldownTab';
import SamplesTab from './dashboard/SamplesTab';

interface TicketsDashboardProps {
  tickets: Ticket[];
}

const TicketsDashboard: React.FC<TicketsDashboardProps> = ({ tickets }) => {
  const [selectedTab, setSelectedTab] = useState("summary");

  return (
    <div className="space-y-6">
      {/* Dashboard Navigation */}
      <Tabs defaultValue="summary" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsNavigation selectedTab={selectedTab} />

        {/* 1. Summary Overview Tab */}
        <TabsContent value="summary" className="w-full">
          <SummaryTab tickets={tickets} />
        </TabsContent>

        {/* 2. Per-Field Analysis Tab */}
        <TabsContent value="fields" className="w-full">
          <FieldsAnalysisTab />
        </TabsContent>

        {/* 3. Before vs After ML Suggestions Tab */}
        <TabsContent value="comparisons" className="w-full">
          <ComparisonTab />
        </TabsContent>

        {/* 4. Filter & Drilldown Tab */}
        <TabsContent value="drilldown" className="w-full">
          <DrilldownTab tickets={tickets} />
        </TabsContent>

        {/* 5. Sample Ticket Cases Tab */}
        <TabsContent value="samples" className="w-full">
          <SamplesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TicketsDashboard;
