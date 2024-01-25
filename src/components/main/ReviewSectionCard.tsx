import React from 'react'
import { useRef } from 'react'

const ReviewSectionCard = ({}) => {

    

  return (
    <div className="critique-box">
          <p>promt musicality?</p>
          <label>rating</label>
          <input type="number" max={5} min={0} />
          <textarea name="" id=""></textarea>
    </div>
  )
}

export default ReviewSectionCard