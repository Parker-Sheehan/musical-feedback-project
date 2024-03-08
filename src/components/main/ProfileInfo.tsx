import axios from "axios";
import { FC, useState } from "react";
import MyVerticallyCenteredModal from "../ui/MyVerticallyCenteredModal";
import ChatBox from "../views/ChatBox";

import { ProfileData } from "../views/ProfilePage";
import GenreCard from "../views/GenreCard";
import { useAppSelector } from "../../store/store";

interface ProfileDataProp {
  profileData: ProfileData;
  setProfileDataHandler: (profileDataObj: ProfileData) => void;
  numOfSongs: number;
  followUserHandler: () => void;
}

const ProfileInfo: FC<ProfileDataProp> = ({
  profileData,
  setProfileDataHandler,
  numOfSongs,
  followUserHandler,
}) => {
  let tokenState = useAppSelector((state) => state.login.userReviewToken);

  let loggedInUserId = useAppSelector((state) => state.login.userId);

  const [togglePfpModal, setTogglePfpModal] = useState<boolean>(false);

  const [currentChatRoom, setCurrentChatRoom] = useState<number>(2)

  const openChatRoomHandler = (chatRoomId: number) => {
    setCurrentChatRoom(chatRoomId)
  }

  const createChatRoomHandler = () => {
    setCurrentChatRoom
  }

  const handleProfilePictureClick = () => {
    setTogglePfpModal(true);
  };

  let genreArray = profileData.genres.map(
    ({ genreName }: { genreName: string }) => {
      return <GenreCard genreName={genreName} />;
    }
  );

  console.log(profileData.following)
  // console.log(loggedInUserId, profileData.userId)

  return (
    <>
      <MyVerticallyCenteredModal
        show={togglePfpModal}
        onHide={() => setTogglePfpModal(false)}
        setProfileDataHandler={setProfileDataHandler}
        profileData={profileData}
      />
      <div className="m-10 w-8/12 h-3/4 rounded-lg lg:grid lg:grid-rows-2 lg:grid-cols-10 gap-3">
        <div className="lg:w-2/5 w-full mb-3 lg:mb-0 bg-background2 lg:grid-cols-subgrid lg:col-span-5 lg:grid-row-subgrid lg:row-span-2 rounded-lg grid grid-col-2 grid-row-6 lg:gap-1 ">
          {(loggedInUserId === profileData.userId && profileData.userId) && (
            <div className="bg-background2 p-10 lg:m-0 lg:p-0 grid-row-subgrid row-span-2 grid-cols-subgrid col-span-4 lg:col-span-3 lg:rounded-lg rounded-t-lg flex flex-col justify-center items-center gap-3">
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
            </div>
          )}
          {(loggedInUserId !== profileData.userId && profileData.userId)  && (
            <div className="bg-background2 p-10 lg:m-0 lg:p-0 grid-row-subgrid row-span-2 grid-cols-subgrid col-span-4 lg:col-span-3 lg:rounded-lg rounded-t-lg flex flex-col justify-center items-center gap-3">
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
              {profileData.following && (
                <>
                  <button
                    className="h-8 w-48 bg-accent rounded-full  text-text "
                    onClick={followUserHandler}
                  >
                    Unfollow
                  </button>
                  <button className="h-8 w-48 bg-accent rounded-full text-text">
                    Message
                  </button>
                </>
              )}
              {!profileData.following && (
                <>
                  <button
                    className="h-8 w-48 bg-accent rounded-full  text-text "
                    onClick={followUserHandler}
                  >
                    Follow
                  </button>
                  <button className="h-8 w-48 bg-accent rounded-full text-text">
                    Message
                  </button>
                </>
              )}
            </div>
          )}
          <div className="bg-background3 lg:row-span-1 grid-cols-subgrid lg:col-span-2 col-span-2 w-full lg:rounded-tr-lg rounded-bl-lg text-text flex flex-col justify-center items-center">
            <h1 className="text-2xl">Followers</h1>
            <h2 className="text-1xl">180</h2>
          </div>
          <div className="bg-background3 lg:row-span-1 grid-cols-subgrid lg:col-span-2 col-span-2 w-full lg:rounded-br-lg rounded-br-lg text-text flex flex-col justify-center items-center">
            <h1 className="text-2xl">Following</h1>
            <h2 className="text-1xl">180</h2>
          </div>
        </div>
        <div className="bg-background2 lg:grid-cols-2 lg:col-span-3 lg:row-span-2 rounded-lg lg:flex lg:flex-wrap lg:mb-0 mb-3 grid grid-cols-2 grid-rows-2">
          {genreArray[0]}
          {genreArray[1]}
          {genreArray[2]}
          <div className="lg:size-1/2 lg:max-size-1/2 size-full p-2">
            <button
              className="rounded-md size-full max-size-full flex flex-col justify-center items-center bg-sec2"
              onClick={handleProfilePictureClick}
            >
              <h3 className="flex-shrink-0 text-text text-center lg:text-4xl text-3xl">
                +
              </h3>
            </button>
          </div>
        </div>
        <ChatBox openChatRoomHandler={openChatRoomHandler} currentChatRoom={currentChatRoom}/>
        <div className="bg-sec2 grid-cols-subgrid col-span-3 row-span-2 rounded-lg text-text flex flex-col justify-center items-center mb-2 lg:mb-0">
          <h1 className="text-2xl text-break text-center">
            Critiques Completed
          </h1>
          <h2 className="text-3xl">180</h2>
        </div>
        <div className="bg-sec2 grid-cols-subgrid col-span-3 grid-row-subgrid row-span-2 rounded-lg  text-text flex flex-col justify-center items-center mb-2 lg:mb-0">
          <h1 className="text-2xl text-break  text-center">Critique Score</h1>
          <h2 className="text-3xl">180</h2>
        </div>
        <div className="bg-sec2 grid-cols-subgrid col-span-2 rounded-lg  text-text flex flex-col justify-center items-center mb-2 lg:mb-0">
          <h1 className="text-2xl">Tokens</h1>
          <h2 className="text-3xl">{tokenState}</h2>
        </div>
        <div className="bg-sec2 grid-cols-subgrid col-span-2 rounded-lg  text-text flex flex-col justify-center items-center mb-2 lg:mb-0">
          <h1 className="text-2xl">Songs</h1>
          <h2 className="text-3xl">{numOfSongs}</h2>
        </div>
      </div>
    </>
  );
};

export default ProfileInfo;
