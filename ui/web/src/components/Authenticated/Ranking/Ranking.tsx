/** React imports */
import React from 'react';

/** React Components */
import PodiumUser from './elements/PodiumUser';
import WeekPodiumChart from './elements/WeekPodiumChart';

/** React Template Components */
import DefaultCardBox from '../../Template/DefaultCardBox';

/** Interfaces */
import { IWeekRankingInfo } from '../../../data/interfaces/RankingInterfaces';

/** Styles */
import './Ranking.scss';

/** Assets */
import { MetricsChartIcon, WifiSignalIcon } from '../../../assets/svg/icons';

type RankingComponentProps = {
  weekRankingInfo: IWeekRankingInfo;
};
function RankingComponent({ weekRankingInfo }: RankingComponentProps) {
  return (
    <div className="ranking-page__container">
      <section className="ranking-page__upper-cards">
        <DefaultCardBox icon={<WifiSignalIcon />} title="Podium da Semana">
          <div className="ranking-page__podium-card">
            <WeekPodiumChart podiumUsers={weekRankingInfo.podiumUsers} />
            <div className="ranking-page__podium-users">
              {weekRankingInfo.podiumUsers.map((podiumUser, idx) => (
                <PodiumUser podiumUserInfo={podiumUser} position={idx + 1} />
              ))}
            </div>
          </div>
        </DefaultCardBox>
        <DefaultCardBox icon={<MetricsChartIcon />} title="Seu Ranking">
          <div className="ranking-page__rank-profile"></div>
        </DefaultCardBox>
      </section>
    </div>
  );
}

/** Exports */
export default RankingComponent;
