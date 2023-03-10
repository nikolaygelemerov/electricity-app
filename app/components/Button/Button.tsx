import type { FC } from 'react';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import * as S from './styled';
import type { ButtonProps } from './types';

export const Button: FC<ButtonProps> = memo(
  ({ className, dataTest, disabled, onClick, size = 'large', text, variant }) => {
    const { t } = useTranslation();

    return (
      <S.Button
        className={className}
        data-test={dataTest}
        disabled={disabled}
        onClick={onClick}
        size={size}
        text={text}
        variant={variant}
      >
        {t(text)}
      </S.Button>
    );
  }
);

Button.displayName = 'Button';
