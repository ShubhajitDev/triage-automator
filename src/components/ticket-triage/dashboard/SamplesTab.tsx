
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardDescription 
} from "@/components/ui/card";
import { getTicketStats } from '@/data/mockTickets';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const SamplesTab: React.FC = () => {
  const stats = getTicketStats();
  const { toast } = useToast();

  return (
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
  );
};

export default SamplesTab;
