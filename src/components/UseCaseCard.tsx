
import React from 'react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface UseCaseCardProps {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
  bgColor?: string;
  index: number;
}

const UseCaseCard = ({
  title,
  description,
  path,
  icon: Icon,
  bgColor = "bg-white",
  index
}: UseCaseCardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg shadow-md hover:shadow-lg transition-all duration-200",
        "transform hover:-translate-y-1 opacity-0",
        bgColor
      )}
      style={{
        animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`
      }}
    >
      <Link to={path} className="block p-6">
        <div className="flex flex-col items-center text-center">
          <div className="p-3 rounded-full bg-triage-muted text-triage-primary mb-4">
            <Icon className="h-8 w-8" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600">{description}</p>
        </div>
      </Link>
      
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default UseCaseCard;
