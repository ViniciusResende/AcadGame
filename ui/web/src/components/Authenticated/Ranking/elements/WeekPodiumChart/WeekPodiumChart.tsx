/** React imports */
import React from 'react';

/** React Template Components */
import { BarChartTemplate } from '../../../../Template/ChartJsTemplate';

/** Utils */
import {
  chartDatasetFactory,
  transformToChartData,
} from './WeekPodiumChartUtils';

/** Constants */
import { WeekPodiumChartOptions } from './WeekPodiumChartConstants';

/** Styles */
import './WeekPodiumChart.scss';

/** Interfaces */
import { IRankingUserInfo } from '../../../../../data/interfaces/RankingInterfaces';

type WeekPodiumChartComponentProps = {
  podiumUsers: IRankingUserInfo[];
};
function WeekPodiumChartComponent({
  podiumUsers,
}: WeekPodiumChartComponentProps) {
  const { chartData: rawChartData, chartLabels } =
    transformToChartData(podiumUsers);

  const chartData = chartDatasetFactory(chartLabels, rawChartData);

  return (
    <div className="week-podium-chart__container">
      <BarChartTemplate
        data={chartData}
        options={WeekPodiumChartOptions}
        height={440}
      />
    </div>
  );
}

/** Exports */
export default WeekPodiumChartComponent;
