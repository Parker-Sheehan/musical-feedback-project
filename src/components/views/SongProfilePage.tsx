import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import "./SongProfilePage.css";
import ReviewCard from '../main/ReviewCard'
import SongInfoCard from "../main/SongInfoCard";
import axios from "axios";
import { SongInfo } from "./ProfilePage";

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
  const [songInfo, setSongInfo] = useState<SongInfo>()

  const location = useLocation()

  let {id} = useParams()

  const retrieveCtitiqueData = async() => {
    const res = await axios.put(`http://localhost:3000/getCritique/${id}`);
    setReviewsArray(res.data)

  }

  const getSongInfo = async() => {
    let songData = await axios.put(`http://localhost:3000/getSong/${id}`)
    console.log(songData)
    setSongInfo(songData.data)
  }

  useEffect(()=>{
    if(location.state){
      setSongInfo(location.state.songObj)
    } else {
      console.log('yayyy in else')
      getSongInfo()
    }
    retrieveCtitiqueData()
  },[])

  console.log(songInfo)

  // console.log(location.state.songObj)
  let mappedReviews = reviewsArray.map((review) => {
    return <ReviewCard key={review.id} review={review}/>
  })

  return (
    <main id="song-profile-main">
      {songInfo && <SongInfoCard song={songInfo}/>}
      <div id="song-review-container">
        {mappedReviews}
      </div>
    </main>
  );
};

export default SongProfilePage;
