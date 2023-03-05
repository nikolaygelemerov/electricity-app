import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import type { ActionFunction } from 'react-router';

import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useActionData, useTransition } from '@remix-run/react';

import { Button, DatePicker } from '~/components';
import { getUserFromSession } from '~/data/auth.server';
import { graphQLClient } from '~/entry.server';
import { ELECTRICITY_DATA_QUERY } from '~/queries';
import type { ElectricityPriceData, ElectricityQueryFromTo, ElectricityUsageData } from '~/types';
import { ElectricityChart } from '~/widgets';

import * as S from './styled';

export default function Index() {
  const transition = useTransition();
  const { t } = useTranslation();

  const actionData:
    | {
        data: {
          electricityData: {
            electricityPrice: ElectricityPriceData[];
            electricityUsage: ElectricityUsageData[];
          };
        };
      }
    | undefined = useActionData<typeof action>();

  console.log('actionData: ', actionData);

  console.log('transition: ', transition);

  const isSubmitting = useMemo(() => transition.state !== 'idle', [transition.state]);

  return (
    <>
      <S.Form method="post">
        <DatePicker id="from" label="dateFrom" name="from" />
        <DatePicker id="to" label="dateTo" name="to" />
        <Button
          disabled={isSubmitting}
          text={isSubmitting ? 'submitting' : 'submit'}
          variant="confirm"
        />
      </S.Form>
      <ElectricityChart data={actionData?.data?.electricityData?.electricityPrice} />
    </>
  );
}

export const loader: LoaderFunction = async ({ request }) => {
  const profileData = await getUserFromSession(request);

  if (!profileData) {
    return redirect('/');
  }

  return profileData;
};

export const action: ActionFunction = async ({ params, request }) => {
  const formData = await request.formData();
  const { from, to } = Object.fromEntries(formData) as unknown as ElectricityQueryFromTo;

  return graphQLClient.query({
    query: ELECTRICITY_DATA_QUERY,
    variables: { from, meteringPointId: params?.id, to }
  });
};
