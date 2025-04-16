
import { 
  Ticket, 
  Mail, 
  MessageSquare, 
  AlertTriangle
} from 'lucide-react';

export interface UseCase {
  id: string;
  title: string;
  description: string;
  path: string;
  icon: any;
}

export const useCases: UseCase[] = [
  {
    id: 'ticket-triage',
    title: 'Ticket Triage',
    description: 'Uses ML model trained in historical ticket data to suggest the correct assignment group, priority and impact reducing manual effort',
    path: '/ticket-triage',
    icon: Ticket
  },
  {
    id: 'mail-classification',
    title: 'Mail Classification',
    description: 'Automates the sorting and ticket creation process by classifying multi-issue emails using an ML model and generating tickets via API',
    path: '/mail-classification',
    icon: Mail
  },
  {
    id: 'sop-chatbot',
    title: 'SOP Chatbot',
    description: 'A chatbot trained on SOP documents that helps users resolve common issues instantly by providing step-by-step solutions',
    path: '/sop-chatbot',
    icon: MessageSquare
  },
  {
    id: 'anomaly-detection',
    title: 'Anomaly Detection',
    description: 'Detects system anomalies using ML and auto-generates RCA reports to accelerate incidents analysis and response',
    path: '/anomaly-detection',
    icon: AlertTriangle
  }
];
