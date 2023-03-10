import styled from '@emotion/styled';

import type { ButtonProps } from './types';

export const Container = styled.div`
  display: flex;
  gap: var(--offset-xl);
  align-items: center;
`;

export const Button = styled.button<ButtonProps>`
  display: flex;
  gap: var(--offset-xl);
  align-items: center;
  justify-content: center;
  padding: var(--offset-l);
  color: var(--color-text);
  font-size: var(--font-size-m);
  text-decoration: none;
  background-color: ${(props) =>
    props.selected ? `var(--color-selected)` : `var(--color-background)`};
  border: none;
  border-radius: var(--border-radius);
  box-shadow: var(--box-shadow);
  cursor: pointer;
  transition: background-color var(--transition-duration-normal) ease-in-out;
`;
