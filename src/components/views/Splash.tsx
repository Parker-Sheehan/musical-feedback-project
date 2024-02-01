// import "./ProfileInfo.css";
import { FC, useState } from "react";
// import MyVerticallyCenteredModal from '../ui/MyVerticallyCenteredModal'

// import { ProfileData } from "../views/ProfilePage";

// interface ProfileDataProp {
//   profileData: ProfileData;
//   setProfileDataHandler : (profileDataObj: ProfileData) => void
// }

const ProfileInfo= () => {
  // console.log(profileData);

  // const [togglePfpModal,setTogglePfpModal] = useState<boolean>(false)
  
  // const handleProfilePictureClick = () => {
  //   setTogglePfpModal(true);
  // };

  let genreArray: string[] = [
    'drum and bass',
    'trap',
    'house'
  ]

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
        <div className="grid-row-subgrid row-span-2 grid-cols-subgrid col-span-3 rounded-lg"></div>
        <div className="bg-background3 grid-row-subgrid row-span-1 grid-cols-subgrid col-span-2 rounded-tr-lg"></div>
        <div className="bg-background3 grid-row-subgrid row-span-1  grid-cols-subgrid col-span-2 rounded-br-lg"></div>
        
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
