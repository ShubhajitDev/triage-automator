
import { 
  Activity, 
  AlertCircle, 
  Heart, 
  PanelLeft, 
  Activity as Vitals, 
  Clock, 
  ClipboardList,
  UserPlus 
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
    id: 'emergency',
    title: 'Emergency Triage',
    description: 'Prioritize critical cases in emergency settings',
    path: '/emergency',
    icon: AlertCircle
  },
  {
    id: 'cardiac',
    title: 'Cardiac Assessment',
    description: 'Heart-focused evaluation and prioritization',
    path: '/cardiac',
    icon: Heart
  },
  {
    id: 'general',
    title: 'General Triage',
    description: 'Everyday patient assessment and categorization',
    path: '/general',
    icon: PanelLeft
  },
  {
    id: 'vital-signs',
    title: 'Vital Signs',
    description: 'Monitor and evaluate patient vital signs',
    path: '/vitals',
    icon: Vitals
  },
  {
    id: 'waiting-time',
    title: 'Waiting Time',
    description: 'Optimize patient waiting time management',
    path: '/waiting',
    icon: Clock
  },
  {
    id: 'medical-history',
    title: 'Medical History',
    description: 'Quick access to patient medical records',
    path: '/history',
    icon: ClipboardList
  },
  {
    id: 'ambulatory',
    title: 'Ambulatory Care',
    description: 'Outpatient and walk-in prioritization',
    path: '/ambulatory',
    icon: Activity
  },
  {
    id: 'intake',
    title: 'Patient Intake',
    description: 'Streamlined new patient registration',
    path: '/intake',
    icon: UserPlus
  }
];
