// eslint-disable-next-line prettier/prettier
import 'chart.js/auto';

import { memo, useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import type { ElectricityPriceData } from '~/types';

interface ElectricityChartProps {
  data?: ElectricityPriceData[];
}

export const ElectricityChart = memo<ElectricityChartProps>(({ data }) => {
  const [chartId, setChartId] = useState<string>(Date.now().toString());
  const chartRef = useRef(null);

  useEffect(() => {
    // Generate a new chart ID for the new chart
    setChartId(Date.now().toString());
  }, [data]);

  if (!data) {
    return null;
  }

  const chartData = {
    datasets: [
      {
        borderColor: 'blue',
        data: data.map((d) => d.price),
        fill: false,
        label: 'Price'
      }
    ],
    labels: data.map((d) => new Date(d.timestamp))
  };

  return (
    <div>
      <h2>Electricity Price Chart</h2>
      <Bar data={chartData} id={chartId} ref={chartRef} />
    </div>
  );
});

ElectricityChart.displayName = 'ElectricityChart';
