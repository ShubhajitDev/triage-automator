import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TicketsDashboard from './TicketsDashboard';
import TicketsList from './TicketsList';
import { mockTickets, Ticket, TicketChange, assignmentGroups, userNames } from '@/data/mockTickets';
import { useToast } from '@/hooks/use-toast';

const TicketTriageApp: React.FC = () => {
  // Filter only open tickets
  const openTickets = mockTickets.filter(ticket => ticket.status === "Open" || ticket.status === "In Progress");
  const [tickets, setTickets] = useState<Ticket[]>(openTickets);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const { toast } = useToast();

  const handleTicketValidation = (ticketId: string, isValid: boolean) => {
    setTickets(prevTickets => prevTickets.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          validationStatus: isValid ? 'Valid' : 'Invalid'
        };
      }
      return ticket;
    }));
    
    toast({
      title: `Ticket ${ticketId} ${isValid ? 'Validated' : 'Invalidated'}`,
      description: `The ticket has been marked as ${isValid ? 'valid' : 'invalid'}.`,
      variant: isValid ? 'default' : 'destructive',
    });
  };

  const handleTicketReassignment = (ticketId: string, newGroup: string) => {
    setTickets(prevTickets => prevTickets.map(ticket => {
      if (ticket.id === ticketId) {
        const change: TicketChange = {
          id: `change-${Date.now()}`,
          ticketId,
          field: 'assignmentGroup',
          previousValue: ticket.assignmentGroup,
          newValue: newGroup,
          predictedValue: newGroup,
          timestamp: new Date().toISOString(),
          appliedBy: 'AI Triage System'
        };
        
        return {
          ...ticket,
          assignmentGroup: newGroup,
          lastUpdated: new Date().toISOString(),
          changes: [...(ticket.changes || []), change]
        };
      }
      return ticket;
    }));
    
    toast({
      title: `Ticket ${ticketId} Reassigned`,
      description: `The ticket has been reassigned to ${newGroup}.`,
    });
  };

  const handleTicketPrioritization = (ticketId: string, newPriority: Ticket['priority']) => {
    setTickets(prevTickets => prevTickets.map(ticket => {
      if (ticket.id === ticketId) {
        const change: TicketChange = {
          id: `change-${Date.now()}`,
          ticketId,
          field: 'priority',
          previousValue: ticket.priority,
          newValue: newPriority,
          predictedValue: newPriority,
          timestamp: new Date().toISOString(),
          appliedBy: 'AI Triage System'
        };
        
        return {
          ...ticket,
          priority: newPriority,
          lastUpdated: new Date().toISOString(),
          changes: [...(ticket.changes || []), change]
        };
      }
      return ticket;
    }));
    
    toast({
      title: `Ticket ${ticketId} Priority Updated`,
      description: `The ticket priority has been updated to ${newPriority}.`,
    });
  };

  const handleDescriptionUpdate = (ticketId: string, newDescription: string) => {
    setTickets(prevTickets => prevTickets.map(ticket => {
      if (ticket.id === ticketId) {
        const change: TicketChange = {
          id: `change-${Date.now()}`,
          ticketId,
          field: 'shortDescription',
          previousValue: ticket.shortDescription,
          newValue: newDescription,
          predictedValue: newDescription,
          timestamp: new Date().toISOString(),
          appliedBy: 'AI Triage System'
        };
        
        return {
          ...ticket,
          shortDescription: newDescription,
          lastUpdated: new Date().toISOString(),
          changes: [...(ticket.changes || []), change]
        };
      }
      return ticket;
    }));
    
    toast({
      title: `Ticket ${ticketId} Description Updated`,
      description: `The ticket description has been updated.`,
    });
  };

  const handleAssignedToUpdate = (ticketId: string, newAssignee: string) => {
    setTickets(prevTickets => prevTickets.map(ticket => {
      if (ticket.id === ticketId) {
        const change: TicketChange = {
          id: `change-${Date.now()}`,
          ticketId,
          field: 'assignedTo',
          previousValue: ticket.assignedTo,
          newValue: newAssignee,
          timestamp: new Date().toISOString(),
          appliedBy: 'AI Triage System'
        };
        
        return {
          ...ticket,
          assignedTo: newAssignee,
          lastUpdated: new Date().toISOString(),
          changes: [...(ticket.changes || []), change]
        };
      }
      return ticket;
    }));
    
    toast({
      title: `Ticket ${ticketId} Assignee Updated`,
      description: `The ticket has been assigned to ${newAssignee}.`,
    });
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="dashboard">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
        </TabsList>
        
        <TabsContent value="dashboard" className="space-y-6">
          <TicketsDashboard tickets={tickets} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TicketTriageApp;
