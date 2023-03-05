import type { ReactNode } from 'react';

export interface LinkProps {
  children: ReactNode;
  size?: 'medium' | 'large';
  to: string;
  variant: 'success' | 'error' | 'confirm' | 'link' | 'navigate';
}
