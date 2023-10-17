import ProfileInfo from "../main/ProfileInfo.tsx";
import SongCard from "../main/SongCard.tsx";
import "./ProfilePage.css";
import axios from "axios";
import { useEffect, useState } from "react";

export interface SongInfo {
  id: number,
  title: string,
  embeddedLink: string,
  artLink: string
}

const ProfilePage = () => {

  let [songsArray, setSongsArray] = useState<SongInfo[]>([])

  const getSongInfo = async() => {
    let songData = await axios.get("http://localhost:3000/getSongs")
    setSongsArray(songData.data)
  }

  console.log(songsArray)

  useEffect(()=> {
    getSongInfo()
  },[])

  let displayTracks = songsArray.map((song)=>{
    return <SongCard key={song.id} song={song}/>
  })

  return (
    <main id="profile-page-main">
      <ProfileInfo />
      <div id="song-card-container">
        {displayTracks}
      </div>
    </main>
  );
};

export default ProfilePage;
