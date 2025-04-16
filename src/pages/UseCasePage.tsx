
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCases } from '@/data/useCases';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const UseCasePage = () => {
  const { id } = useParams<{ id: string }>();
  const useCase = useCases.find(uc => uc.id === id);
  
  if (!useCase) {
    return (
      <div className="min-h-screen bg-triage-background flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Use Case Not Found</h1>
        <Button asChild>
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
      </div>
    );
  }

  const Icon = useCase.icon;

  return (
    <div className="min-h-screen bg-triage-background">
      <div className="container mx-auto py-8 px-4">
        <Button variant="outline" asChild className="mb-8">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="flex items-center mb-6">
            <div className="p-3 rounded-full bg-triage-muted text-triage-primary mr-4">
              <Icon className="h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold">{useCase.title}</h1>
          </div>
          
          <p className="text-gray-600 text-lg mb-8">{useCase.description}</p>
          
          <div className="p-8 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-center text-gray-500">This is a placeholder for the {useCase.title.toLowerCase()} functionality.</p>
            <p className="text-center text-gray-500">Implementation coming soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UseCasePage;
