import { memo } from 'react';

import * as S from './styled';
import type { LinkProps } from './types';

export const Link = memo<LinkProps>(({ children, className, size = 'large', to, variant }) => {
  return (
    <S.Link className={className} size={size} to={to} variant={variant}>
      {children}
    </S.Link>
  );
});

Link.displayName = 'Link';
