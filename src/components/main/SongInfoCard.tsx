import { FC } from "react";
import { SongInfo } from "../views/ProfilePage";
import { SongAndUser } from "../views/ReviewSong";
import { Link } from "react-router-dom";
export interface SongInfoProp {
  SongAndUser: SongAndUser | null;
}

const SongInfoCard: FC<SongInfoProp> = ({ SongAndUser }) => {
  if (SongAndUser !== null) {
    console.log(SongAndUser);
    let { songInfo, userInfo } = SongAndUser;
    console.log(userInfo.profilePicture);
    return (
      <div className="md:m-12 m-2 h-fit w-11/12 rounded-lg flex bg-background2">

        {/* <div className="m-10 w-1/2 flex flex-col justify-center items-center"> */}
         <Link className=" decoration-transparent m-10 w-1/2 flex flex-col justify-center items-center" to={"/Profile/" + userInfo.userId}>
          <div
            id="album-cover-card"
            className="w-full rounded-lg aspect-square flex flex-col"
            style={{
              backgroundImage: `url(${userInfo.profilePicture})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
            >
            <h1 className="text-center text-xl text-text font-semibold bg-black opacity-70 size-fit self-center mt-2">{userInfo.displayName}</h1>
          </div>
          </Link>
        {/* </div> */}
        <div className="m-10 w-1/2 flex flex-col justify-center items-center">
          <div className="w-full rounded-lg aspect-square">
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
    return (
      <div className="flex justify-center items-center h-75vh">
        <h1 className="text-xl font-heading text-text">Retrieving Song</h1>
      </div>
    );
  }
};

export default SongInfoCard;
