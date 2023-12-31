import ProfileInfo from "../main/ProfileInfo.tsx";
import SongCard from "../main/SongCard.tsx";
import "./ProfilePage.css";
import axios from "axios";
import { useAppSelector } from "../../store/store.ts";
import { useEffect, useState } from "react";

export interface SongInfo {
  songId: number;
  title: string;
  embeddedLink: string;
  artLink: string;
  userId: number;
}

export interface ProfileData {
  displayName: string;
  genres: string[];
  profilePicture: string;
}

const ProfilePage = () => {
  let loggedInUser = useAppSelector((state) => state.login);
  console.log(loggedInUser.userId);

  let [songsArray, setSongsArray] = useState<SongInfo[]>([]);
  let [profileData, setProfileData] = useState<ProfileData>();

  const getProfileInfo = async () => {
    let profileData = await axios.get(
      `http://localhost:3000/getProfileInfo/${loggedInUser.userId}`
    );
    console.log(profileData, "profile data")
    let { songs, displayName, genres, profilePicture } = profileData.data;
    // console.log(profileData)
    // console.log(profileData);
    console.log(genres);
    if(genres){
      let data: ProfileData = {
        displayName,
        genres: genres.replaceAll(","," - "),
        profilePicture,
      };
      setProfileData(data);

    }else{
      let data: ProfileData = {
        displayName,
        genres: ["Add Genre Prefrence"],
        profilePicture
      }
      setProfileData(data);
    }
    setSongsArray(songs);
  };

  console.log(songsArray);
  console.log(profileData);

  
    useEffect(() => {
      getProfileInfo();
    }, []);

  const onEditPfp = async (profilePictureUrl: string) => {
    let newProfileData:ProfileData = {...profileData!, profilePicture: profilePictureUrl}
    console.log(newProfileData)
    let updatedProfileData = await axios.post(`http://localhost:3000/updateProfileInfo/${loggedInUser.userId}`, newProfileData)
    console.log(updatedProfileData)
    setProfileData(newProfileData)
  }

  let displayTracks = songsArray.map((song) => {
    console.log(song)
    return <SongCard key={song.songId} song={song} />;
  });

  return (
    <>
      {profileData ? (
        <main id="profile-page-main">
          <ProfileInfo profileData={profileData} onEditPfp={onEditPfp} />
          <div id="song-card-container">{displayTracks}</div>
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
