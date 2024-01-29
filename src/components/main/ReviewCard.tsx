import React, {FC} from 'react'
import "./ReviewCard.css"
import { Link } from 'react-router-dom'
import {ReviewInfo} from "../views/SongProfilePage"

export interface ReviewCardProps{
  review: ReviewInfo
  author: string
}

const ReviewCard: FC<ReviewCardProps> = ({review, author}) => {
  console.log(review.reviewId)
  
  return (
    <div className='review-card'>
        <h1>{author}'s Review</h1>
        <div className='review-card-right'>
            <h1>{review.totalScore}/5</h1>
            <Link to={"/ViewReview/" + review.reviewId} state={{reviewObj: review}}>
            <button className='view-review-button'>View Review</button>
            </Link>
        </div>
    </div>
  )
}

export default ReviewCard