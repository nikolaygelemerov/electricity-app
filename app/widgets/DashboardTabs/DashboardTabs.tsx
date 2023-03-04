import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaChartBar, FaTachometerAlt } from 'react-icons/fa';

import { Link } from '~/components';

import * as S from './styled';

export const DashBoardTabs = memo(() => {
  const { t } = useTranslation();

  return (
    <S.Container>
      <Link to="usage-dashboard" variant="navigate">
        {t('usage')}
        <FaChartBar />
      </Link>
      <Link to="customer-dashboard" variant="navigate">
        {t('customer')}
        <FaTachometerAlt />
      </Link>
    </S.Container>
  );
});

DashBoardTabs.displayName = 'DashBoardTabs';
