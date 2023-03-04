import { useTranslation } from 'react-i18next';

import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import { getUserFromSession } from '~/data/auth.server';
import { graphQLClient } from '~/entry.server';
import { ELECTRICITY_USAGE_QUERY } from '~/queries';

export default function Index() {
  const { t } = useTranslation();

  return <p>Customer Dashboard</p>;
}

export const loader: LoaderFunction = async ({ request }) => {
  const profileData = await getUserFromSession(request);

  if (!profileData) {
    return redirect('/');
  }

  const result = await graphQLClient.query({
    query: ELECTRICITY_USAGE_QUERY
  });

  console.log('ELECTRICITY CUSTOMER: ', result);

  return profileData;
};
