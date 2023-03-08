import styled from '@emotion/styled';

export const Main = styled.main`
  display: flex;
  flex-direction: column;
  gap: var(--offset-xl);
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  background-color: var(--color-background);
`;

export const BreadcrumbsWrap = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 0 calc(var(--offset-xl) * 2);
`;

export const OutletWrap = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
