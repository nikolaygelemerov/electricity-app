/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-shadow */
import type {
  AnimationModel,
  AxisModel,
  BorderModel,
  ChartSeriesType,
  LegendSettingsModel,
  TooltipSettingsModel,
  ZoomSettingsModel
} from '@syncfusion/ej2-react-charts';
import {
  AreaSeries,
  ChartComponent,
  DataLabel,
  DateTime,
  Inject,
  Legend,
  SeriesCollectionDirective,
  SeriesDirective,
  Tooltip,
  Zoom
} from '@syncfusion/ej2-react-charts';

import { memo, useMemo } from 'react';

interface ElectricityChartProps {
  animation?: AnimationModel;
  border?: BorderModel;
  id: string;
  legendSettings?: LegendSettingsModel;
  name?: string;
  opacity?: number;
  primaryXAxis: AxisModel;
  primaryYAxis: AxisModel;
  seriesData: { x: any; y: any }[];
  title: string;
  tooltip?: TooltipSettingsModel;
  type: ChartSeriesType;
  zoomsettings?: ZoomSettingsModel;
}

const defaultAnimation = { enable: false };
const defaultBorder = { color: 'var(--color-error)', width: 0.5 };

const defaultZoomsettings: ZoomSettingsModel = {
  enableMouseWheelZooming: true,
  enablePinchZooming: true,
  enableSelectionZooming: true
};

const defaultLegendSettings: LegendSettingsModel = { visible: true };

const defaultTooltip = { enable: true, shared: true };

// const primaryXAxis: AxisModel = { title: 'Date', valueType: 'DateTime' };
// const primaryYAxis: AxisModel = { title: 'Price', valueType: 'Double' };
// const seriesData = data.map((d) => ({ x: new Date(d.timestamp), y: d.price }));

export const ElectricityChart = memo<ElectricityChartProps>(
  ({
    animation = defaultAnimation,
    border = defaultBorder,
    id,
    legendSettings = defaultLegendSettings,
    name,
    opacity = 0.3,
    primaryXAxis,
    primaryYAxis,
    seriesData,
    title,
    tooltip = defaultTooltip,
    type,
    zoomsettings = defaultZoomsettings
  }) => {
    const formattedPrimaryXAxis = useMemo(
      () => ({
        ...primaryXAxis,
        labelStyle: {
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-weight-bold)',
          size: 'var(--font-size-m)'
        },
        titleStyle: {
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-weight-bold)',
          size: 'var(--font-size-xl)'
        }
      }),
      [primaryXAxis]
    );

    const formattedPrimaryYAxis = useMemo(
      () => ({
        ...primaryYAxis,
        labelStyle: {
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-weight-bold)',
          size: 'var(--font-size-m)'
        },
        titleStyle: {
          fontFamily: 'var(--font-family)',
          fontWeight: 'var(--font-weight-bold)',
          size: 'var(--font-size-xl)'
        }
      }),
      [primaryYAxis]
    );

    const titleStyle = useMemo(
      () => ({
        fontFamily: 'var(--font-family)',
        fontWeight: 'var(--font-weight-bold)',
        size: 'var(--font-size-xxl)'
      }),
      []
    );

    return (
      <ChartComponent
        key={title}
        id={id}
        legendSettings={legendSettings}
        primaryXAxis={formattedPrimaryXAxis}
        primaryYAxis={formattedPrimaryYAxis}
        title={title}
        titleStyle={titleStyle}
        zoomSettings={zoomsettings}
        tooltip={tooltip}
      >
        <Inject services={[AreaSeries, Legend, Tooltip, DataLabel, Zoom, DateTime]} />
        <SeriesCollectionDirective>
          <SeriesDirective
            animation={animation}
            border={border}
            dataSource={seriesData}
            name={name}
            opacity={opacity}
            type={type}
            xName="x"
            yName="y"
          ></SeriesDirective>
        </SeriesCollectionDirective>
      </ChartComponent>
    );
  }
);

ElectricityChart.displayName = 'ElectricityChart';
