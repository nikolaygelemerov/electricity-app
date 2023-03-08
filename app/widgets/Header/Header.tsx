import { memo } from 'react';

import { useLoaderData } from '@remix-run/react';

import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import { Logo } from '../Logo/Logo';
import { Profile } from '../Profile/Profile';
import * as S from './styled';

export const Header = memo(() => {
  const profileData = useLoaderData();

  return (
    <S.Container>
      <Logo />
      <S.Group>
        <LanguageSwitch />
        {profileData ? <Profile profileData={profileData} /> : null}
      </S.Group>
    </S.Container>
  );
});

Header.displayName = 'Header';
