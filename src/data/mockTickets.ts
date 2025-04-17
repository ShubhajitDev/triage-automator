
export interface Ticket {
  id: string;
  shortDescription: string;
  description: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'New' | 'Open' | 'In Progress' | 'Resolved' | 'Closed';
  assignmentGroup: string;
  assignedTo: string;
  createdDate: string;
  lastUpdated: string;
  validationStatus?: 'Valid' | 'Invalid' | 'Pending' | null;
  changes?: TicketChange[];
}

export interface TicketChange {
  id: string;
  ticketId: string;
  field: string;
  previousValue: string;
  newValue: string;
  predictedValue?: string;
  timestamp: string;
  appliedBy: string;
}

export const assignmentGroups = [
  'Network Team',
  'Database Team',
  'Application Support',
  'Server Team',
  'Security Team',
  'Desktop Support',
  'Cloud Infrastructure'
];

export const userNames = [
  'Alex Johnson',
  'Sam Williams',
  'Jordan Smith',
  'Casey Brown',
  'Taylor Davis',
  'Morgan Wilson',
  'Riley Martinez',
  'Jamie Anderson',
  'Avery Thomas',
  'Jordan Taylor'
];

// Generate mock data for tickets
export const generateMockTickets = (count: number): Ticket[] => {
  const tickets: Ticket[] = [];
  const statuses: Ticket['status'][] = ['New', 'Open', 'In Progress', 'Resolved', 'Closed'];
  const priorities: Ticket['priority'][] = ['Critical', 'High', 'Medium', 'Low'];
  
  const ticketDescriptions = [
    "Unable to access network drive",
    "Database connection timeout",
    "Application crashes on startup",
    "Server unresponsive",
    "Email delivery issues",
    "Password reset request",
    "Printer not connecting",
    "Data sync failure",
    "VPN access problem",
    "Website loading error"
  ];
  
  for (let i = 0; i < count; i++) {
    const id = `INC${100000 + i}`;
    const shortDesc = ticketDescriptions[Math.floor(Math.random() * ticketDescriptions.length)];
    const longDesc = `Detailed description for ticket: ${shortDesc}. The issue requires urgent attention as it affects business operations.`;
    const priorityIndex = Math.floor(Math.random() * priorities.length);
    const statusIndex = Math.floor(Math.random() * statuses.length);
    const assignmentGroupIndex = Math.floor(Math.random() * assignmentGroups.length);
    const assignedToIndex = Math.floor(Math.random() * userNames.length);
    
    // Generate random dates
    const createdDate = new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString();
    const lastUpdated = new Date(new Date(createdDate).getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString();
    
    tickets.push({
      id,
      shortDescription: shortDesc,
      description: longDesc,
      priority: priorities[priorityIndex],
      status: statuses[statusIndex],
      assignmentGroup: assignmentGroups[assignmentGroupIndex],
      assignedTo: userNames[assignedToIndex],
      createdDate,
      lastUpdated,
      validationStatus: Math.random() > 0.7 ? 'Pending' : null,
      changes: []
    });
  }
  
  return tickets;
};

export const mockTickets = generateMockTickets(20);

export const mockChanges: TicketChange[] = [
  {
    id: "change1",
    ticketId: "INC100000",
    field: "assignmentGroup",
    previousValue: "Desktop Support",
    newValue: "Network Team",
    predictedValue: "Network Team",
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    appliedBy: "AI Triage System"
  },
  {
    id: "change2",
    ticketId: "INC100001",
    field: "priority",
    previousValue: "Low",
    newValue: "High",
    predictedValue: "High",
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    appliedBy: "AI Triage System"
  },
  {
    id: "change3",
    ticketId: "INC100002",
    field: "shortDescription",
    previousValue: "System down",
    newValue: "Database server unresponsive - critical impact",
    predictedValue: "Database server unresponsive - critical impact",
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
    appliedBy: "AI Triage System"
  },
  {
    id: "change4",
    ticketId: "INC100003",
    field: "assignmentGroup",
    previousValue: "Application Support",
    newValue: "Database Team",
    predictedValue: "Database Team",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    appliedBy: "AI Triage System"
  },
  {
    id: "change5",
    ticketId: "INC100004",
    field: "priority",
    previousValue: "Medium",
    newValue: "Critical",
    predictedValue: "Critical",
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    appliedBy: "AI Triage System"
  }
];

// Add changes to tickets
mockTickets.forEach(ticket => {
  ticket.changes = mockChanges.filter(change => change.ticketId === ticket.id);
});

// Function to calculate ticket statistics for the dashboard
export const getTicketStats = () => {
  const totalTickets = mockTickets.length;
  const openTickets = mockTickets.filter(t => t.status !== 'Closed' && t.status !== 'Resolved').length;
  const resolvedTickets = mockTickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length;
  const pendingValidation = mockTickets.filter(t => t.validationStatus === 'Pending').length;
  
  // Get changes by field
  const changesByField = mockChanges.reduce<Record<string, number>>((acc, change) => {
    if (!acc[change.field]) {
      acc[change.field] = 0;
    }
    acc[change.field]++;
    return acc;
  }, {});
  
  // Get changes by date
  const now = new Date();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  
  const changesByDay: Record<string, number> = {};
  for (let i = 0; i < 7; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    changesByDay[date.toISOString().split('T')[0]] = 0;
  }
  
  mockChanges.forEach(change => {
    const changeDate = new Date(change.timestamp);
    if (changeDate >= sevenDaysAgo) {
      const dateStr = changeDate.toISOString().split('T')[0];
      if (changesByDay[dateStr] !== undefined) {
        changesByDay[dateStr]++;
      }
    }
  });
  
  const ticketsByPriority = {
    Critical: mockTickets.filter(t => t.priority === 'Critical').length,
    High: mockTickets.filter(t => t.priority === 'High').length,
    Medium: mockTickets.filter(t => t.priority === 'Medium').length,
    Low: mockTickets.filter(t => t.priority === 'Low').length
  };
  
  return {
    totalTickets,
    openTickets,
    resolvedTickets,
    pendingValidation,
    changesByField,
    changesByDay: Object.entries(changesByDay).map(([date, count]) => ({
      date,
      count
    })).sort((a, b) => a.date.localeCompare(b.date)),
    ticketsByPriority
  };
};
