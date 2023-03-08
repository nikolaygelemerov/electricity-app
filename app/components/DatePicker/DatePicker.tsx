import { memo } from 'react';

import * as S from './styled';
import type { DatePickerProps } from './types';

export const DatePicker = memo<DatePickerProps>(({ id, name }) => {
  return <S.Input id={id} name={name} type="date" />;
});

DatePicker.displayName = 'DatePicker';
