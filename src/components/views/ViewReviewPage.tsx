import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useParams } from "react-router-dom";
import "./ViewReviewPage.css";
import SongInfoCard from "../main/SongInfoCard";

import { ReviewInfo } from "./SongProfilePage";

const ViewReviewPage = () => {
  const [reviewInfo, setReviewInfo] = useState<ReviewInfo>();

  const location = useLocation();

  console.log(location);

  const { id } = useParams();

  const getReviewInfo = async () => {
    console.log("yay");
    let reviewData = await axios.put(`http://localhost:3000/getReview/${id}`);
    console.log(reviewData);
    setReviewInfo(reviewData.data);
  };

  console.log(location.state);

  useEffect(() => {
    if (location.state) {
      setReviewInfo(location.state.reviewObj);
    } else {
      getReviewInfo();
    }
  }, []);

  console.log(reviewInfo);

  return (
    <main id="song-profile-main">
      <h1>SolRaKing's critique of Spacetime</h1>
      {reviewInfo && (
        <div id="critique-box-container">
          <div className="critique-box">
            <h2>Musicality {reviewInfo.musicalityScore}/5</h2>
            <div className="inside-critique-box">
              <p>{reviewInfo.musicalityScore}</p>
            </div>
          </div>
          <div className="critique-box">
            <h2>Sound Design {reviewInfo.soundDesignScore}/5</h2>
            <div className="inside-critique-box">
              <p>{reviewInfo.soundDesignThoughts}</p>
            </div>
          </div>
          <div className="critique-box">
            <h2>Arrangment {reviewInfo.arrangmentScore}/5</h2>
            <div className="inside-critique-box">
              <p>{reviewInfo.arrangmentThoughts}</p>
            </div>
          </div>
          <div className="critique-box">
            <h2>Groove {reviewInfo.grooveScore}/5</h2>
            <div className="inside-critique-box">
              <p>{reviewInfo.grooveThoughts}</p>
            </div>
          </div>
          <div className="critique-box">
            <h2>Mix/Master {reviewInfo.mixMasterScore}/5</h2>
            <div className="inside-critique-box">
              <p>{reviewInfo.mixMasterThoughts}</p>
            </div>
          </div>
          <div className="critique-box">
            <h2>Overall Thoughts {reviewInfo.totalScore}/5</h2>
            <div className="inside-critique-box">
              <p>{reviewInfo.overallThoughts}</p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ViewReviewPage;
