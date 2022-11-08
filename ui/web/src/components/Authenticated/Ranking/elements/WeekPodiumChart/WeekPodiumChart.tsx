/** React imports */
import React, { useEffect, useState } from 'react';

/** React Template Components */
import { BarChartTemplate } from '../../../../Template/ChartJsTemplate';

/** Helpers */
import { cloneObj } from '../../../../../helpers';

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

  const [mutableChartOptions, setMutableChartOptions] = useState(
    WeekPodiumChartOptions
  );

  useEffect(() => {
    if (window.innerWidth < 850) {
      let newWeekPodiumChartOptions =
        cloneObj<typeof WeekPodiumChartOptions>(mutableChartOptions);

      newWeekPodiumChartOptions.scales.y.ticks.display = false;

      setMutableChartOptions(newWeekPodiumChartOptions);
    }
  }, []);

  return (
    <div className="week-podium-chart__container">
      <BarChartTemplate
        data={chartData}
        options={mutableChartOptions}
        height={440}
        width={176}
      />
    </div>
  );
}

/** Exports */
export default WeekPodiumChartComponent;
