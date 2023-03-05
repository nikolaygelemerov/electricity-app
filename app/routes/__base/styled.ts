import styled from '@emotion/styled';
import { HeightTransitionBox as HeightTransitionBoxLib } from '@rounik/react-form-builder';

import { Form as RemixForm } from '@remix-run/react';

export const Container = styled.div`
  display: flex;
  gap: calc(var(--offset-xl) * 3);
  align-items: flex-start;
  width: 100%;
  padding: calc(var(--offset-xl) * 3);
`;

export const Filters = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: calc(var(--offset-xl) * 3);
`;

export const Form = styled(RemixForm)`
  display: flex;
  flex-direction: column;
  gap: calc(var(--offset-xl) * 3);
`;

export const ChartWrap = styled.div`
  display: flex;
  flex: 4;
  flex-direction: column;
  gap: calc(var(--offset-xl) * 3);
`;

export const HeightTransitionBox = styled(HeightTransitionBoxLib)`
  width: 100%;
`;
