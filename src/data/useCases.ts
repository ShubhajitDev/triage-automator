
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
    description: 'Automated prioritization and routing of support tickets',
    path: '/ticket-triage',
    icon: Ticket
  },
  {
    id: 'mail-classification',
    title: 'Mail Classification',
    description: 'Intelligent email sorting and categorization',
    path: '/mail-classification',
    icon: Mail
  },
  {
    id: 'sop-chatbot',
    title: 'SOP Chatbot',
    description: 'AI-powered standard operating procedure assistant',
    path: '/sop-chatbot',
    icon: MessageSquare
  },
  {
    id: 'anomaly-detection',
    title: 'Anomaly Detection',
    description: 'Advanced system behavior and performance monitoring',
    path: '/anomaly-detection',
    icon: AlertTriangle
  }
];
