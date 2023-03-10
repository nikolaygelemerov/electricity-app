import { memo } from 'react';

import * as S from './styled';
import type { DatePickerProps } from './types';

export const DatePicker = memo<DatePickerProps>(({ className, id, name }) => {
  return <S.Input className={className} id={id} name={name} type="date" />;
});

DatePicker.displayName = 'DatePicker';
