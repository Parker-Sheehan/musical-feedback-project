import ProfileInfo from "../main/ProfileInfo.tsx";
import SongCard from "../main/SongCard.tsx";
import axios from "axios";
import { useAppSelector } from "../../store/store.ts";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export interface SongInfo {
  songId: number;
  title: string;
  embeddedLink: string;
  artLink: string;
  userId: number;
  artistQuestion: string;
  songReviewToken: number;
}

export interface Genre {
  genreId: number;
  genreName: string;
}

export interface ProfileData {
  displayName: string;
  genres: Genre[];
  profilePicture: string;
  userId: number;
  following: boolean;
  critiqueScore: number | null;
  totalCritiques: number;
  followings: number;
  followers: number;
}

const ProfilePage = () => {
  let loggedInUser = useAppSelector((state) => state.login);


  let id = useParams();

  let [songsArray, setSongsArray] = useState<SongInfo[]>([]);
  let [profileData, setProfileData] = useState<ProfileData>();

  const getProfileInfo = async () => {
    console.log(id.id)
    if (id.id) {
      console.log(id.id, "id is here");
      let newProfileData = await axios.get(
        `http://localhost:3000/getProfileInfo/${id.id}`
      );

      console.log(newProfileData);

      let {songs, displayName, genres, profilePicture, following, userId, critiqueScore, totalCritiques,  followings, followers} = newProfileData.data;

      let genreArray: Genre[] = genres.map((genre: any) => {
        return {
          genreId: genre.genreId,
          genreName: genre.genreName,
        };
      });

      console.log(userId)


      let data: ProfileData = {
        displayName,
        genres: genreArray,
        profilePicture,
        userId,
        following,
        critiqueScore,
        totalCritiques,
        followings: followings.length,
        followers: followers.length
      };


      setProfileData(data);
      setSongsArray(songs);
      return;
    } else {
      let newProfileData = await axios.get(
        `http://localhost:3000/getProfileInfo/${loggedInUser.userId}`
      );

      console.log(newProfileData);

      let { songs, displayName, genres, profilePicture, userId, following, critiqueScore, totalCritiques, followings, followers} = newProfileData.data;

      console.log(newProfileData.data)

    //  setFollowingStatus(newProfileData.data.following)

      let genreArray: Genre[] = genres.map((genre: any) => {
        return {
          genreId: genre.genreId,
          genreName: genre.genreName,
        };
      });

      let data: ProfileData = {
        displayName,
        genres: genreArray,
        profilePicture,
        userId,
        following,
        critiqueScore,
        totalCritiques,
        followings: followings.length,
        followers: followers.length
      };
      setProfileData(data);
      setSongsArray(songs);
    }
  };

  useEffect(() => {
    getProfileInfo();
    console.log("in useeffect");
  }, [id]);

  // let displayTracks = songsArray.map((song) => {
  //   return <SongCard key={song.songId} song={song} profileUserId={profileData.userId}/>;
  // });

  let setProfileDataHandler: (profileDataObj: ProfileData) => void = async (
    profileDataObj: ProfileData
  ) => {
    await axios.post(
      `http://localhost:3000/updateProfileInfo/${loggedInUser.userId}`,
      profileDataObj
    );
    let newProfileDataObj = {...profileData, ...profileDataObj}
    console.log(newProfileDataObj)
    setProfileData(newProfileDataObj);
  };

  const followUserHandler = async() =>{
    console.log(profileData)
    if(profileData?.following){
      // Unfollow
      console.log("unfolow++++++++++++")
      let unfollowUserResult = await axios.post(`http://localhost:3000/unfollowUser/${loggedInUser.userId}`, {followingUserId: profileData!.userId})
      let newProfileData = {...profileData, following: unfollowUserResult.data, followers : profileData.followers - 1}
      console.log(newProfileData)
      setProfileData(newProfileData)

    }else if(profileData?.following === false){
      // Follow
      console.log("FolLow++++++++++++")
      let followUserResult = await axios.post(`http://localhost:3000/followUser/${loggedInUser.userId}`, {followingUserId: profileData!.userId})
      console.log(followUserResult.data)
      let newProfileData = {...profileData, following: followUserResult.data, followers: profileData.followers + 1}
      console.log(newProfileData)
      setProfileData(newProfileData)
    }
  }

  console.log(profileData)

  return (
    <>
      {profileData ? (
        <main className="flex flex-col items-center">
          <ProfileInfo
            profileData={profileData}
            numOfSongs={songsArray.length}
            setProfileDataHandler={setProfileDataHandler}
            followUserHandler={followUserHandler}
          />
          <div className="flex flex-col lg:flex-row lg:flex-wrap lg:w-3/4 lg:h-fit lg:justify-between">
            {songsArray.map((song) => {
              return (
                <SongCard
                  key={song.songId}
                  song={song}
                  profileUserId={profileData!.userId}
                />
              );
            })}
          </div>
        </main>
      ) : (
        <main>
          <h2>Loading</h2>
        </main>
      )}
    </>
  );
};

export default ProfilePage;
