/** React imports */
import React, { useEffect, useState } from 'react';

/** React components */
import Profile from '../../components/Authenticated/Profile';

/** Library */
import Lib, { UserProfilePictureEnum } from 'acad-game-lib';

/** Interfaces */
import {
  IUserInfoData,
  IUserWeeklyHistogramElementData,
} from '../../data/interfaces/ProfileInterfaces';

/** Constants */
const DEFAULT_USER_INFO_PAYLOAD = {
  nickname: 'Apelido',
  totalPoints: 0,
  profileIcon: UserProfilePictureEnum.DEFAULT,
};
const DEFAULT_USER_WEEKLY_HISTOGRAM_PAYLOAD = [
  {
    date: '0000-00-00',
    dailyPoints: 0,
  },
];

function RouteProfile() {
  const [userInfo, setUserInfo] = useState<IUserInfoData>(
    DEFAULT_USER_INFO_PAYLOAD
  );
  const [userWeeklyHistogram, setUserWeeklyHistogram] = useState<
    IUserWeeklyHistogramElementData[]
  >(DEFAULT_USER_WEEKLY_HISTOGRAM_PAYLOAD);

  useEffect(() => {
    async function getUserInfo() {
      const getUserInfoResponse = await Lib.user.getInfo();

      return getUserInfoResponse;
    }

    async function getUserWeeklyHistogram() {
      const getUserWeeklyHistogramResponse =
        await Lib.user.getWeeklyHistogram();

      return getUserWeeklyHistogramResponse;
    }

    getUserInfo().then((response) => response && setUserInfo(response.data));
    getUserWeeklyHistogram().then(
      (response) => response && setUserWeeklyHistogram(response.data)
    );
  }, []);

  return (
    <Profile userInfo={userInfo} userWeeklyHistogram={userWeeklyHistogram} />
  );
}

/** Exports */
export default RouteProfile;
