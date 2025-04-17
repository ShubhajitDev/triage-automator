
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { getTicketStats } from '@/data/mockTickets';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FieldsAnalysisTab: React.FC = () => {
  const stats = getTicketStats();

  // Field accuracy data
  const fieldAccuracyData = Object.entries(stats.fieldAccuracy).map(([field, accuracy]) => ({
    name: field,
    accuracy: Math.round(accuracy * 100)
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="h-full lg:col-span-2">
        <CardHeader>
          <CardTitle>Field Performance Analysis</CardTitle>
          <CardDescription>Accuracy, precision and recall per field</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="w-full h-[280px]">
            <ChartContainer config={{ fields: {} }} className="h-full w-full">
              <BarChart
                data={fieldAccuracyData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 40,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45} 
                  textAnchor="end"
                  height={60}
                  tick={{ fontSize: 12 }}
                />
                <YAxis 
                  width={40}
                  domain={[0, 100]} 
                  label={{ value: 'Performance %', angle: -90, position: 'insideLeft' }}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="accuracy" fill="#0EA5E9" name="Accuracy" />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Top Confusion Points</CardTitle>
          <CardDescription>Fields where the model struggled the most</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto max-h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Original Value</TableHead>
                  <TableHead>Predicted Value</TableHead>
                  <TableHead>Frequency</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.confusionPoints.map((point, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{point.field}</TableCell>
                    <TableCell>{point.originalValue}</TableCell>
                    <TableCell>{point.predictedValue}</TableCell>
                    <TableCell>{point.count}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Field Misclassifications</CardTitle>
          <CardDescription>Common errors in ML predictions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-auto max-h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ticket ID</TableHead>
                  <TableHead>Field</TableHead>
                  <TableHead>Original</TableHead>
                  <TableHead>Predicted</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.misclassifications.map((error, idx) => (
                  <TableRow key={idx}>
                    <TableCell className="font-mono text-xs">{error.ticketId}</TableCell>
                    <TableCell>{error.field}</TableCell>
                    <TableCell>{error.originalValue}</TableCell>
                    <TableCell>{error.predictedValue}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FieldsAnalysisTab;
