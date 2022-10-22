/** React imports */
import React, { useEffect, useState } from 'react';

/** React components */
import Profile from '../../components/Authenticated/Profile';

/** Library */
import Lib from 'acad-game-lib';

function RouteProfile() {
  async function getUserInfo() {
    const getUserInfoResponse = await Lib.user.getInfo();

    return getUserInfoResponse;
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return <Profile />;
}

/** Exports */
export default RouteProfile;
