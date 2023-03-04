import type { LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

import { getUserFromSession } from '~/data/auth.server';
import { SC } from '~/styled';
import { LanguageSwitch } from '~/widgets';
import { Breadcrumbs, Profile } from '~/widgets';

export default function Index() {
  const profileData = useLoaderData<typeof loader>();

  return (
    <SC.Main>
      <SC.Header>
        <Breadcrumbs />
        <SC.HeaderSubGroup>
          <LanguageSwitch />
          {profileData ? <Profile profileData={profileData} /> : null}
        </SC.HeaderSubGroup>
      </SC.Header>
      <Outlet />
    </SC.Main>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  return getUserFromSession(request);
};
