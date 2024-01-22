import { FC, useEffect, useState } from "react";
import SongInfoCard from "../main/SongInfoCard";
import { useAppSelector, useAppDispatch } from "../../store/store";
import axios from "axios";
import { SongInfo } from "./ProfilePage";
import {updateSongInReview} from "../../store/slices/loginSlice"

export interface SongAndUser {
  songInfo: SongInfo
  userInfo: {displayName: string; userId: number; profilePicture: string}
}


const ReviewSong = () => {

  let dispatch = useAppDispatch()
  // on review submit set song in review to 0 to reset
  let [song, setSong] = useState<SongAndUser | null>(null)

  let loginState = useAppSelector((state) => state.login)
  console.log(loginState, "login state redux" )

  const getRandomSong = async() => {
    console.log(loginState.userId)
    let randomSong = await axios.get(`http://localhost:3000/getRandomSong/${loginState.userId}`)
    console.log(randomSong.data)
    let {songId, title, embeddedLink} = randomSong.data
    let {displayName, userId, profilePicture} = randomSong.data.user
    let songAndUser = {
      songInfo: {
        songId: songId,
        title,
        embeddedLink,
        artLink: '',
        userId
      },
      userInfo: {
        displayName,
        userId,
        profilePicture
      }
    }
    setSong(songAndUser)
    console.log(songId)
    dispatch(updateSongInReview(songId))

    console.log(randomSong)
    // setSong(randomSong.data)
  }

  const getSongInReview = async() => {
  let songToReview = await axios.get(`http://localhost:3000/getSong/${loginState.songInReview}`)
    console.log(songToReview.data)
    let {songId, title, embeddedLink} = songToReview.data
    let {displayName, userId, profilePicture} = songToReview.data.user
    let songAndUser = {
      songInfo: {
        songId: songId,
        title,
        embeddedLink,
        artLink: '',
        userId
      },
      userInfo: {
        displayName,
        userId,
        profilePicture
      }
    }
    setSong(songAndUser)
  }
  useEffect(() => {
    if(loginState.songInReview === 0){
      getRandomSong()
      console.log("random")
    }else{
      getSongInReview()
      console.log("current")
    }

  },[])



  console.log(song)

  return (
    <main id="song-profile-main">
      <SongInfoCard SongAndUser={song}/>
      <div id="critique-box-container">
        <div className="critique-box">
          <p>promt musicality?</p>
          <label>rating</label>
          <input type="number" max={5} min={0} />
          <textarea name="" id=""></textarea>
        </div>
        <div className="critique-box">
          <p>promt rhythm?</p>
          <label>rating</label>
          <input type="number" max={5} min={0} />
          <textarea name="" id=""></textarea>
        </div>
        <div className="critique-box">
          <p>promt sound design?</p>
          <label>rating</label>
          <input type="number" max={5} min={0} />
          <textarea name="" id=""></textarea>
        </div>
        <div className="critique-box">
          <p>promt arrangment?</p>
          <label>rating</label>
          <input type="number" max={5} min={0} />
          <textarea name="" id=""></textarea>
        </div>
        <div className="critique-box">
          <p>promt mixing/master?</p>
          <label>rating</label>
          <input type="number" max={5} min={0} />
          <textarea name="" id=""></textarea>
        </div>
        <div className="critique-box">
          <p>promt overall personal take?</p>
          <label>rating</label>
          <input type="number" max={5} min={0} />
          <textarea name="" id=""></textarea>
        </div>
        <button>Submit</button>
      </div>
    </main>
  );
};

export default ReviewSong;
