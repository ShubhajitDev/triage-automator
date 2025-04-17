
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  XCircle, 
  Edit, 
  Check, 
  ChevronDown, 
  ChevronUp,
  X,
  User,
  AlertCircle
} from "lucide-react";
import { Ticket } from '@/data/mockTickets';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';

interface TicketsListProps {
  tickets: Ticket[];
  assignmentGroups: string[];
  userNames: string[];
  onValidate: (ticketId: string, isValid: boolean) => void;
  onReassign: (ticketId: string, newGroup: string) => void;
  onPrioritize: (ticketId: string, newPriority: Ticket['priority']) => void;
  onUpdateDescription: (ticketId: string, newDescription: string) => void;
  onUpdateAssignee: (ticketId: string, newAssignee: string) => void;
  selectedTicket: Ticket | null;
  setSelectedTicket: (ticket: Ticket | null) => void;
}

const TicketsList: React.FC<TicketsListProps> = ({ 
  tickets, 
  assignmentGroups,
  userNames,
  onValidate, 
  onReassign,
  onPrioritize,
  onUpdateDescription,
  onUpdateAssignee,
  selectedTicket,
  setSelectedTicket
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [editingDescription, setEditingDescription] = useState('');
  const [showChanges, setShowChanges] = useState(false);
  
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = 
      ticket.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || ticket.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSelectTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setEditingDescription(ticket.shortDescription);
  };

  const handleCloseDetails = () => {
    setSelectedTicket(null);
    setEditingDescription('');
  };

  const handleSaveDescription = () => {
    if (selectedTicket && editingDescription !== selectedTicket.shortDescription) {
      onUpdateDescription(selectedTicket.id, editingDescription);
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy h:mm a');
    } catch (e) {
      return dateString;
    }
  };

  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-800 hover:bg-red-200';
      case 'High': return 'bg-orange-100 text-orange-800 hover:bg-orange-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 hover:bg-green-200';
      default: return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'New': return 'bg-blue-100 text-blue-800';
      case 'Open': return 'bg-purple-100 text-purple-800';
      case 'In Progress': return 'bg-triage-muted text-triage-primary';
      case 'Resolved': return 'bg-green-100 text-green-800';
      case 'Closed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getValidationStatusIcon = (validationStatus: Ticket['validationStatus']) => {
    switch (validationStatus) {
      case 'Valid': return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'Invalid': return <XCircle className="h-5 w-5 text-red-500" />;
      case 'Pending': return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="w-full md:w-1/2">
          <Input 
            placeholder="Search tickets..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="w-full md:w-1/2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Statuses</SelectItem>
              <SelectItem value="New">New</SelectItem>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="In Progress">In Progress</SelectItem>
              <SelectItem value="Resolved">Resolved</SelectItem>
              <SelectItem value="Closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50px]">Status</TableHead>
              <TableHead className="w-[120px]">Ticket ID</TableHead>
              <TableHead>Short Description</TableHead>
              <TableHead>Assignment Group</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTickets.map((ticket) => (
              <TableRow key={ticket.id}>
                <TableCell>
                  <div className="flex justify-center">
                    {getValidationStatusIcon(ticket.validationStatus)}
                  </div>
                </TableCell>
                <TableCell className="font-medium">{ticket.id}</TableCell>
                <TableCell>{ticket.shortDescription}</TableCell>
                <TableCell>{ticket.assignmentGroup}</TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(ticket.priority)}>
                    {ticket.priority}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSelectTicket(ticket)}
                  >
                    Details
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            
            {filteredTickets.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center">
                  No tickets found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Ticket Details Dialog */}
      <Dialog open={!!selectedTicket} onOpenChange={(open) => !open && handleCloseDetails()}>
        <DialogContent className="max-w-3xl">
          {selectedTicket && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="flex items-center gap-2">
                    <span>Ticket {selectedTicket.id}</span>
                    <Badge className={getStatusColor(selectedTicket.status)}>
                      {selectedTicket.status}
                    </Badge>
                  </DialogTitle>
                </div>
                <DialogDescription>
                  Last updated: {formatDate(selectedTicket.lastUpdated)}
                </DialogDescription>
              </DialogHeader>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
                <div className="col-span-2">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Short Description</label>
                      <div className="mt-1 flex items-center gap-2">
                        <Textarea 
                          className="flex-1"
                          rows={2} 
                          value={editingDescription} 
                          onChange={(e) => setEditingDescription(e.target.value)}
                        />
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={handleSaveDescription}
                          disabled={editingDescription === selectedTicket.shortDescription}
                        >
                          <Check className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700">Description</label>
                      <div className="mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm">
                        {selectedTicket.description}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Validation</label>
                    <div className="mt-1 flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        className="w-full flex items-center gap-2"
                        onClick={() => onValidate(selectedTicket.id, true)}
                      >
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Valid</span>
                      </Button>
                      <Button 
                        variant="outline"
                        className="w-full flex items-center gap-2"
                        onClick={() => onValidate(selectedTicket.id, false)}
                      >
                        <XCircle className="h-4 w-4 text-red-500" />
                        <span>Invalid</span>
                      </Button>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Assignment Group</label>
                    <Select 
                      defaultValue={selectedTicket.assignmentGroup}
                      onValueChange={(value) => onReassign(selectedTicket.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select group" />
                      </SelectTrigger>
                      <SelectContent>
                        {assignmentGroups.map((group) => (
                          <SelectItem key={group} value={group}>{group}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Assigned To</label>
                    <Select 
                      defaultValue={selectedTicket.assignedTo}
                      onValueChange={(value) => onUpdateAssignee(selectedTicket.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select user" />
                      </SelectTrigger>
                      <SelectContent>
                        {userNames.map((user) => (
                          <SelectItem key={user} value={user}>{user}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700">Priority</label>
                    <div className="mt-1 grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        className={`${getPriorityColor('Critical')}`}
                        onClick={() => onPrioritize(selectedTicket.id, 'Critical')}
                      >
                        Critical
                      </Button>
                      <Button 
                        variant="outline"
                        className={`${getPriorityColor('High')}`}
                        onClick={() => onPrioritize(selectedTicket.id, 'High')}
                      >
                        High
                      </Button>
                      <Button 
                        variant="outline"
                        className={`${getPriorityColor('Medium')}`}
                        onClick={() => onPrioritize(selectedTicket.id, 'Medium')}
                      >
                        Medium
                      </Button>
                      <Button 
                        variant="outline"
                        className={`${getPriorityColor('Low')}`}
                        onClick={() => onPrioritize(selectedTicket.id, 'Low')}
                      >
                        Low
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Button 
                  variant="outline" 
                  className="w-full text-left flex justify-between items-center"
                  onClick={() => setShowChanges(!showChanges)}
                >
                  <span>Ticket Changes History</span>
                  {showChanges ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </Button>
                
                {showChanges && (selectedTicket.changes?.length ?? 0) > 0 && (
                  <ScrollArea className="h-[200px] mt-2 rounded-md border p-4">
                    {selectedTicket.changes?.map((change) => (
                      <div key={change.id} className="py-2 border-b border-gray-100 last:border-0">
                        <div className="flex justify-between items-center">
                          <div className="font-medium">{change.field}</div>
                          <div className="text-xs text-gray-500">{formatDate(change.timestamp)}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-1">
                          <div className="text-sm">
                            <span className="text-gray-500">Previous: </span>
                            <span>{change.previousValue}</span>
                          </div>
                          <div className="text-sm">
                            <span className="text-gray-500">New: </span>
                            <span>{change.newValue}</span>
                          </div>
                        </div>
                        {change.predictedValue && (
                          <div className="text-sm mt-1">
                            <span className="text-gray-500">AI Predicted: </span>
                            <span className="text-triage-primary">{change.predictedValue}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </ScrollArea>
                )}
                
                {showChanges && (!selectedTicket.changes || selectedTicket.changes.length === 0) && (
                  <div className="mt-2 text-sm text-gray-500 text-center py-4">
                    No changes recorded for this ticket.
                  </div>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TicketsList;
