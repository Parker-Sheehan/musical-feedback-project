import "./ProfileInfo.css";
import { FC, useState } from "react";
import MyVerticallyCenteredModal from "../ui/MyVerticallyCenteredModal";
import Messages from "../views/Messages";

import { ProfileData } from "../views/ProfilePage";
import GenreCard from "../views/GenreCard";

interface ProfileDataProp {
  profileData: ProfileData;
  setProfileDataHandler: (profileDataObj: ProfileData) => void;
  numOfSongs: number;
}

const ProfileInfo: FC<ProfileDataProp> = ({
  profileData,
  setProfileDataHandler,
  numOfSongs,
}) => {
  console.log(profileData);

  const [togglePfpModal, setTogglePfpModal] = useState<boolean>(false);

  const handleProfilePictureClick = () => {
    setTogglePfpModal(true);
  };

  let genreArray = profileData.genres.map(
    ({ genreName }: { genreName: string }) => {
      console.log(genreName);
      return <GenreCard genreName={genreName} />;
    }
  );

  console.log(genreArray);

  return (
    <>
      <MyVerticallyCenteredModal
        show={togglePfpModal}
        onHide={() => setTogglePfpModal(false)}
        setProfileDataHandler={setProfileDataHandler}
        profileData={profileData}
      />
      {/* <div id="profile-info-card">
        <div id="left-profile" className="inside-profile-card">
          <div
            id="profile-picture"
            className="bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${profileData.profilePicture})` }}
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
      </div> */}
      <div className="m-10 w-8/12 h-3/4 rounded-lg grid grid-rows-4 grid-cols-10 gap-3">
        <div className="w-2/5 bg-background2 grid-cols-subgrid col-span-5 grid-row-subgrid row-span-2 rounded-lg grid gap-1">
          <div className="grid-row-subgrid row-span-2 grid-cols-subgrid col-span-3 rounded-lg flex flex-col justify-center items-center gap-3">
            <div
              className="bg-cover bg-center bg-no-repeat size-36 rounded-full"
              style={{
                backgroundImage: `url(${profileData.profilePicture})`,
              }}
              onClick={handleProfilePictureClick}
            ></div>
            <div className="text-text font-heading text-xl">
              {profileData.displayName}
            </div>
            <button className="h-8 w-48 bg-accent flex justify-center items-center rounded-full  text-text ">
              Follow
            </button>
            <button className="h-8 w-48 bg-accent rounded-full text-text">
              Message
            </button>
          </div>
          <div className="bg-background3 grid-row-subgrid row-span-1 grid-cols-subgrid col-span-2 rounded-tr-lg text-text flex flex-col justify-center items-center">
            <h1 className="text-2xl">Followers</h1>
            <h2 className="text-1xl">180</h2>
          </div>
          <div className="bg-background3 grid-row-subgrid row-span-1 grid-cols-subgrid col-span-2 rounded-tr-lg text-text flex flex-col justify-center items-center">
            <h1 className="text-2xl">Following</h1>
            <h2 className="text-1xl">180</h2>
          </div>
        </div>
        <div className="bg-background2 grid-cols-2 col-span-3 grid-row-subgrid row-span-2 rounded-lg grid">
          {genreArray[0]}
          {genreArray[1]}
          {genreArray[2]}
          <div className="size-full p-2">
            <button
              className="size-full rounded-md flex flex-col justify-center items-center bg-sec2"
              onClick={handleProfilePictureClick}
            >
              <h3 className="flex-shrink-0 text-text text-center text-4xl">
                +
              </h3>
            </button>
          </div>
        </div>
        <Messages />
        <div className="bg-sec2 grid-cols-subgrid col-span-3 grid-row-subgrid row-span-2 rounded-lg text-text flex flex-col justify-center items-center">
          <h1 className="text-2xl ">Critiques Completed</h1>
          <h2 className="text-3xl">180</h2>
        </div>
        <div className="bg-sec2 grid-cols-subgrid col-span-3 grid-row-subgrid row-span-2 rounded-lg  text-text flex flex-col justify-center items-center">
          <h1 className="text-2xl">Critique Score</h1>
          <h2 className="text-3xl">180</h2>
        </div>
        <div className="bg-sec2 grid-cols-subgrid col-span-2 rounded-lg  text-text flex flex-col justify-center items-center">
          <h1 className="text-2xl">Tokens</h1>
          <h2 className="text-3xl">3</h2>
        </div>
        <div className="bg-sec2 grid-cols-subgrid col-span-2 rounded-lg  text-text flex flex-col justify-center items-center">
          <h1 className="text-2xl">Songs</h1>
          <h2 className="text-3xl">{numOfSongs}</h2>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
