import "./ProfileInfo.css";
import { FC, useState } from "react";
import MyVerticallyCenteredModal from '../ui/MyVerticallyCenteredModal'

import { ProfileData } from "../views/ProfilePage";

interface ProfileDataProp {
  profileData: ProfileData;
  setProfileDataHandler : (profileDataObj: ProfileData) => void
}

const ProfileInfo: FC<ProfileDataProp> = ({ profileData, setProfileDataHandler}) => {
  console.log(profileData);

  const [togglePfpModal,setTogglePfpModal] = useState<boolean>(false)
  
  const handleProfilePictureClick = () => {
    setTogglePfpModal(true);
  };

  let genreArray: string[] = (profileData.genres.map((genre: any) => {
    return (genre.genreName)
  }));

  return (
    <>
        <MyVerticallyCenteredModal
        show={togglePfpModal}
        onHide={() => setTogglePfpModal(false)}
        setProfileDataHandler={setProfileDataHandler}
        profileData={profileData}
      />
    <div id="profile-info-card">
      <div id="left-profile" className="inside-profile-card">
        <div
          id="profile-picture"
          style={{
            backgroundImage: "url(" + profileData.profilePicture + ")",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          onClick={handleProfilePictureClick}
        ></div>
        <div id="stats-container">
          <div>
            <h3 className="top-text">Followers</h3>
            <h3>100</h3>
          </div>
          <div className="inside-stat-container">
            <h3>Following</h3>
            <h3>120</h3>
          </div>
          <div className="inside-stat-container">
            <h3>Tracks</h3>
            <h3>10</h3>
          </div>
        </div>
      </div>
      <div id="right-profile" className="inside-profile-card">
        <h1>{profileData.displayName}</h1>
        <div id="genre-container">
          <h3>Genre</h3>
          <h3>{genreArray}</h3>
        </div>
        <div id="ratings-container">
          <div id="total-stars-container">
            <h2>Total Score</h2>
            <h2>3.2</h2>
          </div>
          <div id="specific-score-container">
            <div className="specific-score" id="musicality-score">
              <h3>musicality</h3>
              <h3>3.6</h3>
            </div>
            <div className="specific-score" id="rhythm-score">
              <h3>rhythm</h3>
              <h3>3.8</h3>
            </div>
            <div className="specific-score" id="sound-design-score">
              <h3>sound design</h3>
              <h3>4</h3>
            </div>
            <div className="specific-score" id="arrangment-score">
              <h3>arrangment</h3>
              <h3>2.8</h3>
            </div>
            <div className="specific-score" id="mixing/master-score">
              <h3>mixing/master</h3>
              <h3>2.4</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ProfileInfo;
