
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { Ticket } from '@/data/mockTickets';
import { Calendar, Filter } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DrilldownTabProps {
  tickets: Ticket[];
}

const DrilldownTab: React.FC<DrilldownTabProps> = ({ tickets }) => {
  return (
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
  );
};

export default DrilldownTab;
