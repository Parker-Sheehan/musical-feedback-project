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
      `http://localhost:3000/getProfileInfo/1`
    );
    let { songs, displayName, genres, profilePicture } = profileData.data;
    console.log(profileData.data);
    console.log(genres.split(","));
    let data: ProfileData = {
      displayName,
      genres: genres.replaceAll(","," - "),
      profilePicture,
    };
    setSongsArray(songs);
    setProfileData(data);
  };

  console.log(songsArray);
  console.log(profileData);

  useEffect(() => {
    getProfileInfo();
  }, []);

  let displayTracks = songsArray.map((song) => {
    console.log(song)
    return <SongCard key={song.songId} song={song} />;
  });

  return (
    <>
      {profileData ? (
        <main id="profile-page-main">
          <ProfileInfo profileData={profileData} />
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
