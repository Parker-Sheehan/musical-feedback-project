import { FC } from "react";
import { SongInfo } from "../views/ProfilePage";
import { SongAndUser } from "../views/ReviewSong";
export interface SongInfoProp {
  SongAndUser: SongAndUser | null;
}

const SongInfoCard: FC<SongInfoProp> = ({ SongAndUser }) => {
  if (SongAndUser !== null) {
    console.log(SongAndUser);
    let { songInfo, userInfo } = SongAndUser;
    console.log(userInfo.profilePicture);
    return (
      <div id="song-info-card">
        <div className="inside-song-info-card" id="song-info-card-left">
          <div
            id="album-cover-card"
            style={{
              backgroundImage: `url(${userInfo.profilePicture})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <h1>{userInfo.displayName}</h1>
          </div>
        </div>
        <div className="inside-song-info-card" id="song-info-card-right">
          <div id="embedded-song-link">
            <iframe
              width="100%"
              height="100%"
              allow="autoplay"
              src={songInfo.embeddedLink}
            ></iframe>
          </div>
        </div>
      </div>
    );
  } else {
    <div>
      <h1>Retrieving Song</h1>
    </div>;
  }
};

export default SongInfoCard;
