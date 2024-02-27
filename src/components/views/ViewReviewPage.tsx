import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import SongInfoCard from "../main/SongInfoCard";

import { ReviewInfo } from "./SongProfilePage";
import { SongAndUser } from "./ReviewSong";

const ViewReviewPage = () => {
  const [reviewInfo, setReviewInfo] = useState<ReviewInfo>();
  const [songInfo, setSongInfo] = useState<SongAndUser | null>(null);
  const [reviewByName, setReviewByName] = useState<string>()


  console.log(reviewInfo);

  const { id } = useParams();

  const getReviewInfo = async () => {
    console.log("yay");
    let reviewData = await axios.get(`http://localhost:3000/getReview/${id}`);
    

    console.log(reviewData)

    let {song, reviewFor, reviewBy} = reviewData.data

    console.log(song, "Song")
    console.log(reviewFor, "For")
    console.log(reviewBy, "By")

    let songAndUser = {
      songInfo: {
        songId: song.songId,
        title: song.title,
        embeddedLink: song.embeddedLink,
        artLink: "",
        userId: song.userId,
      },
      userInfo: {
        displayName: reviewFor.displayName,
        userId: reviewFor.userId,
        profilePicture: reviewFor.profilePicture,
      },
    };

    setSongInfo(songAndUser)
    setReviewByName(reviewBy.displayName)
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
    <main className="flex flex-column items-center size-full bg-background">
      <h1 className="text-heading text-text m-3">{reviewByName} Review</h1>
      {songInfo && <SongInfoCard SongAndUser={songInfo} />}

      <div className="flex flex-col w-11/12 bg-background2 items-center rounded-lg`">
        <div className="bg-red-500 size-4/5 flex flex-col items-center m-6 rounded-md h-72 justify-evenly">
          <p className="text-background font-body">Aesthetic question</p>
          <p className="text-background font-body w-11/12">
            {}'s opinion on the aesthetic of this song, what sort of imagery or
            feelings it invokes?
          </p>
          <textarea className="w-11/12 h-50"></textarea>
        </div>
        <div className="bg-red-500 size-4/5 flex flex-col items-center m-6 rounded-md h-72 justify-evenly">
          <p className="text-background font-body">Technical question</p>
          <p className="text-background font-body w-11/12">
          {}'s opinion on what technical aspects of the production they think could be
            improved {"(EQ, ryhthm, mix, sound design, musicality, etc...)"} and
            which ones they think were executed well?
          </p>
          <textarea className="w-11/12 h-50"></textarea>
        </div>
        <div className="bg-red-500 size-4/5 flex flex-col items-center m-6 rounded-md h-72 justify-evenly pb-2">
          <p className="text-background font-body">Artist's question</p>
          <p className="text-background font-body w-11/12">
          {}'s opinion on your personal question of...
          </p>
          <textarea className="w-11/12 h-50"></textarea>
        </div>
      </div>
    </main>
  );
};

export default ViewReviewPage;
