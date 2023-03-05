import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChartBar } from 'react-icons/fa';

import { Link } from '~/components';
import { METERING_POINTS } from '~/services';

import * as S from './styled';

export const MeteringPointTabs = memo(() => {
  const { t } = useTranslation();

  return (
    <S.Container>
      <S.H2>{t('meteringPoints')}</S.H2>
      <S.LinksWrap>
        {METERING_POINTS.map((point) => (
          <Link key={point} to={point} variant="navigate">
            {point}
            <FaChartBar />
          </Link>
        ))}
      </S.LinksWrap>
    </S.Container>
  );
});

MeteringPointTabs.displayName = 'MeteringPointTabs';
