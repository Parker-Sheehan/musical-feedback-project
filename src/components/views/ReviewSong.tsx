import { FC, useEffect, useState } from "react";
import SongInfoCard from "../main/SongInfoCard";
import { useAppSelector, useAppDispatch } from "../../store/store";
import axios from "axios";
import { SongInfo } from "./ProfilePage";
import {updateSongInReview} from "../../store/slices/loginSlice"
import ReviewSection from "../main/ReviewSection";

export interface SongAndUser {
  songInfo: SongInfo
  userInfo: {displayName: string; userId: number; profilePicture: string}
}


const ReviewSong = () => {

  let dispatch = useAppDispatch()
  // on review submit set song in review to 0 to reset
  let [song, setSong] = useState<SongAndUser | null>(null)
  let [artistQuestion, setArtistQuestion] = useState<string>('')

  let loginState = useAppSelector((state) => state.login)
  console.log(loginState, "login state redux" )

  const getRandomSong = async() => {
    console.log(loginState.userId)
    let randomSong = await axios.get(`http://localhost:3000/getRandomSong/${loginState.userId}`)
    console.log(randomSong.data)
    let {songId, title, embeddedLink, artistQuestion, songReviewToken} = randomSong.data
    if(songId === undefined){
      alert("Try expanding genre preferences there are no songs to critique right now.")
    }
    let {displayName, userId, profilePicture} = randomSong.data.user
    let songAndUser: SongAndUser = {
      songInfo: {
        songId: songId,
        title,
        embeddedLink,
        artLink: '',
        userId,
        artistQuestion,
        songReviewToken
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
    let {songId, title, embeddedLink, artistQuestion, songReviewToken} = songToReview.data
    let {displayName, userId, profilePicture} = songToReview.data.user
    console.log(songToReview.data)

    setArtistQuestion(songToReview.data.artistQuestion)

    let songAndUser = {
      songInfo: {
        songId: songId,
        title,
        embeddedLink,
        artLink: '',
        userId,
        artistQuestion,
        songReviewToken
      },
      userInfo: {
        displayName,
        userId,
        profilePicture
      }
    }
    setSong(songAndUser)
  }

  console.log(song?.userInfo.userId)

  useEffect(() => {
    if(loginState.songInReview === 0){
      getRandomSong()
      console.log("random")
    }else{
      getSongInReview()
      console.log("current")
    }

  },[])

  console.log(artistQuestion)
  
  return (
    <main className="flex flex-col items-center h-fit">
      <h1 className="text-heading text-text">Review {song?.songInfo.title}</h1>
      <SongInfoCard SongAndUser={song}/>
      <ReviewSection reviewForId={song?.userInfo.userId} songId={song?.songInfo.songId} artistQuestion={artistQuestion}/>
    </main>
  );
};

export default ReviewSong;
