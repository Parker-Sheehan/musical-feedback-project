import instance from "../../utils/axios";
import { FC, useState, useEffect } from "react";
import MyVerticallyCenteredModal from "../ui/MyVerticallyCenteredModal";
import ChatBox from "../views/ChatBox";
import { TiMessageTyping } from "react-icons/ti";
import { ProfileData } from "../views/ProfilePage";
import GenreCard from "../views/GenreCard";
import { useAppSelector } from "../../store/store";

import { ChatRoomInterface } from "../views/ChatBox";
import FollowModal from "../ui/FollowModal";

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

  const [currentChatRoom, setCurrentChatRoom] = useState<number>(0);

  const [chatRooms, setChatRooms] = useState<ChatRoomInterface[]>([]);

  const [followModalShow, setFollowModalShow] = useState<string>("");

  const [showChatMobile, setShowChatMobile] = useState<boolean>(false);

  useEffect(() => {
    console.log("inUseEffect getchatrooms");
    getChatRooms();
  }, []);

  const openChatRoomHandler = (chatRoomId: number) => {
    setCurrentChatRoom(chatRoomId);
  };

  const getChatRooms = async () => {
    try {
      const getChatRoomsRes = await instance.get(
        `http://localhost:3000/getChatRooms/${loggedInUserId}`
      );
      console.log(getChatRoomsRes.data);

      setChatRooms(getChatRoomsRes.data);
    } catch (error) {
      console.error("Error fetching chat rooms:", error);
    }
  };

  const handleSetChatRooms = (newChatRoomArray: ChatRoomInterface[]) => {
    setChatRooms(newChatRoomArray);
  };

  const handleSetShowChatMobile = () => {
    let newValue = !showChatMobile;
    setShowChatMobile(newValue);
  };

  const messageButtonHandler = () => {
    console.log(chatRooms);
    let chatRoomNumber;
    if (chatRooms) {
      console.log("in if of messageButton handler");
      chatRooms.forEach((chatRoom) => {
        // console.log(chatRoom);
        console.log(chatRoom.user1Id, profileData.userId);
        console.log(chatRoom.user2Id, profileData.userId);
        console.log(
          chatRoom.user1Id === profileData.userId ||
            chatRoom.user2Id === profileData.userId
        );

        if (
          chatRoom.user1Id === profileData.userId ||
          chatRoom.user2Id === profileData.userId
        ) {
          chatRoomNumber = chatRoom.chatRoomId;
        }
      });
    }
    if (chatRoomNumber) {
      setCurrentChatRoom(chatRoomNumber);
      return;
    }
    setCurrentChatRoom(-1);
    return;
  };

  const handleProfilePictureClick = () => {
    setTogglePfpModal(true);
  };

  let genreArray = profileData.genres.map(
    ({ genreName }: { genreName: string }) => {
      return <GenreCard genreName={genreName} />;
    }
  );

  // console.log(profileData.following);

  let mobileMessageButtonHandle = () => {
    messageButtonHandler()
    handleSetShowChatMobile()
  }

  return (
    <>
      {showChatMobile ? (
        <ChatBox
          openChatRoomHandler={openChatRoomHandler}
          currentChatRoom={currentChatRoom}
          chatRooms={chatRooms || []}
          profileData={profileData}
          getChatRooms={getChatRooms}
          handleSetChatRooms={handleSetChatRooms}
          showChatMobile={showChatMobile}
          handleSetShowChatMobile={handleSetShowChatMobile}
        />
      ) : (
        <>
          <MyVerticallyCenteredModal
            show={togglePfpModal}
            onHide={() => setTogglePfpModal(false)}
            setProfileDataHandler={setProfileDataHandler}
            profileData={profileData}
          />
          <FollowModal
            show={followModalShow}
            onHide={() => setFollowModalShow("")}
            followerArray={profileData.followerArray}
            followingArray={profileData.followingArray}
          />
          <div className="m-10 w-8/12 h-full rounded-lg lg:grid lg:grid-rows-2 lg:grid-cols-10 gap-3">
              <TiMessageTyping
                className=" lg:hidden text-prim size-8 bg-red absolute m-2"
                onClick={handleSetShowChatMobile}
              />
            <div className="lg:w-2/5 w-full mb-3 lg:mb-0 bg-background2 lg:grid-cols-subgrid lg:col-span-5 lg:grid-row-subgrid lg:row-span-2 rounded-lg grid grid-col-2 grid-row-6 lg:gap-1 ">
              {loggedInUserId === profileData.userId && profileData.userId && (
                <div className="bg-background2 p-10 lg:m-0 lg:p-0 grid-row-subgrid row-span-2 grid-cols-subgrid col-span-4 lg:col-span-3 lg:rounded-lg rounded-t-lg flex flex-col justify-center items-center gap-3">
                  <div
                    className="bg-cover bg-center bg-no-repeat size-36 rounded-full hover:cursor-pointer bg-zinc-600 hover:opacity-70"
                    style={{
                      backgroundImage: `url(${profileData.profilePicture})`,
                    }}
                    onClick={handleProfilePictureClick}
                  ></div>
                  <div className="text-text text-xl">
                    {profileData.displayName}
                  </div>
                </div>
              )}
              {loggedInUserId !== profileData.userId && profileData.userId && (
                <div className="bg-background2 p-10 lg:m-0 lg:p-0 grid-row-subgrid row-span-2 grid-cols-subgrid col-span-4 lg:col-span-3 lg:rounded-lg rounded-t-lg flex flex-col justify-center items-center gap-3">
                  <div
                    className="bg-cover bg-center bg-no-repeat size-36 rounded-full bg-zinc-600 hover:opacity-80"
                    style={{
                      backgroundImage: `url(${profileData.profilePicture})`,
                    }}
                  ></div>
                  <div className="text-text text-xl">
                    {profileData.displayName}
                  </div>
                  {profileData.following && (
                    <>
                      <button
                        className="h-8 w-48 bg-prim rounded-full  text-text "
                        onClick={followUserHandler}
                      >
                        Unfollow
                      </button>
                      <button
                        className="lg:hidden h-8 w-48 bg-accent rounded-full text-text"
                        onClick={mobileMessageButtonHandle}
                      >
                        Message
                      </button>
                      {/* Render the button for screens lg and larger */}
                      <button
                        className="hidden lg:block h-8 w-48 bg-prim rounded-full text-text"
                        onClick={messageButtonHandler}
                      >
                        Message
                      </button>
                    </>
                  )}
                  {!profileData.following && (
                    <>
                      <button
                        className="h-8 w-48 bg-prim rounded-full  text-text "
                        onClick={followUserHandler}
                      >
                        Follow
                      </button>
                      <button
                        className="lg:hidden h-8 w-48 bg-prim rounded-full text-text"
                        onClick={mobileMessageButtonHandle}
                      >
                        Message
                      </button>
                      {/* Render the button for screens lg and larger */}
                      <button
                        className="hidden lg:block h-8 w-48 bg-prim rounded-full text-text"
                        onClick={messageButtonHandler}
                      >
                        Message
                      </button>
                    </>
                  )}
                </div>
              )}
              <div
                className="bg-background3 lg:row-span-1 grid-cols-subgrid lg:col-span-2 col-span-2 w-full lg:rounded-tr-lg rounded-bl-lg text-text flex flex-col justify-center items-center"
                onClick={() => setFollowModalShow("Followers")}
              >
                <h1 className="text-2xl">Followers</h1>
                <h2 className="text-1xl">{profileData.followers}</h2>
              </div>
              <div
                className="bg-background3 lg:row-span-1 grid-cols-subgrid lg:col-span-2 col-span-2 w-full lg:rounded-br-lg rounded-br-lg text-text flex flex-col justify-center items-center"
                onClick={() => setFollowModalShow("Following")}
              >
                <h1 className="text-2xl">Following</h1>
                <h2 className="text-1xl">{profileData.followings}</h2>
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
            <ChatBox
              openChatRoomHandler={openChatRoomHandler}
              currentChatRoom={currentChatRoom}
              chatRooms={chatRooms || []}
              profileData={profileData}
              getChatRooms={getChatRooms}
              handleSetChatRooms={handleSetChatRooms}
              showChatMobile={showChatMobile}
              handleSetShowChatMobile={handleSetShowChatMobile}
            />
            <div className="bg-sec2 grid-cols-subgrid col-span-3 row-span-2 rounded-lg text-text flex flex-col justify-center items-center mb-2 lg:mb-0 p-1">
              <h1 className="text-2xl text-break text-center">
                Critiques Completed
              </h1>
              <h2 className="text-3xl">{profileData.totalCritiques}</h2>
            </div>
            <div className="bg-sec2 grid-cols-subgrid col-span-3 grid-row-subgrid row-span-2 rounded-lg  text-text flex flex-col justify-center items-center mb-2 lg:mb-0">
              <h1 className="text-2xl text-break  text-center">
                Critique Score
              </h1>
              <h2 className="text-3xl">{profileData.critiqueScore}</h2>
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
      )}
    </>
  );
};

export default ProfileInfo;
