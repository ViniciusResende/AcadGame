/** React imports */
import React from 'react';

/** Interfaces */
import { IRankingUserInfo } from '../../../../../data/interfaces/RankingInterfaces';

/** Mappings */
import { userGetProfilePictureImageMap } from '../../../../../Mappers/UserProfilePictureMappings';

/** Styles */
import './WeekRankCard.scss';

/** Constants */
const USERS_PER_RANK_CARD = 5;

type WeekRankCardComponentProps = {
  beginPosition: number;
  rankCardUsers: IRankingUserInfo[];
};
function WeekRankCardComponent({
  beginPosition,
  rankCardUsers,
}: WeekRankCardComponentProps) {
  return (
    <div className="week-rank-card__container">
      <header className="week-rank-card__header">
        {beginPosition}&deg; a {beginPosition + USERS_PER_RANK_CARD - 1}&deg;
      </header>
      <main className="week-rank-card__body">
        {rankCardUsers.map((user, idx) => (
          <div key={user.userId} className="week-rank-card__user-container">
            <img
              className="week-rank-card__user-picture"
              src={userGetProfilePictureImageMap.get(user.profileIcon)}
              alt={`${user.nickname}-profile-picture`}
            />
            <div className="week-rank-card__user-content">
              <strong className="week-rank-card__name">{user.nickname}</strong>
              <div className="week-rank-card__metrics">
                <span>
                  Score: <strong>{user.score}</strong>
                </span>
                <span>
                  Posição: <strong>{beginPosition + idx}&deg;</strong>
                </span>
              </div>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
}

/** Exports */
export default WeekRankCardComponent;
