import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import * as S from './styled';
import type { DatePickerProps } from './types';

export const DatePicker = memo<DatePickerProps>(({ id, label, name }) => {
  const { t } = useTranslation();

  return (
    <S.Container>
      <S.Label htmlFor={id}>{t(label)}</S.Label>
      <S.Input id={id} name={name} type="date" />
    </S.Container>
  );
});

DatePicker.displayName = 'DatePicker';
