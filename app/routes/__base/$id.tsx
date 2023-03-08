import type { ChartSeriesType, ValueType } from '@syncfusion/ej2-react-charts';

import type { FormEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ActionFunction } from 'react-router';

import type { LoaderFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import type { CatchBoundaryComponent } from '@remix-run/react';
import { useActionData, useTransition } from '@remix-run/react';

import { Button } from '~/components';
import { getUserFromSession } from '~/data/auth.server';
import { graphQLClient } from '~/entry.server';
import { ELECTRICITY_DATA_QUERY } from '~/queries';
import type {
  ChartSelectValue,
  ElectricityPriceData,
  ElectricityQueryFromTo,
  ElectricityUsageData
} from '~/types';
import { CatchBoundaryCmp, ChartSelect, ElectricityChart } from '~/widgets';

import * as S from './styled';

export default function Index() {
  const transition = useTransition();
  const { i18n, t } = useTranslation();

  const [selectedChart, setSelectedChart] = useState<ChartSelectValue>({
    price: true,
    usage: true
  });

  const [selectedDates, setSelectedDates] = useState<{ from: number; to: number }>();

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

  const isSubmitting = useMemo(() => transition.state !== 'idle', [transition.state]);

  const electricityPriceChartProps = useMemo(() => {
    return {
      id: 'price',
      primaryXAxis: {
        ...(selectedDates?.from ? { minimum: selectedDates.from } : {}),
        ...(selectedDates?.to ? { maximum: selectedDates.to } : {}),
        title: t('date'),
        valueType: 'DateTime' as ValueType
      },
      primaryYAxis: { title: t('price'), valueType: 'Double' as ValueType },
      seriesData:
        actionData?.data?.electricityData?.electricityPrice.map((item) => ({
          x: new Date(item.timestamp),
          y: item.price
        })) || [],
      title: t('electricityPrice'),
      type: 'Area' as ChartSeriesType
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData?.data?.electricityData?.electricityPrice, i18n.language]);

  const onSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    const form = e.target as HTMLFormElement;

    const formData = new FormData(form);

    const { from, to } = Object.fromEntries(formData);

    setSelectedDates({
      from: new Date(from as string).getTime(),
      to: new Date(to as string).getTime()
    });
  }, []);

  const electricityUsageChartProps = useMemo(() => {
    return {
      id: 'usage',
      primaryXAxis: {
        ...(selectedDates?.from ? { minimum: selectedDates.from } : {}),
        ...(selectedDates?.to ? { maximum: selectedDates.to } : {}),
        title: t('date'),
        valueType: 'DateTime' as ValueType
      },
      primaryYAxis: { title: t('kwh') },
      seriesData:
        actionData?.data?.electricityData?.electricityUsage.map((item) => ({
          x: new Date(item.timestamp),
          y: parseFloat(item.kwh)
        })) || [],
      title: t('electricityUsage'),
      type: 'Area' as ChartSeriesType
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData?.data?.electricityData?.electricityPrice, i18n.language]);

  return (
    <S.HeightTransitionBox>
      <S.Container>
        <S.Filters>
          <ChartSelect
            onChange={(value) =>
              setSelectedChart((prevState) => ({ ...prevState, [value]: !prevState[value] }))
            }
            value={selectedChart}
          />
          <S.Form method="post" onSubmit={onSubmit}>
            <S.Field>
              <S.Label htmlFor="from">{t('dateFrom')}</S.Label>
              <S.DatePicker id="from" name="from" />
            </S.Field>
            <S.Field>
              <S.Label htmlFor="to">{t('dateTo')}</S.Label>
              <S.DatePicker id="to" name="to" />
            </S.Field>
            <Button
              disabled={isSubmitting}
              text={isSubmitting ? 'submitting' : 'submit'}
              variant="confirm"
            />
          </S.Form>
        </S.Filters>
        <S.ChartWrap>
          {selectedChart.price ? <ElectricityChart {...electricityPriceChartProps} /> : null}
          {selectedChart.usage ? <ElectricityChart {...electricityUsageChartProps} /> : null}
        </S.ChartWrap>
      </S.Container>
    </S.HeightTransitionBox>
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

  if (!from || !to || new Date(from) > new Date(to)) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw json({ message: 'invalidDates' }, { status: 400 });
  }

  return graphQLClient.query({
    query: ELECTRICITY_DATA_QUERY,
    variables: { from, meteringPointId: params?.id, to }
  });
};

export const CatchBoundary: CatchBoundaryComponent = () => (
  <CatchBoundaryCmp message="somethingWentWrong" />
);
