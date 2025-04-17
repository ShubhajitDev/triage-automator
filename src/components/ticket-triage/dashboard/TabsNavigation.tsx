
import React from 'react';
import { TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TabsNavigationProps {
  selectedTab: string;
}

const TabsNavigation: React.FC<TabsNavigationProps> = ({ selectedTab }) => {
  return (
    <TabsList className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 w-full">
      <TabsTrigger value="summary">Summary</TabsTrigger>
      <TabsTrigger value="fields">Field Analysis</TabsTrigger>
      <TabsTrigger value="comparisons">Before vs After</TabsTrigger>
      <TabsTrigger value="drilldown">Drill Down</TabsTrigger>
      <TabsTrigger value="samples">Sample Cases</TabsTrigger>
    </TabsList>
  );
};

export default TabsNavigation;
