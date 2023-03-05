import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChartBar } from 'react-icons/fa';

import type { ChartSelectValue } from '~/types';

import * as S from './styled';

interface ChartSelectProps {
  onChange: (value: 'price' | 'usage') => void;
  value: ChartSelectValue;
}

export const ChartSelect = memo<ChartSelectProps>(({ onChange, value }) => {
  const { t } = useTranslation();

  return (
    <S.Container>
      <S.Button onClick={() => onChange('price')} selected={value.price} type="button">
        {t('price')}
        <FaChartBar />
      </S.Button>
      <S.Button onClick={() => onChange('usage')} selected={value.usage} type="button">
        {t('usage')}
        <FaChartBar />
      </S.Button>
    </S.Container>
  );
});

ChartSelect.displayName = 'ChartSelect';
