import ProfileInfo from "../main/ProfileInfo.tsx";
import SongCard from "../main/SongCard.tsx";
import "./ProfilePage.css";
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
}

export interface Genre {
    genreId : number;
    genreName : string;
}

export interface ProfileData {
  displayName: string;
  genres: Genre[]
  profilePicture: string;
}

const ProfilePage = () => {
  let loggedInUser = useAppSelector((state) => state.login);

  let id = useParams()

  console.log(id, "useParamas")


  let [songsArray, setSongsArray] = useState<SongInfo[]>([]);
  let [profileData, setProfileData] = useState<ProfileData>();

  const getProfileInfo = async () => {
    if(id.id){
      console.log(id.id, "id is here")
      let newProfileData = await axios.get(
        `http://localhost:3000/getProfileInfo/${id.id}`
      );
  
      let { songs, displayName, genres, profilePicture } = newProfileData.data;
      console.log(genres)
      let genreArray: Genre[] = (genres.map((genre: any) => {
        return ({
          genreId : genre.genreId,
          genreName: genre.genreName
        })
      }));
  
      let data: ProfileData = {
        displayName,
        genres: genreArray,
        profilePicture,
      };
      setProfileData(data);
      setSongsArray(songs);
      return
    }
    let newProfileData = await axios.get(
      `http://localhost:3000/getProfileInfo/${loggedInUser.userId}`
    );

    let { songs, displayName, genres, profilePicture } = newProfileData.data;
    console.log(genres)
    let genreArray: Genre[] = (genres.map((genre: any) => {
      return ({
        genreId : genre.genreId,
        genreName: genre.genreName
      })
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
  }, [id]);

  let displayTracks = songsArray.map((song) => {
    return <SongCard key={song.songId} song={song} />;
  });

  let setProfileDataHandler: (profileDataObj: ProfileData) => void = async (profileDataObj: ProfileData) => {
    console.log(profileDataObj)
    console.log("hit setProfileDataHandler")
    let updatedProfileData = await axios.post(
      `http://localhost:3000/updateProfileInfo/${loggedInUser.userId}`,
      profileDataObj
    );
    setProfileData(profileDataObj);
  }

  return (
    <>
      {profileData ? (
        <main id="profile-page-main">
          <ProfileInfo profileData={profileData} setProfileDataHandler={setProfileDataHandler}/>
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
