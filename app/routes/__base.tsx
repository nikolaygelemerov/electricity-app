import type { LoaderFunction } from '@remix-run/node';
import { Outlet } from '@remix-run/react';

import { getUserFromSession } from '~/data/auth.server';
import { Breadcrumbs, Header, SideDrawer } from '~/widgets';

import * as S from './styled';

export default function Index() {
  return (
    <S.Main>
      <Header />
      <S.BreadcrumbsWrap>
        <Breadcrumbs />
      </S.BreadcrumbsWrap>
      <S.OutletWrap>
        <Outlet />
      </S.OutletWrap>
      <SideDrawer />
    </S.Main>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  return getUserFromSession(request);
};
