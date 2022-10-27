/** React imports */
import React, { forwardRef } from 'react';

/** ChartJs imports */
import {
  BarController,
  BarElement,
  Chart as ChartJS,
  CategoryScale,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Tooltip,
  TimeScale,
} from 'chart.js';
import type { ChartType, ChartComponentLike } from 'chart.js';

/** React Template Components */
import { ChartJsTemplate } from './ChartJsTemplate';

/** Enums */
import { ChartTypesEnum } from './ChartEnums';

/** Types */
import type {
  ChartProps,
  ChartJSOrUndefined,
  TypedChartComponent,
} from './ChartTypes';

function createChartType<T extends ChartType>(
  type: T,
  chartTypeRegistrables: ChartComponentLike[]
) {
  ChartJS.register(...chartTypeRegistrables);

  return forwardRef<ChartJSOrUndefined<T>, Omit<ChartProps<T>, 'type'>>(
    (props, ref) => <ChartJsTemplate {...props} ref={ref} type={type} />
  ) as TypedChartComponent<T, true>;
}

export const BarChartTemplate = createChartType(ChartTypesEnum.BAR, [
  BarController,
  BarElement,
  Legend,
  LinearScale,
  Tooltip,
  TimeScale,
]);

export const LineChartTemplate = createChartType(ChartTypesEnum.LINE, [
  CategoryScale,
  LineController,
  LineElement,
  Legend,
  LinearScale,
  PointElement,
  Tooltip,
  TimeScale,
]);
