import React, { FC } from "react";
import { Link } from "react-router-dom";
import { ReviewInfo } from "../views/SongProfilePage";

export interface ReviewCardProps {
  review: ReviewInfo;
  author: string;
}

const ReviewCard: FC<ReviewCardProps> = ({ review, author }) => {
  console.log(review);

  return (
    <div className="flex justify-between items-center p-5 m-5 h-32 bg-sec rounded-lg">
      <Link className="text-body decoration-transparent" to={"/Profile/" + review.reviewBy.userId}>
        <h1>{author}'s Review</h1>
      </Link>
      <div className="flex items-center">
        <h1>{review.totalScore}/5</h1>
        <Link
        className="text-body"
          to={"/ViewReview/" + review.reviewId}
          state={{ reviewObj: review }}
        >
          <button className="h-16 w-32 m-10 bg-prim">View Review</button>
        </Link>
      </div>
    </div>
  );
};

export default ReviewCard;
