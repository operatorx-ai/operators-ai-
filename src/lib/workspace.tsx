"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface WorkspaceContextProps {
  workspaceId: string | null;
  setWorkspaceId: (id: string | null) => void;
}

const WorkspaceContext = createContext<WorkspaceContextProps | undefined>(undefined);

export const WorkspaceProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [workspaceId, setWorkspaceId] = useState<string | null>(null);
  return (
    <WorkspaceContext.Provider value={{ workspaceId, setWorkspaceId }}>
      {children}
    </WorkspaceContext.Provider>
  );
};

export default WorkspaceProvider;

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) throw new Error('useWorkspace must be used within a WorkspaceProvider');
  return context;
}
