import styled from '@emotion/styled';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--offset-m);
`;

export const Label = styled.label`
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-xxl);
`;

export const Input = styled.input`
  padding: var(--offset-xl);
  overflow: hidden;
  color: var(--color-text);
  font-size: var(--font-size-xxl);
  font-family: sans-serif;
  white-space: nowrap;
  text-align: left;
  text-overflow: ellipsis;
  border: none;
  border-radius: var(--border-radius);
  outline: none;
  box-shadow: var(--box-shadow);
  transition: all var(--transition-duration-normal) ease-in-out;

  &::-ms-clear {
    display: none;
  }
`;
