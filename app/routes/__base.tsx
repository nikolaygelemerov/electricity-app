import type { LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';

import { getUserFromSession } from '~/data/auth.server';
import { LanguageSwitch } from '~/widgets';
import { Breadcrumbs, Logo, Profile } from '~/widgets';

import * as S from './styled';

export default function Index() {
  const profileData = useLoaderData<typeof loader>();

  return (
    <S.Main>
      <S.Header>
        <Logo />
        <S.HeaderSubGroup>
          <LanguageSwitch />
          {profileData ? <Profile profileData={profileData} /> : null}
        </S.HeaderSubGroup>
      </S.Header>
      <S.BreadcrumbsWrap>
        <Breadcrumbs />
      </S.BreadcrumbsWrap>
      <S.OutletWrap>
        <Outlet />
      </S.OutletWrap>
    </S.Main>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  return getUserFromSession(request);
};
