/** Constants */
import { BAR_CHART_COLOR } from './WeekPodiumChartConstants';
const CHART_METRIC_LABEL = 'Pontos';

/** Interfaces */
import { IRankingUserInfo } from '../../../../../data/interfaces/RankingInterfaces';

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
        borderColor: BAR_CHART_COLOR,
        backgroundColor: BAR_CHART_COLOR,
        borderRadius: 15,
        barThickness: 35,
      },
    ],
  };
}

export function transformToChartData(
  weekPodiumHistogramData: IRankingUserInfo[]
) {
  let chartData = [];
  let chartLabels = [];

  for (const weekPodiumHistogramElement of weekPodiumHistogramData) {
    const { score, nickname } = weekPodiumHistogramElement;

    chartData.push(score);
    chartLabels.push(nickname);
  }

  return { chartData, chartLabels };
}
