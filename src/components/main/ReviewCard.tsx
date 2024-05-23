import  { FC } from "react";
import { Link } from "react-router-dom";
import { ReviewInfo } from "../views/SongProfilePage";

export interface ReviewCardProps {
  review: ReviewInfo;
  author: string;
}

const ReviewCard: FC<ReviewCardProps> = ({ review, author }) => {
  console.log(review);

  return (
    <div className="flex justify-between items-center p-5 mt-5 h-8 sm:h-16 md:h-32 w-full bg-sec rounded-lg mb-2">
      <Link className="text-body decoration-transparent" to={"/Profile/" + review.reviewBy.userId}>
        <h1>{author}'s Review</h1>
      </Link>
      <div className="flex items-center">
        <Link
        className="text-body"
          to={"/ViewReview/" + review.reviewId}
          state={{ reviewObj: review }}
        >
          <button className="h-12 w-24 sm:32 m-10 bg-prim rounded-sm">View Review</button>
        </Link>
      </div>
    </div>
  );
};

export default ReviewCard;
