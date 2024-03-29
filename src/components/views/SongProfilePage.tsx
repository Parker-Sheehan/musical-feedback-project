import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import ReviewCard from "../main/ReviewCard";
import SongInfoCard from "../main/SongInfoCard";
import axios from "axios";
import { SongInfo } from "./ProfilePage";
import { SongAndUser } from "./ReviewSong";

export interface ReviewInfo {
  reviewId: number;
  songId: number;
  reviewByUserId: number;
  reviewForUserId: number;
  aestheticCritique: string;
  technicalCritique: string;
  artistCritique: string;
  reviewBy: {
    displayName: string;
    email: string;
    password: string;
    profilePicture: string;
    songInReview: number;
    userId: number;
    userReviewToken: number;
  };
}

const SongProfilePage = () => {
  const [reviewsArray, setReviewsArray] = useState<ReviewInfo[]>([]);
  const [songInfo, setSongInfo] = useState<SongAndUser | null>(null);

  console.log(reviewsArray);

  let { id } = useParams();

  // const retrieveCtitiqueData = async() => {
  //   const res = await axios.put(`http://localhost:3000/getCritique/${id}`);
  //   setReviewsArray(res.data)

  // }

  const getSongInfo = async () => {
    let songData = await axios.get(
      `http://localhost:3000/getSongProfileInfo/${id}`
    );
    console.log(songData.data);
    let { songId, title, embeddedLink, artistQuestion, songReviewToken } =
      songData.data;
    console.log(songData);
    let { displayName, userId, profilePicture } = songData.data.user;
    let { reviews } = songData.data;
    console.log(reviews);
    setReviewsArray(reviews);
    let songAndUser = {
      songInfo: {
        songId: songId,
        title,
        embeddedLink,
        artLink: "",
        userId,
        artistQuestion,
        songReviewToken,
      },
      userInfo: {
        displayName,
        userId,
        profilePicture,
      },
    };
    setSongInfo(songAndUser);
  };

  useEffect(() => {
    console.log("useEffect hit");
    getSongInfo();
  }, []);

  console.log(songInfo);

  // let mappedReviews = ;

  return (
    <main className="flex flex-col items-center w-11/12">
      {songInfo && <SongInfoCard SongAndUser={songInfo} />}
      {reviewsArray &&
        reviewsArray.map((review) => {
          return (
            <ReviewCard
              key={review.reviewId}
              review={review}
              author={review.reviewBy.displayName}
            />
          );
        })}
    </main>
  );
};

export default SongProfilePage;
