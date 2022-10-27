/** React imports */
import React from 'react';

/** React Template Components */
import { LineChartTemplate } from '../../../../Template/ChartJsTemplate';

/** Utils */
import {
  chartDatasetFactory,
  transformToChartData,
} from './WeeklyUserChartUtils';

/** Constants */
import { WeeklyUserChartOptions } from './WeeklyUserChartConstants';

/** Styles */
import './WeeklyUserChart.scss';

/** Interfaces */
import { IUserWeeklyHistogramElementData } from '../../../../../data/interfaces/ProfileInterfaces';

type WeeklyUserChartComponentProps = {
  userWeeklyHistogram: IUserWeeklyHistogramElementData[];
};
function WeeklyUserChartComponent({
  userWeeklyHistogram,
}: WeeklyUserChartComponentProps) {
  const { chartData: rawChartData, chartLabels } =
    transformToChartData(userWeeklyHistogram);

  const chartData = chartDatasetFactory(chartLabels, rawChartData);

  return (
    <div className="weekly-user-chart__container">
      <LineChartTemplate
        data={chartData}
        options={WeeklyUserChartOptions}
        height={266}
      />
    </div>
  );
}

/** Exports */
export default WeeklyUserChartComponent;
