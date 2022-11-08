/** React imports */
import React, { useEffect, useState } from 'react';

/** React components */
import Ranking from '../../components/Authenticated/Ranking';

/** Library */
import Lib, { UserProfilePictureEnum } from 'acad-game-lib';

/** Interfaces */
import {
  IUserRankingInfo,
  IWeekRankingInfo,
} from '../../data/interfaces/RankingInterfaces';

/** Constants */
const DEFAULT_USER_RANKING = {
  firstPlaceRankUser: {
    userId: '0',
    nickname: 'Apelido',
    score: 0,
    profileIcon: UserProfilePictureEnum.DEFAULT,
  },
  averageScore: 0,
  userRankInfo: {
    userId: '0',
    nickname: 'Apelido',
    score: 0,
    profileIcon: UserProfilePictureEnum.DEFAULT,
    userRank: 0,
  },
};
const DEFAULT_WEEK_RANKING = {
  podiumUsers: [],
  nonPodiumUsers: [],
};

function RouteRanking() {
  const [userRanking, setUserRanking] =
    useState<IUserRankingInfo>(DEFAULT_USER_RANKING);
  const [weekRankings, setWeekRankings] =
    useState<IWeekRankingInfo>(DEFAULT_WEEK_RANKING);

  useEffect(() => {
    async function getUserRanking() {
      const getUserRankingResponse = await Lib.ranking.getUserRanking();

      return getUserRankingResponse;
    }

    async function getWeekRankings() {
      const getWeekRankingsResponse = await Lib.ranking.getWeekRankings();

      return getWeekRankingsResponse;
    }

    getUserRanking().then((response) => response && setUserRanking(response));
    getWeekRankings().then((response) => response && setWeekRankings(response));
  }, []);

  return <Ranking userRanking={userRanking} weekRankingInfo={weekRankings} />;
}

/** Exports */
export default RouteRanking;
