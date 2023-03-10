import styled from '@emotion/styled';
import { HeightTransitionBox as HeightTransitionBoxLib } from '@rounik/react-form-builder';

import { Form as RemixForm } from '@remix-run/react';

export const Container = styled.div`
  display: grid;
  /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
  grid-template-columns: 1fr 8fr;
  gap: calc(var(--offset-xl) * 3);
  width: 100%;
  padding: calc(var(--offset-xl) * 3);

  @media screen and (max-width: 850px) {
    /* stylelint-disable-next-line plugin/no-unsupported-browser-features */
    grid-template-columns: 1fr;
  }
`;

export const Filters = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: calc(var(--offset-xl) * 3);

  @media screen and (max-width: 850px) {
    align-items: center;
  }
`;

export const Form = styled(RemixForm)`
  display: flex;
  flex-direction: column;
  gap: var(--offset-xl);
`;

export const Field = styled.p`
  display: flex;
  flex-direction: column;
  gap: var(--offset-m);

  @media screen and (max-width: 850px) {
    flex-direction: row;
    gap: var(--offset-xl);
    align-items: center;
    justify-content: space-between;
  }
`;

export const Label = styled.label`
  color: var(--color-text);
  font-weight: var(--font-weight-bold);
  font-size: var(--font-size-xxl);
`;

export const ChartWrap = styled.div`
  display: flex;
  flex: 4;
  flex-direction: column;
  gap: calc(var(--offset-xl) * 3);
  overflow: hidden;
`;

export const HeightTransitionBox = styled(HeightTransitionBoxLib)`
  width: 100%;
  overflow-x: hidden !important;

  > div {
    overflow-x: hidden !important;
  }
`;
