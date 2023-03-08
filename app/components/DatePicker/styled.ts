import styled from '@emotion/styled';

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

  @media screen and (max-width: 850px) {
    flex: 2;
  }
`;
