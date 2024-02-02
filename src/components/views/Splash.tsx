// import "./ProfileInfo.css";
import { FC, useState } from "react";
// import MyVerticallyCenteredModal from '../ui/MyVerticallyCenteredModal'

// import { ProfileData } from "../views/ProfilePage";

// interface ProfileDataProp {
//   profileData: ProfileData;
//   setProfileDataHandler : (profileDataObj: ProfileData) => void
// }

const ProfileInfo = () => {
  // console.log(profileData);

  // const [togglePfpModal,setTogglePfpModal] = useState<boolean>(false)

  // const handleProfilePictureClick = () => {
  //   setTogglePfpModal(true);
  // };

  let genreArray: string[] = ["drum and bass", "trap", "house"];

  return (
    <>
      {/* <MyVerticallyCenteredModal
        show={togglePfpModal}
        onHide={() => setTogglePfpModal(false)}
        setProfileDataHandler={setProfileDataHandler}
        profileData={profileData}
      /> */}
      <div className="m-10 w-3/4 h-3/4 rounded-lg grid grid-rows-4 grid-cols-10 gap-3">
        <div className="bg-background2 grid-cols-subgrid col-span-5 grid-row-subgrid row-span-2 rounded-lg grid grid-cols-5 gap-1">
          <div className="grid-row-subgrid row-span-2 grid-cols-subgrid col-span-3 rounded-lg flex flex-col justify-center items-center gap-3">
            <div
              className="bg-cover bg-center bg-no-repeat size-36 rounded-full mb-2"
              style={{
                backgroundImage: `url(https://wallpapers-clan.com/wp-content/uploads/2022/02/hunter-x-hunter-killua-pfp-1.jpg)`,
              }}
            ></div>
            <button className="h-8 w-48 bg-accent flex justify-center items-center rounded-full  text-text ">
              Follow
            </button>
            <button className="h-8 w-48 bg-accent rounded-full text-text">
              Message
            </button>
          </div>
          <div className="bg-background3 grid-row-subgrid row-span-1 grid-cols-subgrid col-span-2 rounded-tr-lg text-text flex flex-col justify-center items-center">
            <h1 className="text-2xl">Followers</h1>
            <h2 className="text-xl">180</h2>
          </div>
          <div className="bg-background3 grid-row-subgrid row-span-1 grid-cols-subgrid col-span-2 rounded-tr-lg text-text flex flex-col justify-center items-center">
            <h1 className="text-2xl">Following</h1>
            <h2 className="text-xl">180</h2>
          </div>       
          </div>
        <div className="bg-background2 grid-cols-subgrid col-span-3 grid-row-subgrid row-span-2 rounded-lg"></div>
        <div className="bg-gradient-to-br from-prim to-accent grid-cols-subgrid col-span-2 grid-row-subgrid row-span-4  rounded-lg"></div>
        <div className="bg-sec2 grid-cols-subgrid col-span-3 grid-row-subgrid row-span-2 rounded-lg"></div>
        <div className="bg-sec2  grid-cols-subgrid col-span-3 grid-row-subgrid row-span-2 rounded-lg"></div>
        <div className="bg-sec2 grid-cols-subgrid col-span-2 rounded-lg"></div>
        <div className="bg-sec2 grid-cols-subgrid col-span-2 rounded-lg"></div>
      </div>
    </>
  );
};

export default ProfileInfo;
