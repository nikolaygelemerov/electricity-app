import { useTranslation } from 'react-i18next';
import { FaArrowRight } from 'react-icons/fa';

import type { LoaderFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import { Link } from '~/components';
import { getUserFromSession } from '~/data/auth.server';
import { DashBoardTabs } from '~/widgets';

export default function Index() {
  const { t } = useTranslation();

  const profileData = useLoaderData<typeof loader>();

  return profileData ? (
    <DashBoardTabs />
  ) : (
    <Link to="/auth" variant="success">
      <span>{t('login')}</span>
      <FaArrowRight />
    </Link>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  return getUserFromSession(request);
};
