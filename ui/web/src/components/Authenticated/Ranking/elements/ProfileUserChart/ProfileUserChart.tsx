/** React imports */
import React from 'react';

/** React Template Components */
import { BarChartTemplate } from '../../../../Template/ChartJsTemplate';

/** Utils */
import {
  chartDatasetFactory,
  transformToChartData,
} from './ProfileUserChartUtils';

/** Constants */
import { ProfileUserChartOptions } from './ProfileUserChartConstants';

/** Styles */
import './ProfileUserChart.scss';

/** Interfaces */
import { IUserRankingInfo } from '../../../../../data/interfaces/RankingInterfaces';

type ProfileUserChartComponentProps = {
  userRankingInfo: IUserRankingInfo;
};
function ProfileUserChartComponent({
  userRankingInfo,
}: ProfileUserChartComponentProps) {
  const { chartData: rawChartData, chartLabels } =
    transformToChartData(userRankingInfo);

  const chartData = chartDatasetFactory(chartLabels, rawChartData);

  return (
    <div className="profile-user-chart__container">
      <BarChartTemplate
        data={chartData}
        options={ProfileUserChartOptions}
        height={400}
      />
    </div>
  );
}

/** Exports */
export default ProfileUserChartComponent;
