
import React from 'react';
import Header from '@/components/Header';
import UseCaseCard from '@/components/UseCaseCard';
import { useCases } from '@/data/useCases';

const Index = () => {
  return (
    <div className="min-h-screen bg-triage-background flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto py-8 px-4">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">AIOps Usecases</h2>
          <p className="text-gray-600">Select an AIOps use case to get started</p>
        </section>
        
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {useCases.map((useCase, index) => (
              <UseCaseCard 
                key={useCase.id}
                title={useCase.title}
                description={useCase.description}
                path={useCase.path}
                icon={useCase.icon}
                index={index}
              />
            ))}
          </div>
        </section>
      </main>
      
      <footer className="bg-white py-6 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-600">© {new Date().getFullYear()} AIOps Usecases. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
