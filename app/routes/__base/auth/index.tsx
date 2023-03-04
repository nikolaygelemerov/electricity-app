import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import { Link } from '~/components';
import { getUserFromSession } from '~/data/auth.server';

const Login = memo(() => {
  const { t } = useTranslation();

  return (
    <>
      <Link to="login" variant="success">
        <span>{t('login')}</span>
        <FaSignInAlt />
      </Link>
      <Link to="signup" variant="confirm">
        <span>{t('signup')}</span>
        <FaUserPlus />
      </Link>
    </>
  );
});

Login.displayName = 'Login';

export default Login;

export const loader: LoaderFunction = async ({ request }) => {
  const profileData = await getUserFromSession(request);

  if (profileData) {
    return redirect('/');
  }

  return profileData;
};
