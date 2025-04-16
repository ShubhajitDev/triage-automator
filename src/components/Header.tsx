
import React from 'react';
import { Activity } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 bg-gradient-to-r from-triage-secondary to-triage-primary text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-7 w-7" />
            <h1 className="text-2xl md:text-3xl font-bold">AIOps Usecases</h1>
          </div>
          <div className="text-sm md:text-base font-medium">
            Dashboard Portal
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
