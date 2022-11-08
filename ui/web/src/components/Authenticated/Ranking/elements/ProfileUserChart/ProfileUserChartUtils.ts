/** Constants */
import {
  FIRST_BAR_CHART_COLOR,
  FIRST_PLACE_LABEL_TAG,
  MEAN_BAR_CHART_COLOR,
  MEAN_LABEL_TAG,
  USER_BAR_CHART_COLOR,
  USER_LABEL_TAG,
} from './ProfileUserChartConstants';
const CHART_METRIC_LABEL = 'Pontos';

/** Interfaces */
import { IUserRankingInfo } from '../../../../../data/interfaces/RankingInterfaces';

export function chartDatasetFactory(
  chartLabels: string[],
  chartData: number[]
) {
  return {
    labels: chartLabels,
    datasets: [
      {
        label: CHART_METRIC_LABEL,
        data: chartData,
        borderWidth: 0,
        backgroundColor: [
          FIRST_BAR_CHART_COLOR,
          USER_BAR_CHART_COLOR,
          MEAN_BAR_CHART_COLOR,
        ],
        borderRadius: 15,
        barThickness: 35,
      },
    ],
  };
}

export function transformToChartData(userRankingInfo: IUserRankingInfo) {
  let chartData = [];
  let chartLabels = [];

  chartData.push(userRankingInfo.firstPlaceRankUser.score);
  chartLabels.push(FIRST_PLACE_LABEL_TAG);

  chartData.push(userRankingInfo.userRankInfo.score);
  chartLabels.push(USER_LABEL_TAG);

  chartData.push(userRankingInfo.averageScore);
  chartLabels.push(MEAN_LABEL_TAG);

  return { chartData, chartLabels };
}
