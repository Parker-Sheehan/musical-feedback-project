import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./SongProfilePage.css";
import ReviewCard from '../main/ReviewCard'
import SongInfoCard from "../main/SongInfoCard";
import axios from "axios";
import { SongInfo } from "./ProfilePage";
import { SongAndUser } from "./ReviewSong";

export interface ReviewInfo {
  id: number;
  reviewFor: number;
  author: string;
  totalScore: number;
  overallThoughts: string;
  musicalityScore: number;
  musicalityThoughts: string;
  grooveScore: number;
  grooveThoughts: string;
  soundDesignScore: number;
  soundDesignThoughts: string;
  arrangmentScore: number;
  arrangmentThoughts: string;
  mixMasterScore: number;
  mixMasterThoughts: string;
}

const SongProfilePage = () => {
  const [reviewsArray, setReviewsArray] = useState<ReviewInfo[]>([])
  const [songInfo, setSongInfo] = useState<SongAndUser | null>(null)


  let {id} = useParams()

  // const retrieveCtitiqueData = async() => {
  //   const res = await axios.put(`http://localhost:3000/getCritique/${id}`);
  //   setReviewsArray(res.data)

  // }

  const getSongInfo = async() => {
    let songData = await axios.get(`http://localhost:3000/getSongProfileInfo/${id}`)
    console.log(songData.data)
    let {songId, title, embeddedLink} = songData.data
    let {displayName, userId, profilePicture} = songData.data.user
    let {reviews} = songData.data
    console.log(reviews)
    setReviewsArray(reviews)
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
    setSongInfo(songAndUser)
  }

  useEffect(()=>{
    console.log('useEffect hit')
    getSongInfo()
  },[])

  console.log(songInfo)

  let mappedReviews = reviewsArray.map((review) => {
    return <ReviewCard key={review.id} review={review}/>
  })

  return (
    <main id="song-profile-main">
      {songInfo && <SongInfoCard SongAndUser={songInfo}/>}
      <div id="song-review-container">
        {mappedReviews}
      </div>
    </main>
  );
};

export default SongProfilePage;
