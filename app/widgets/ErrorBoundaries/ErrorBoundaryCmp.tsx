import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { Link } from '@remix-run/react';

import * as S from './styled';

interface ErrorBoundaryCmpProps {
  error: Error;
  message: string;
}

export const ErrorBoundaryCmp = memo<ErrorBoundaryCmpProps>(({ error, message }) => {
  const { t } = useTranslation();

  return (
    <S.Main>
      <S.P>{t(error.message || message)}</S.P>
      <S.P>
        {t('backTo')} <Link to="/"> {t('safety')}</Link>
      </S.P>
    </S.Main>
  );
});

ErrorBoundaryCmp.displayName = 'ErrorBoundaryCmp';
