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

  let [songsArray, setSongsArray] = useState<SongInfo[]>([]);
  let [profileData, setProfileData] = useState<ProfileData>();

  const getProfileInfo = async () => {
    let newProfileData = await axios.get(
      `http://localhost:3000/getProfileInfo/${loggedInUser.userId}`
    );

    let { songs, displayName, genres, profilePicture } = newProfileData.data;

    let genreArray:string[] = (genres.map((genre: any) => {
      return (genre.genreName)
    }));

    let data: ProfileData = {
      displayName,
      genres: genreArray,
      profilePicture,
    };
    setProfileData(data);
    setSongsArray(songs);
  };

  useEffect(() => {
    getProfileInfo();
    console.log("in useeffect");
  }, []);

  const onEditPfp = async (profilePictureUrl: string) => {
    let newProfileData: ProfileData = {
      ...profileData!,
      profilePicture: profilePictureUrl,
    };
    console.log(newProfileData);
    let updatedProfileData = await axios.post(
      `http://localhost:3000/updateProfileInfo/${loggedInUser.userId}`,
      newProfileData
    );
    setProfileData(newProfileData);
  };

  let displayTracks = songsArray.map((song) => {
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
