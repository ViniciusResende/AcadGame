/** Libraries */
import moment from 'moment';

/** Constants */
import { LINE_CHART_COLOR } from './WeeklyUserChartConstants';
const CHART_METRIC_LABEL = 'Pontos';

/** Interfaces */
import { IUserWeeklyHistogramElementData } from '../../../../../data/interfaces/ProfileInterfaces';

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
        borderColor: LINE_CHART_COLOR,
        backgroundColor: LINE_CHART_COLOR,
      },
    ],
  };
}

export function transformToChartData(
  userWeeklyHistogramData: IUserWeeklyHistogramElementData[]
) {
  let chartData = [];
  let chartLabels = [];

  for (const weeklyHistogramElement of userWeeklyHistogramData) {
    const { dailyPoints, date } = weeklyHistogramElement;

    chartData.push(dailyPoints);
    chartLabels.push(moment(date).format('DD/MM'));
  }

  return { chartData, chartLabels };
}
