/** React imports */
import React from 'react';

/** React Components */
import PodiumUser from './elements/PodiumUser';
import ProfileUser from './elements/ProfileUser';
import ProfileUserChart from './elements/ProfileUserChart';
import Slider from '../../Common/Slider';
import WeekPodiumChart from './elements/WeekPodiumChart';
import WeekRankCard from './elements/WeekRankCard';

/** React Template Components */
import DefaultCardBox from '../../Template/DefaultCardBox';

/** Helpers */
import { chunkArray } from '../../../helpers';

/** Interfaces */
import {
  IRankingUserInfo,
  IUserRankingInfo,
  IWeekRankingInfo,
} from '../../../data/interfaces/RankingInterfaces';

/** Styles */
import './Ranking.scss';

/** Assets */
import {
  CalendarStarIcon,
  MetricsChartIcon,
  WifiSignalIcon,
} from '../../../assets/svg/icons';

/** Constants */
const NON_PODIUM_PER_RANK_CARD = 5;
const PODIUM_USERS_AMOUNT = 4;

function retrieveCardBeginPosition(cardChunkIdx: number) {
  return cardChunkIdx * NON_PODIUM_PER_RANK_CARD + PODIUM_USERS_AMOUNT + 1;
}

type RankingComponentProps = {
  userRanking: IUserRankingInfo;
  weekRankingInfo: IWeekRankingInfo;
};
function RankingComponent({
  userRanking,
  weekRankingInfo,
}: RankingComponentProps) {
  const chunks = chunkArray<IRankingUserInfo>(
    weekRankingInfo.nonPodiumUsers,
    NON_PODIUM_PER_RANK_CARD
  );

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
                <PodiumUser
                  key={podiumUser.userId}
                  podiumUserInfo={podiumUser}
                  position={idx + 1}
                />
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
      <section className="ranking-page__down-cards">
        <DefaultCardBox icon={<CalendarStarIcon />} title="Ranking da Semana">
          <div className="ranking-page__week-rank-card">
            <Slider slidesToShow={5} autoplay={false}>
              {chunkArray<IRankingUserInfo>(
                weekRankingInfo.nonPodiumUsers,
                NON_PODIUM_PER_RANK_CARD
              ).map((nonPodiumUsersChunk, chunkIdx) => (
                <WeekRankCard
                  key={nonPodiumUsersChunk[0].userId}
                  beginPosition={retrieveCardBeginPosition(chunkIdx)}
                  rankCardUsers={nonPodiumUsersChunk}
                />
              ))}
            </Slider>
          </div>
        </DefaultCardBox>
      </section>
    </div>
  );
}

/** Exports */
export default RankingComponent;
