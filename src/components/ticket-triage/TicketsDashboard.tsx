
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import { useToast } from '@/hooks/use-toast';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, AlertCircle, Calendar, Filter } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';

interface TicketsDashboardProps {
  tickets: Ticket[];
}

const COLORS = ['#9b87f5', '#33C3F0', '#F97316', '#D946EF', '#0EA5E9'];

const TicketsDashboard: React.FC<TicketsDashboardProps> = ({ tickets }) => {
  const stats = getTicketStats();
  const { toast } = useToast();
  const [selectedTab, setSelectedTab] = useState("summary");
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);

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

  // For confidence analysis
  const confidenceDistribution = [
    { range: '0-20%', count: stats.confidenceBuckets[0] },
    { range: '21-40%', count: stats.confidenceBuckets[1] },
    { range: '41-60%', count: stats.confidenceBuckets[2] },
    { range: '61-80%', count: stats.confidenceBuckets[3] },
    { range: '81-100%', count: stats.confidenceBuckets[4] },
  ];

  const confidenceVsAccuracyData = [
    { confidence: 10, accuracy: 5, count: stats.confidenceBuckets[0] },
    { confidence: 30, accuracy: 20, count: stats.confidenceBuckets[1] },
    { confidence: 50, accuracy: 45, count: stats.confidenceBuckets[2] },
    { confidence: 70, accuracy: 65, count: stats.confidenceBuckets[3] },
    { confidence: 90, accuracy: 85, count: stats.confidenceBuckets[4] },
  ];

  const toggleTicketDetails = (ticketId: string) => {
    if (expandedTicket === ticketId) {
      setExpandedTicket(null);
    } else {
      setExpandedTicket(ticketId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Dashboard Navigation */}
      <Tabs defaultValue="summary" value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 w-full">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="fields">Field Analysis</TabsTrigger>
          <TabsTrigger value="comparisons">Before vs After</TabsTrigger>
          <TabsTrigger value="confidence">Confidence</TabsTrigger>
          <TabsTrigger value="drilldown">Drill Down</TabsTrigger>
          <TabsTrigger value="samples">Sample Cases</TabsTrigger>
        </TabsList>

        {/* 1. Summary Overview Tab */}
        <TabsContent value="summary" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* KPI Cards */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Total Tickets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{totalTickets}</div>
                <p className="text-xs text-muted-foreground mt-1">Historical tickets processed</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Auto-Update Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{automationRate}%</div>
                <p className="text-xs text-muted-foreground mt-1">Tickets with ML suggestions</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Suggestion Accuracy</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{accuracyRate}%</div>
                <p className="text-xs text-muted-foreground mt-1">Correct ML predictions</p>
              </CardContent>
            </Card>

            <Card>
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
        </TabsContent>

        {/* 2. Per-Field Analysis Tab */}
        <TabsContent value="fields" className="w-full">
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
        </TabsContent>

        {/* 3. Before vs After ML Suggestions Tab */}
        <TabsContent value="comparisons" className="w-full">
          <Card>
            <CardHeader>
              <CardTitle>Before vs After ML Suggestions</CardTitle>
              <CardDescription>Compare original values with ML predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-auto max-h-[550px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Field</TableHead>
                      <TableHead>Original Value</TableHead>
                      <TableHead>Predicted Value</TableHead>
                      <TableHead>Confidence</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {stats.beforeAfterComparisons.map((comparison) => (
                      <React.Fragment key={comparison.id}>
                        <TableRow>
                          <TableCell className="font-mono text-xs">{comparison.ticketId}</TableCell>
                          <TableCell>{comparison.field}</TableCell>
                          <TableCell>{comparison.originalValue}</TableCell>
                          <TableCell>{comparison.predictedValue}</TableCell>
                          <TableCell>{(comparison.confidence * 100).toFixed(0)}%</TableCell>
                          <TableCell>
                            {comparison.correct ? (
                              <Badge className="bg-green-500 hover:bg-green-600">
                                <Check size={12} className="mr-1" /> Match
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                <AlertCircle size={12} className="mr-1" /> Mismatch
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => toggleTicketDetails(comparison.id)}
                            >
                              {expandedTicket === comparison.id ? 'Hide' : 'Details'}
                            </Button>
                          </TableCell>
                        </TableRow>
                        {expandedTicket === comparison.id && (
                          <TableRow>
                            <TableCell colSpan={7} className="bg-muted/50 p-4">
                              <div className="text-sm">
                                <h4 className="font-medium mb-1">Ticket Details</h4>
                                <p className="text-xs mb-2">{comparison.description}</p>
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                  <div>
                                    <span className="text-xs font-medium">Created Date:</span>
                                    <span className="text-xs ml-1">{comparison.createdDate}</span>
                                  </div>
                                  <div>
                                    <span className="text-xs font-medium">Status:</span>
                                    <span className="text-xs ml-1">{comparison.status}</span>
                                  </div>
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </React.Fragment>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 4. Model Confidence Analysis Tab */}
        <TabsContent value="confidence" className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Confidence Score Distribution</CardTitle>
                <CardDescription>How confident the model was across predictions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[280px]">
                  <ChartContainer config={{ confidence: {} }} className="h-full w-full">
                    <BarChart
                      data={confidenceDistribution}
                      margin={{
                        top: 5,
                        right: 10,
                        left: 0,
                        bottom: 30,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="range" 
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis 
                        width={30} 
                        tick={{ fontSize: 10 }} 
                        label={{ value: 'Count', angle: -90, position: 'insideLeft' }}
                      />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="count" fill="#D946EF" name="Number of Predictions" />
                    </BarChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="h-full">
              <CardHeader>
                <CardTitle>Confidence vs Accuracy</CardTitle>
                <CardDescription>Relationship between model confidence and correctness</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full h-[280px]">
                  <ChartContainer config={{ confidenceVsAccuracy: {} }} className="h-full w-full">
                    <ScatterChart
                      margin={{
                        top: 20,
                        right: 20,
                        bottom: 30,
                        left: 20,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        type="number" 
                        dataKey="confidence" 
                        name="Confidence" 
                        domain={[0, 100]} 
                        label={{ value: 'Confidence %', position: 'bottom' }}
                        tick={{ fontSize: 11 }}
                      />
                      <YAxis 
                        type="number" 
                        dataKey="accuracy" 
                        name="Accuracy" 
                        domain={[0, 100]} 
                        label={{ value: 'Accuracy %', angle: -90, position: 'insideLeft' }}
                        tick={{ fontSize: 11 }}
                        width={40}
                      />
                      <ZAxis type="number" dataKey="count" range={[50, 400]} />
                      <ChartTooltip content={<ChartTooltipContent />} cursor={{ strokeDasharray: '3 3' }} />
                      <Scatter name="Confidence/Accuracy" data={confidenceVsAccuracyData} fill="#8884d8" />
                    </ScatterChart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 5. Filter & Drilldown Tab */}
        <TabsContent value="drilldown" className="w-full">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Filter & Explore Data</CardTitle>
              <CardDescription>Slice the data to discover patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-3 mb-6">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-8 flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Date Range</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Date Range</h4>
                        <p className="text-sm text-muted-foreground">
                          Select a date range to filter the data
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline">Last 7 days</Button>
                        <Button variant="outline">Last 14 days</Button>
                        <Button variant="outline">Last 30 days</Button>
                        <Button variant="outline">Custom range</Button>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-8 flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Assignment Group</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Assignment Group</h4>
                        <div className="grid gap-2">
                          {["Network Team", "Database Team", "Application Support"].map((group) => (
                            <div key={group} className="flex items-center space-x-2">
                              <input type="checkbox" id={group} className="h-4 w-4" />
                              <label htmlFor={group} className="text-sm">{group}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-8 flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Priority</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Priority</h4>
                        <div className="grid gap-2">
                          {["Critical", "High", "Medium", "Low"].map((priority) => (
                            <div key={priority} className="flex items-center space-x-2">
                              <input type="checkbox" id={priority} className="h-4 w-4" />
                              <label htmlFor={priority} className="text-sm">{priority}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="h-8 flex items-center">
                      <Filter className="mr-2 h-4 w-4" />
                      <span>Confidence</span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">Confidence Range</h4>
                        <div className="grid gap-2">
                          {["0-20%", "21-40%", "41-60%", "61-80%", "81-100%"].map((range) => (
                            <div key={range} className="flex items-center space-x-2">
                              <input type="checkbox" id={range} className="h-4 w-4" />
                              <label htmlFor={range} className="text-sm">{range}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>

                <Button className="h-8 bg-primary">Apply Filters</Button>
              </div>

              <div className="overflow-auto max-h-[400px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Ticket ID</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Changes Made</TableHead>
                      <TableHead>Confidence</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tickets.slice(0, 10).map((ticket) => (
                      <TableRow key={ticket.id}>
                        <TableCell className="font-mono text-xs">{ticket.id}</TableCell>
                        <TableCell className="max-w-[200px] truncate">{ticket.shortDescription}</TableCell>
                        <TableCell>{ticket.priority}</TableCell>
                        <TableCell>{ticket.assignmentGroup}</TableCell>
                        <TableCell>{ticket.changes?.length || 0}</TableCell>
                        <TableCell>{ticket.changes?.length ? '78%' : 'N/A'}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 6. Sample Ticket Cases Tab */}
        <TabsContent value="samples" className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {stats.sampleCases.map((sample, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-muted/30 pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-base font-medium">
                      Ticket {sample.ticketId}
                    </CardTitle>
                    {sample.correct ? (
                      <Badge className="bg-green-500">Correct Prediction</Badge>
                    ) : (
                      <Badge variant="destructive">Incorrect Prediction</Badge>
                    )}
                  </div>
                  <CardDescription className="text-xs">{sample.createdDate}</CardDescription>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-1">Description</h4>
                    <p className="text-xs text-muted-foreground">{sample.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="text-sm font-medium mb-1">Original {sample.field}</h4>
                      <p className="text-xs p-2 bg-muted rounded">{sample.originalValue}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-1">Predicted {sample.field}</h4>
                      <p className={`text-xs p-2 rounded ${sample.correct ? 'bg-green-100' : 'bg-red-100'}`}>
                        {sample.predictedValue}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-sm font-medium">Confidence</h4>
                      <p className="text-xs">{(sample.confidence * 100).toFixed(0)}%</p>
                    </div>
                    <Button size="sm" variant="secondary" onClick={() => {
                      toast({
                        title: "Reason for prediction",
                        description: sample.reasoning,
                      });
                    }}>
                      View Reasoning
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TicketsDashboard;
