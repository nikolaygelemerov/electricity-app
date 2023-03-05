import styled from '@emotion/styled';

import { Form as RemixForm } from '@remix-run/react';

export const Form = styled(RemixForm)`
  display: flex;
  flex-direction: column;
  gap: calc(var(--offset-xl) * 3);
`;
