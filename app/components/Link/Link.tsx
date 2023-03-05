import { memo } from 'react';

import * as S from './styled';
import type { LinkProps } from './types';

export const Link = memo<LinkProps>(({ children, size = 'large', to, variant }) => {
  return (
    <S.Link size={size} to={to} variant={variant}>
      {children}
    </S.Link>
  );
});

Link.displayName = 'Link';
