import styled from '@emotion/styled';

export const Container = styled.header`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--offset-xl) calc(var(--offset-xl) * 2);
  background-color: var(--color-header-background);
  box-shadow: var(--box-shadow);

  @media (max-width: 730px) {
    display: none;
  }
`;

export const Group = styled.div`
  display: flex;
  gap: calc(var(--offset-xl) * 4);
`;
