
"use client"
import { QueryClient, QueryClientProvider as Provider } from '@tanstack/react-query';
import React from 'react';

const queryClient = new QueryClient();
type Props = {
  children: React.ReactNode
}
export default function QueryClientProvider({ children }: Props) {
  return (
    <Provider client={queryClient}>
      {children}
    </Provider>
  );
}
