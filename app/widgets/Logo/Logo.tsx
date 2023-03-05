import { memo } from 'react';
import { FaBolt } from 'react-icons/fa';

import * as S from './styled';

export const Logo = memo(() => {
  return (
    <S.Container>
      <FaBolt color="var(--color-selected)" fontSize={40} />
      <S.Span>Power UP</S.Span>
    </S.Container>
  );
});

Logo.displayName = 'Logo';
