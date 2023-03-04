import { memo } from 'react';
import type { ActionFunction } from 'react-router';

import type { ErrorBoundaryComponent, LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import type { CatchBoundaryComponent } from '@remix-run/react';

import { createUserSession, getUserFromSession } from '~/data/auth.server';
import { graphQLClient } from '~/entry.server';
import { SIGNUP_MUTATION } from '~/mutations';
import type { UserData } from '~/types';
import { AuthForm, CatchBoundaryCmp, ErrorBoundaryCmp } from '~/widgets';

const Signup = memo(() => {
  return <AuthForm type="signup" />;
});

Signup.displayName = 'Signup';

export default Signup;

export const loader: LoaderFunction = async ({ request }) => {
  const profileData = await getUserFromSession(request);

  if (profileData) {
    return redirect('/');
  }

  return profileData;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData) as unknown as UserData;

  const {
    data: { signup: user }
  } = await graphQLClient.mutate({
    mutation: SIGNUP_MUTATION,
    variables: credentials
  });

  return createUserSession(user, '/');
};

export const CatchBoundary: CatchBoundaryComponent = () => (
  <CatchBoundaryCmp message="somethingWentWrong" />
);

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => (
  <ErrorBoundaryCmp error={error} message="couldNotSignup" />
);
