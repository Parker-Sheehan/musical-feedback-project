import React, { useEffect, useRef, useState } from "react";
import instance from "../../utils/axios";
import { Link, useLocation, useParams } from "react-router-dom";
import SongInfoCard from "../main/SongInfoCard";
import { useAppSelector } from "../../store/store";

import { ReviewInfo } from "./SongProfilePage";
import { SongAndUser } from "./ReviewSong";

interface CritiqueObject {
  aestheticCritique: string;
  technicalCritique: string;
  artistCritique: string;
  critiqueScore: number | null;
  reviewId: number
}

const ViewReviewPage = () => {
  let loggedInUser = useAppSelector((state) => state.login);

  const [reviewInfo, setReviewInfo] = useState<CritiqueObject>();
  const [songInfo, setSongInfo] = useState<SongAndUser | null>(null);
  const [reviewByName, setReviewByName] = useState<string>();
  let [artistQuestion, setArtistQuestion] = useState<string>("");

  const [critiqueScore, setCritiqueScore] = useState<number | undefined>();

  console.log(reviewInfo);

  const { id } = useParams();

  const submitCritiqueScoreHandler = async() => {
    if (critiqueScore !== undefined && critiqueScore >= 0 && critiqueScore <= 5 && reviewInfo?.critiqueScore === null) {
      console.log(critiqueScore)
      // Submit the critique score to the server
      let submitCritiqueScore = await instance.post(`http://localhost:3000/submitCritiqueScore`, {reviewId: reviewInfo.reviewId, critiqueScore: critiqueScore});

      console.log("Submitting critique score:", critiqueScore);
    } else {
      console.error("Invalid critique score");
    }
  };
  

  const getReviewInfo = async () => {
    console.log("yay");
    let reviewData = await instance.get(`http://localhost:3000/getReview/${id}`);

    console.log(reviewData.data)

    // setReviewInfo()
    let { aestheticCritique, technicalCritique, artistCritique, critiqueScore, reviewId } =
      reviewData.data;

    let critiqueObject: CritiqueObject = {
      aestheticCritique,
      technicalCritique,
      artistCritique,
      critiqueScore,
      reviewId
    };

    setReviewInfo(critiqueObject);

    console.log(reviewData.data);

    let { song, reviewFor, reviewBy } = reviewData.data;

    setArtistQuestion(song.artistQuestion);

    let songAndUser = {
      songInfo: {
        songId: song.songId,
        title: song.title,
        embeddedLink: song.embeddedLink,
        artLink: "",
        userId: song.userId,
        artistQuestion: song.artistQuestion,
        songReviewToken: song.songReviewToken,
      },
      userInfo: {
        displayName: reviewFor.displayName,
        userId: reviewFor.userId,
        profilePicture: reviewFor.profilePicture,
      },
    };

    setSongInfo(songAndUser);
    setReviewByName(reviewBy.displayName);
    // console.log(songAndUser)
    // setSongInfo(songAndUser);
    console.log(reviewData.data, "review data");
    // setReviewInfo(reviewData.data);
  };

  useEffect(() => {
    // if (location.state) {
    //   setReviewInfo(location.state.reviewObj);
    // } else {
    getReviewInfo();
    // }
  }, []);

  return (
    <main className="flex flex-column items-center size-full bg-background h-fit">
      <h1 className=" text-text m-3">{reviewByName} Review</h1>
      {songInfo && <SongInfoCard SongAndUser={songInfo} />}

      <div className="flex flex-col w-11/12 bg-background2 items-center rounded-lg m-3">
        <div className="bg-sec2 size-4/5 flex flex-col items-center m-6 rounded-md h-72 justify-evenly">
          <p className="text-text ">Aesthetic question</p>
          <p className="text-text w-11/12">
            {reviewByName}'s opinion on the aesthetic of this song, what sort of
            imagery or feelings it invokes?
          </p>
          <textarea
            className="w-11/12 h-50 pointer-events-none"
            value={reviewInfo?.aestheticCritique}
          >
            {}
          </textarea>
        </div>
        <div className="bg-sec2 size-4/5 flex flex-col items-center m-6 rounded-md h-72 justify-evenly">
          <p className="text-text ">Technical question</p>
          <p className="text-text w-11/12">
            {reviewByName}'s opinion on what technical aspects of the production
            they think could be improved{" "}
            {"(EQ, ryhthm, mix, sound design, musicality, etc...)"} and which
            ones they think were executed well?
          </p>
          <textarea
            className="w-11/12 h-50 pointer-events-none"
            value={reviewInfo?.technicalCritique}
          ></textarea>
        </div>
        <div className="bg-sec2 size-4/5 flex flex-col items-center m-6 rounded-md h-72 justify-evenly pb-2">
          <p className="text-text ">Artist's question</p>
          <p className="text-text  w-11/12">
            {reviewByName}'s opinion on your personal question of...{" "}
            {artistQuestion}
          </p>
          <textarea
            className="w-11/12 h-50 pointer-events-none"
            value={reviewInfo?.artistCritique}
          ></textarea>
        </div>
        {loggedInUser.userId === songInfo?.userInfo.userId && (
          <>
            <div className="bg-sec2 size-2/5 flex flex-col items-center m-6 rounded-md h-72 justify-evenly pb-2">
              <p className="text-text ">Critique Score</p>
              <p className="text-text w-11/12">
                how do you think {reviewByName} did in critiquing your song
              </p>
              <input
                type="number"
                min={0}
                max={5}
                value={critiqueScore || ""}
                onChange={(e) => setCritiqueScore(parseInt(e.target.value))}
              />

              <button
                className=" size-fit bg-white"
                onClick={() => {
                  submitCritiqueScoreHandler();
                }}
              >
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default ViewReviewPage;
