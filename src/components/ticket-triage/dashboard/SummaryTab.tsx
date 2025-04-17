
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Ticket, getTicketStats } from '@/data/mockTickets';
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface SummaryTabProps {
  tickets: Ticket[];
}

const COLORS = ['#9b87f5', '#33C3F0', '#F97316', '#D946EF', '#0EA5E9'];

const SummaryTab: React.FC<SummaryTabProps> = ({ tickets }) => {
  const stats = getTicketStats();

  // Summary data
  const totalTickets = stats.totalTickets;
  const ticketsWithSuggestions = stats.changesCount;
  const matchedSuggestions = stats.matchedChangesCount;
  const automationRate = totalTickets > 0 ? Math.round((ticketsWithSuggestions / totalTickets) * 100) : 0;
  const accuracyRate = ticketsWithSuggestions > 0 ? Math.round((matchedSuggestions / ticketsWithSuggestions) * 100) : 0;

  // Summary pie chart data
  const summaryPieData = [
    { name: 'Updated Tickets', value: ticketsWithSuggestions },
    { name: 'Unchanged Tickets', value: totalTickets - ticketsWithSuggestions }
  ];

  // Field accuracy data
  const fieldAccuracyData = Object.entries(stats.fieldAccuracy).map(([field, accuracy]) => ({
    name: field,
    accuracy: Math.round(accuracy * 100)
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* KPI Cards */}
        <Card className="h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Total Open Tickets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{tickets.length}</div>
            <p className="text-xs text-muted-foreground mt-1">Open tickets being processed</p>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Auto-Update Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{automationRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">Tickets with ML suggestions</p>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Suggestion Accuracy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{accuracyRate}%</div>
            <p className="text-xs text-muted-foreground mt-1">Correct ML predictions</p>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">Estimated Time Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{matchedSuggestions * 5}m</div>
            <p className="text-xs text-muted-foreground mt-1">Assuming 5 min per ticket</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Updated vs. Unchanged Tickets</CardTitle>
            <CardDescription>Proportion of tickets processed by ML</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center items-center">
            <div className="w-full h-[280px]">
              <ChartContainer config={{ summary: {} }} className="h-full w-full">
                <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                  <Pie
                    data={summaryPieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {summaryPieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>

        {/* Field Accuracy Chart */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Accuracy Per Field</CardTitle>
            <CardDescription>How well the model performs on different fields</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-[280px]">
              <ChartContainer config={{ accuracy: {} }} className="h-full w-full">
                <BarChart
                  data={fieldAccuracyData}
                  margin={{
                    top: 5,
                    right: 10,
                    left: 0,
                    bottom: 40,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="name" 
                    angle={-45} 
                    textAnchor="end"
                    height={60}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis 
                    width={30} 
                    tick={{ fontSize: 10 }} 
                    domain={[0, 100]}
                    label={{ value: '%', angle: -90, position: 'insideLeft', offset: 0 }}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="accuracy" fill="#0EA5E9" name="Accuracy %" />
                </BarChart>
              </ChartContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SummaryTab;
