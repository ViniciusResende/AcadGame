/** React imports */
import React, { useEffect, useState } from 'react';

/** React components */
import Ranking from '../../components/Authenticated/Ranking';

/** Library */
import Lib from 'acad-game-lib';

/** Interfaces */
import { IWeekRankingInfo } from '../../data/interfaces/RankingInterfaces';

/** Constants */
const DEFAULT_WEEK_RANKING = {
  podiumUsers: [],
  nonPodiumUsers: [],
};

function RouteRanking() {
  const [weekRankings, setWeekRankings] =
    useState<IWeekRankingInfo>(DEFAULT_WEEK_RANKING);

  useEffect(() => {
    async function getWeekRankings() {
      const getWeekRankingsResponse = await Lib.ranking.getWeekRankings();

      return getWeekRankingsResponse;
    }

    getWeekRankings().then((response) => response && setWeekRankings(response));
  }, []);

  return <Ranking weekRankingInfo={weekRankings} />;
}

/** Exports */
export default RouteRanking;
