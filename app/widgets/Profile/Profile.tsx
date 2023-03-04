import { memo } from 'react';

import { Form } from '@remix-run/react';

import { Button } from '~/components';
import type { ProfileData } from '~/types';

import * as S from './styled';

interface ProfileProps {
  profileData: ProfileData;
}

export const Profile = memo<ProfileProps>(({ profileData }) => {
  return (
    <S.Container>
      <S.P>{profileData.email}</S.P>
      <Form action="/logout" method="post">
        <Button text="logout" variant="error" />
      </Form>
    </S.Container>
  );
});

Profile.displayName = 'Profile';
