import { memo, useState } from 'react';
import { FaBars } from 'react-icons/fa';

import { useLoaderData } from '@remix-run/react';

import { LanguageSwitch } from '../LanguageSwitch/LanguageSwitch';
import { Logo } from '../Logo/Logo';
import { Profile } from '../Profile/Profile';
import * as S from './styled';

export const SideDrawer = memo(() => {
  const [isOpen, setIsOpen] = useState(false);

  const profileData = useLoaderData();

  return (
    <S.Container
      onAnimationEnd={(e) => {
        console.log(isOpen);
        console.log(e.animationName);

        if (e.animationName === 'slide-out-left' && isOpen) {
          setIsOpen(false);
        }
      }}
      opened={isOpen}
      role="complementary"
    >
      <S.Group>
        <Logo />
        <LanguageSwitch />
      </S.Group>
      <S.ProfileWrap>{profileData ? <Profile profileData={profileData} /> : null}</S.ProfileWrap>
      <S.BarOpenWrap
        onClick={() => {
          setIsOpen(true);
        }}
        opened={isOpen}
      >
        <FaBars color="var(--color-header-background)" />
      </S.BarOpenWrap>
      <S.BarCloseWrap
        onClick={() => {
          setIsOpen(false);
        }}
        opened={isOpen}
      >
        <FaBars color="var(--color-selected)" />
      </S.BarCloseWrap>
    </S.Container>
  );
});

SideDrawer.displayName = 'SideDrawer';
