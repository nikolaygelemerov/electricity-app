import type { ReactNode } from 'react';

export interface LinkProps {
  children: ReactNode;
  className?: string;
  size?: 'medium' | 'large';
  to: string;
  variant: 'success' | 'error' | 'confirm' | 'link' | 'navigate';
}
