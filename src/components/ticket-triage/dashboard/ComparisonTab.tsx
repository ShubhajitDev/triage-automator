
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { getTicketStats } from '@/data/mockTickets';
import { Check, AlertCircle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ComparisonTab: React.FC = () => {
  const stats = getTicketStats();
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);

  const toggleTicketDetails = (ticketId: string) => {
    if (expandedTicket === ticketId) {
      setExpandedTicket(null);
    } else {
      setExpandedTicket(ticketId);
    }
  };

  return (
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
  );
};

export default ComparisonTab;
