import React, {FC} from 'react'
import "./ReviewCard.css"
import { Link } from 'react-router-dom'
import {ReviewInfo} from "../views/SongProfilePage"

export interface ReviewCardProps{
  review: ReviewInfo
}

const ReviewCard: FC<ReviewCardProps> = ({review}) => {
  console.log(review)
  
  return (
    <div className='review-card'>
        <h1>{review.author}'s Review</h1>
        <div className='review-card-right'>
            <h1>{review.totalScore}/5</h1>
            <Link to={"/ViewReview/" + review.id} state={{reviewObj: review}}>
            <button className='view-review-button'>View Review</button>
            </Link>
        </div>
    </div>
  )
}

export default ReviewCard