import styled from '@emotion/styled';

import type { ButtonStyledProps } from './types';

export const Button = styled.button<ButtonStyledProps>`
  display: flex;
  gap: var(--offset-xl);
  align-items: center;
  justify-content: center;
  padding: ${(props) => (props.size === 'medium' ? `var(--offset-l)` : `var(--offset-xl)`)};
  color: var(--color-text);
  font-size: ${(props) =>
    props.size === 'medium' ? `var(--font-size-m)` : `var(--font-size-xxl)`};
  text-decoration: none;
  background-color: ${(props) => `var(--color-${props.variant})`};
  border: none;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  cursor: pointer;
  transition: all var(--transition-duration-normal) ease-in-out;
`;
