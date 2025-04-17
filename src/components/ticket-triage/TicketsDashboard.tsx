
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Ticket, getTicketStats } from '@/data/mockTickets';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';

interface TicketsDashboardProps {
  tickets: Ticket[];
}

const COLORS = ['#9b87f5', '#33C3F0', '#F97316', '#D946EF'];

const TicketsDashboard: React.FC<TicketsDashboardProps> = ({ tickets }) => {
  const stats = getTicketStats();
  const { toast } = useToast();

  const priorityData = [
    { name: 'Critical', value: stats.ticketsByPriority.Critical },
    { name: 'High', value: stats.ticketsByPriority.High },
    { name: 'Medium', value: stats.ticketsByPriority.Medium },
    { name: 'Low', value: stats.ticketsByPriority.Low }
  ];

  const fieldChangeData = Object.entries(stats.changesByField).map(([field, count]) => ({
    name: field,
    count
  }));

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Ticket Count Summary */}
      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle>Ticket Overview</CardTitle>
          <CardDescription>Summary of ticket statuses and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-triage-muted rounded-lg p-4 text-center">
              <div className="text-4xl font-bold text-triage-primary">{stats.totalTickets}</div>
              <div className="text-sm font-medium mt-1">Total Tickets</div>
            </div>
            <div className="bg-triage-muted rounded-lg p-4 text-center">
              <div className="text-4xl font-bold text-triage-primary">{stats.openTickets}</div>
              <div className="text-sm font-medium mt-1">Open Tickets</div>
            </div>
            <div className="bg-triage-muted rounded-lg p-4 text-center">
              <div className="text-4xl font-bold text-triage-primary">{stats.resolvedTickets}</div>
              <div className="text-sm font-medium mt-1">Resolved Tickets</div>
            </div>
            <div className="bg-triage-muted rounded-lg p-4 text-center">
              <div className="text-4xl font-bold text-triage-primary">{stats.pendingValidation}</div>
              <div className="text-sm font-medium mt-1">Pending Validation</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Priority Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Tickets by Priority</CardTitle>
          <CardDescription>Distribution of tickets by priority level</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={{ priority: {} }} className="h-full">
              <PieChart>
                <Pie
                  data={priorityData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {priorityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent />} />
              </PieChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Field Changes */}
      <Card>
        <CardHeader>
          <CardTitle>Changes by Field</CardTitle>
          <CardDescription>Number of updates by field type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={{ field: {} }} className="h-full">
              <BarChart
                data={fieldChangeData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 45,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="count" fill="#9b87f5" name="Changes" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      {/* Changes Over Time */}
      <Card>
        <CardHeader>
          <CardTitle>Changes Over Time</CardTitle>
          <CardDescription>Ticket updates over the past 7 days</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ChartContainer config={{ time: {} }} className="h-full">
              <LineChart
                data={stats.changesByDay}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 45,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" angle={-45} textAnchor="end" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  stroke="#9b87f5" 
                  activeDot={{ r: 8 }} 
                  name="Changes" 
                />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketsDashboard;
