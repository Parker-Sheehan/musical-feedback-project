import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useLocation, useParams } from 'react-router-dom'
import "./ViewReviewPage.css"
import SongInfoCard from '../main/SongInfoCard'

import { ReviewInfo } from './SongProfilePage'

const ViewReviewPage = () => {

  const [reviewInfo, setReviewInfo] = useState<ReviewInfo>()

  const location = useLocation()

  const {id} = useParams()

  const getReviewInfo = async() => {
    console.log('yay')
    let reviewData = await axios.put(`http://localhost:3000/getReview/${id}`)
    console.log(reviewData)
    setReviewInfo(reviewData.data)
  }

  console.log(location.state)


  useEffect(()=>{
    if(location.state){
      setReviewInfo(location.state.reviewObj)
    }else{
      getReviewInfo()
    }
  },[])

  console.log(reviewInfo)

  return (
    <main id="song-profile-main">
      <h1>SolRaKing's critique of Spacetime</h1>
      {reviewInfo && 
              <div id='critique-box-container'>
              <div className='critique-box'>
  
              </div>
              <div className='critique-box'>
  
              </div>
              <div className='critique-box'>
  
              </div>
              <div className='critique-box'>
  
              </div>
              <div className='critique-box'>
  
              </div>
              <div className='critique-box'>
  
              </div>
          </div>}
    </main>
  )
}

export default ViewReviewPage