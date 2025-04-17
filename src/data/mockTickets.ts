
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
  confidence?: number;
  timestamp: string;
  appliedBy: string;
}

interface ConfusionPoint {
  field: string;
  originalValue: string;
  predictedValue: string;
  count: number;
}

interface Misclassification {
  ticketId: string;
  field: string;
  originalValue: string;
  predictedValue: string;
}

interface BeforeAfterComparison {
  id: string;
  ticketId: string;
  field: string;
  originalValue: string;
  predictedValue: string;
  confidence: number;
  correct: boolean;
  description?: string;
  createdDate?: string;
  status?: string;
}

interface SampleCase {
  ticketId: string;
  description: string;
  field: string;
  originalValue: string;
  predictedValue: string;
  confidence: number;
  correct: boolean;
  reasoning: string;
  createdDate: string;
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
    confidence: 0.89,
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
    confidence: 0.76,
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
    confidence: 0.94,
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
    confidence: 0.82,
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
    confidence: 0.91,
    timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
    appliedBy: "AI Triage System"
  },
  {
    id: "change6",
    ticketId: "INC100005",
    field: "assignmentGroup",
    previousValue: "Desktop Support",
    newValue: "Server Team",
    predictedValue: "Security Team",
    confidence: 0.65,
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
    appliedBy: "AI Triage System"
  },
  {
    id: "change7",
    ticketId: "INC100006",
    field: "shortDescription",
    previousValue: "Can't login",
    newValue: "Authentication failure after password reset",
    predictedValue: "Authentication failure after password reset",
    confidence: 0.88,
    timestamp: new Date(Date.now() - 72 * 60 * 60 * 1000).toISOString(),
    appliedBy: "AI Triage System"
  },
  {
    id: "change8",
    ticketId: "INC100007",
    field: "priority",
    previousValue: "Low",
    newValue: "Medium",
    predictedValue: "Medium",
    confidence: 0.73,
    timestamp: new Date(Date.now() - 96 * 60 * 60 * 1000).toISOString(),
    appliedBy: "AI Triage System"
  },
  {
    id: "change9",
    ticketId: "INC100008",
    field: "assignmentGroup",
    previousValue: "Network Team",
    newValue: "Cloud Infrastructure",
    predictedValue: "Cloud Infrastructure",
    confidence: 0.85,
    timestamp: new Date(Date.now() - 120 * 60 * 60 * 1000).toISOString(),
    appliedBy: "AI Triage System"
  },
  {
    id: "change10",
    ticketId: "INC100009",
    field: "shortDescription",
    previousValue: "Email not working",
    newValue: "Exchange server connectivity issues affecting email delivery",
    predictedValue: "Exchange server connectivity issues affecting email delivery",
    confidence: 0.92,
    timestamp: new Date(Date.now() - 144 * 60 * 60 * 1000).toISOString(),
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
  
  // Count total changes
  const changesCount = mockChanges.length;
  
  // Count changes where prediction matched the new value
  const matchedChangesCount = mockChanges.filter(
    change => change.newValue === change.predictedValue
  ).length;
  
  // Get changes by field
  const changesByField = mockChanges.reduce<Record<string, number>>((acc, change) => {
    if (!acc[change.field]) {
      acc[change.field] = 0;
    }
    acc[change.field]++;
    return acc;
  }, {});
  
  // Calculate field accuracy
  const fieldAccuracy = mockChanges.reduce<Record<string, number>>((acc, change) => {
    if (!acc[change.field]) {
      acc[change.field] = 0;
      acc[`${change.field}_total`] = 0;
    }
    
    acc[`${change.field}_total`]++;
    
    if (change.newValue === change.predictedValue) {
      acc[change.field]++;
    }
    
    return acc;
  }, {});
  
  // Convert counts to percentages
  const fieldAccuracyPercentages = Object.keys(fieldAccuracy)
    .filter(key => !key.endsWith('_total'))
    .reduce<Record<string, number>>((acc, field) => {
      acc[field] = fieldAccuracy[field] / fieldAccuracy[`${field}_total`];
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
  
  // Generate confusion points
  const confusionPoints: ConfusionPoint[] = [
    {
      field: "assignmentGroup",
      originalValue: "Desktop Support",
      predictedValue: "Network Team",
      count: 5
    },
    {
      field: "assignmentGroup",
      originalValue: "Server Team",
      predictedValue: "Cloud Infrastructure",
      count: 3
    },
    {
      field: "priority",
      originalValue: "Low",
      predictedValue: "Medium",
      count: 7
    },
    {
      field: "priority",
      originalValue: "Medium",
      predictedValue: "High",
      count: 4
    },
    {
      field: "shortDescription",
      originalValue: "System error",
      predictedValue: "Application crash",
      count: 2
    }
  ];
  
  // Generate misclassification examples
  const misclassifications: Misclassification[] = [
    {
      ticketId: "INC100005",
      field: "assignmentGroup",
      originalValue: "Desktop Support",
      predictedValue: "Security Team"
    },
    {
      ticketId: "INC100011",
      field: "priority",
      originalValue: "Medium",
      predictedValue: "Low"
    },
    {
      ticketId: "INC100013",
      field: "assignmentGroup",
      originalValue: "Application Support",
      predictedValue: "Database Team"
    },
    {
      ticketId: "INC100017",
      field: "priority",
      originalValue: "High",
      predictedValue: "Critical"
    },
    {
      ticketId: "INC100019",
      field: "shortDescription",
      originalValue: "Network issue",
      predictedValue: "Connectivity problem"
    }
  ];
  
  // Generate before/after comparisons
  const beforeAfterComparisons: BeforeAfterComparison[] = mockChanges.map(change => ({
    id: change.id,
    ticketId: change.ticketId,
    field: change.field,
    originalValue: change.previousValue,
    predictedValue: change.predictedValue || '',
    confidence: change.confidence || Math.random() * 0.5 + 0.5, // 50%-100% if not specified
    correct: change.newValue === change.predictedValue,
    description: mockTickets.find(t => t.id === change.ticketId)?.description,
    createdDate: mockTickets.find(t => t.id === change.ticketId)?.createdDate,
    status: mockTickets.find(t => t.id === change.ticketId)?.status
  }));
  
  // Generate confidence buckets (0-20%, 21-40%, etc.)
  const confidenceBuckets = [
    mockChanges.filter(c => (c.confidence || 0) <= 0.2).length,
    mockChanges.filter(c => (c.confidence || 0) > 0.2 && (c.confidence || 0) <= 0.4).length,
    mockChanges.filter(c => (c.confidence || 0) > 0.4 && (c.confidence || 0) <= 0.6).length,
    mockChanges.filter(c => (c.confidence || 0) > 0.6 && (c.confidence || 0) <= 0.8).length,
    mockChanges.filter(c => (c.confidence || 0) > 0.8).length
  ];
  
  // Generate sample cases
  const sampleCases: SampleCase[] = [
    {
      ticketId: "INC100002",
      description: "Database server unresponsive - critical impact. Users cannot access customer information system.",
      field: "priority",
      originalValue: "Medium",
      predictedValue: "Critical",
      confidence: 0.94,
      correct: true,
      reasoning: "ML model detected keywords 'unresponsive' and 'critical impact' suggesting high business impact. System mentioned is the customer information system which is tagged as business critical.",
      createdDate: "2023-04-14T10:23:45Z"
    },
    {
      ticketId: "INC100005",
      description: "User unable to connect to shared drive. Local drive access working fine.",
      field: "assignmentGroup",
      originalValue: "Desktop Support",
      predictedValue: "Network Team",
      confidence: 0.87,
      correct: true,
      reasoning: "Shared drive access issues typically fall under Network Team responsibility. Similar tickets historically were assigned to Network Team 92% of the time.",
      createdDate: "2023-04-15T09:17:32Z"
    },
    {
      ticketId: "INC100009",
      description: "Email delivery delayed by several hours for external recipients.",
      field: "shortDescription",
      originalValue: "Email not working",
      predictedValue: "Exchange server delivery delay affecting external recipients",
      confidence: 0.92,
      correct: true,
      reasoning: "Model identified specific issue (delay) and scope (external only) from description and enhanced the title to be more descriptive and actionable.",
      createdDate: "2023-04-13T15:42:18Z"
    },
    {
      ticketId: "INC100013",
      description: "Application crashes when generating monthly reports. Error log shows database connection timeout.",
      field: "assignmentGroup",
      originalValue: "Application Support",
      predictedValue: "Database Team",
      confidence: 0.68,
      correct: false,
      reasoning: "Model detected 'database connection timeout' and assigned to Database Team, but the root cause was actually in the application code that wasn't handling timeouts properly.",
      createdDate: "2023-04-11T14:33:27Z"
    }
  ];
  
  return {
    totalTickets,
    openTickets,
    resolvedTickets,
    pendingValidation,
    changesCount,
    matchedChangesCount,
    changesByField,
    fieldAccuracy: fieldAccuracyPercentages,
    changesByDay: Object.entries(changesByDay).map(([date, count]) => ({
      date,
      count
    })).sort((a, b) => a.date.localeCompare(b.date)),
    ticketsByPriority,
    confusionPoints,
    misclassifications,
    beforeAfterComparisons,
    confidenceBuckets,
    sampleCases
  };
};
