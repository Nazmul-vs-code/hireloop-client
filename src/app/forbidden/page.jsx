'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@heroui/react';

const ForbiddenPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#020105] text-zinc-100 p-6 text-center">
      {/* Icon Area */}
      <div className="mb-8 p-4 bg-rose-500/10 rounded-full">
        <svg 
          className="w-16 h-16 text-rose-500" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
          />
        </svg>
      </div>

      {/* Text Content */}
      <h1 className="text-4xl font-bold mb-4">Access Denied</h1>
      <p className="text-zinc-500 max-w-md mb-8">
        You do not have the necessary permissions to view this page. Please check your credentials or return to the dashboard.
      </p>

      {/* Navigation Button */}
      <Link 
        
        href="/" 
        
       
      >
        <Button variant='danger'>

        Back to Home
        </Button>
      </Link>
    </div>
  );
};

export default ForbiddenPage;