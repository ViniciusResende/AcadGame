/** React imports */
import React from 'react';

/** React Components */
import PodiumUser from './elements/PodiumUser';
import ProfileUser from './elements/ProfileUser';
import ProfileUserChart from './elements/ProfileUserChart';
import WeekPodiumChart from './elements/WeekPodiumChart';

/** React Template Components */
import DefaultCardBox from '../../Template/DefaultCardBox';

/** Interfaces */
import {
  IUserRankingInfo,
  IWeekRankingInfo,
} from '../../../data/interfaces/RankingInterfaces';

/** Styles */
import './Ranking.scss';

/** Assets */
import { MetricsChartIcon, WifiSignalIcon } from '../../../assets/svg/icons';

type RankingComponentProps = {
  userRanking: IUserRankingInfo;
  weekRankingInfo: IWeekRankingInfo;
};
function RankingComponent({
  userRanking,
  weekRankingInfo,
}: RankingComponentProps) {
  return (
    <div className="ranking-page__container">
      <section className="ranking-page__upper-cards">
        <DefaultCardBox icon={<WifiSignalIcon />} title="Podium da Semana">
          <div className="ranking-page__podium-card">
            <div className="ranking-page__podium-chart">
              <WeekPodiumChart podiumUsers={weekRankingInfo.podiumUsers} />
              <span className="ranking-page__podium-line" />
            </div>
            <div className="ranking-page__podium-users">
              {weekRankingInfo.podiumUsers.map((podiumUser, idx) => (
                <PodiumUser podiumUserInfo={podiumUser} position={idx + 1} />
              ))}
            </div>
          </div>
        </DefaultCardBox>
        <DefaultCardBox icon={<MetricsChartIcon />} title="Seu Ranking">
          <div className="ranking-page__rank-profile-card">
            <ProfileUser profileUserInfo={userRanking.userRankInfo} />
            <ProfileUserChart userRankingInfo={userRanking} />
          </div>
        </DefaultCardBox>
      </section>
    </div>
  );
}

/** Exports */
export default RankingComponent;
