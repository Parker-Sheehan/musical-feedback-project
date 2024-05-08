import { FC, useEffect, useState } from "react";
import SongInfoCard from "../main/SongInfoCard";
import { useAppSelector, useAppDispatch } from "../../store/store";
import instance from "../../utils/axios";
import { SongInfo } from "./ProfilePage";
import {updateSongInReview} from "../../store/slices/loginSlice"
import ReviewSection from "../main/ReviewSection";

export interface SongAndUser {
  songInfo: SongInfo
  userInfo: {displayName: string; userId: number; profilePicture: string}
}


const ReviewSong = () => {

  let [song, setSong] = useState<SongAndUser | null>(null)
  let [artistQuestion, setArtistQuestion] = useState<string>('')

  let loginState = useAppSelector((state) => state.login)

  const getReviewSong = async() => {
    // try{
      let songToReview = await instance.get(`http://localhost:3000/getReviewSong/${loginState.userId}`)
        console.log(songToReview.data)
        let {songId, title, embeddedLink, artistQuestion, songReviewToken} = songToReview.data
        let {displayName, userId, profilePicture} = songToReview.data.user
        console.log(songToReview.data)
    
        setArtistQuestion(songToReview.data.artistQuestion)
    
        let songAndUser: SongAndUser  = {
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

    // }catch(err: any){
    //   return alert(err.response)
    // }
  }



  console.log(song?.userInfo.userId)

  useEffect(() => {

      getReviewSong()
      console.log("current")

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
