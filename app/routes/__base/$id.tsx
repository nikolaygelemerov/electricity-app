import type { ChartSeriesType, ValueType } from '@syncfusion/ej2-react-charts';

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { ActionFunction } from 'react-router';

import type { LoaderFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { useActionData, useTransition } from '@remix-run/react';

import { Button, DatePicker } from '~/components';
import { getUserFromSession } from '~/data/auth.server';
import { graphQLClient } from '~/entry.server';
import { ELECTRICITY_DATA_QUERY } from '~/queries';
import type {
  ChartSelectValue,
  ElectricityPriceData,
  ElectricityQueryFromTo,
  ElectricityUsageData
} from '~/types';
import { ChartSelect, ElectricityChart } from '~/widgets';

import * as S from './styled';

export default function Index() {
  const transition = useTransition();
  const { i18n, t } = useTranslation();

  const [selectedChart, setSelectedChart] = useState<ChartSelectValue>({
    price: true,
    usage: true
  });

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

  const electricityUsageChartProps = useMemo(() => {
    return {
      id: 'usage',
      primaryXAxis: { title: t('date'), valueType: 'DateTime' as ValueType },
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
          <S.Form method="post">
            <DatePicker id="from" label="dateFrom" name="from" />
            <DatePicker id="to" label="dateTo" name="to" />
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

  return graphQLClient.query({
    query: ELECTRICITY_DATA_QUERY,
    variables: { from, meteringPointId: params?.id, to }
  });
};
