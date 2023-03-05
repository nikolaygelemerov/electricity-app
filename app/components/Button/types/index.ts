export interface ButtonProps {
  dataTest?: string;
  disabled?: boolean;
  onClick?: () => void;
  size?: 'medium' | 'large';
  text: string;
  variant: 'success' | 'error' | 'confirm';
}

export type ButtonStyledProps = Pick<ButtonProps, 'size' | 'text' | 'variant'>;
