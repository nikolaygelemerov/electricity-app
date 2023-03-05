import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { useCatch } from '@remix-run/react';

import * as S from './styled';

interface CatchBoundaryCmpProps {
  message: string;
}

export const CatchBoundaryCmp = memo<CatchBoundaryCmpProps>(({ message }) => {
  const caughtResponse = useCatch();

  const { t } = useTranslation();

  return (
    <S.Main>
      <S.P>{caughtResponse.status}</S.P>
      <S.P>{t(caughtResponse.data?.message || message)}</S.P>
    </S.Main>
  );
});

CatchBoundaryCmp.displayName = 'CatchBoundaryCmp';
