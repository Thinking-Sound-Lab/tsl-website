'use client';

import { createContext, useContext, ReactNode } from 'react';

interface WaitlistContextType {
  openWaitlist: () => void;
}

const WaitlistContext = createContext<WaitlistContextType | undefined>(undefined);

export function WaitlistProvider({ 
  children, 
  onOpenWaitlist 
}: { 
  children: ReactNode; 
  onOpenWaitlist: () => void;
}) {
  return (
    <WaitlistContext.Provider value={{ openWaitlist: onOpenWaitlist }}>
      {children}
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const context = useContext(WaitlistContext);
  if (context === undefined) {
    throw new Error('useWaitlist must be used within a WaitlistProvider');
  }
  return context;
}