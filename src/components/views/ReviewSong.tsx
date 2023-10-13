import { FC, useEffect } from "react";
import SongInfoCard from "../main/SongInfoCard";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { queueNewReview } from "../../store/slices/reviewSlice";
import axios from "axios";


const ReviewSong = () => {

  // on review submit set song in review to 0 to reset

  const dispatch = useAppDispatch()

  const getRandomSong = async() => {
    let randomSong = await axios.post('http://localhost:3000/getRandomSong/1')
    dispatch(queueNewReview(randomSong.data))
  }

  useEffect(() => {
    getRandomSong()

  },[])



  let song = useAppSelector((state) => state.review)
  console.log(song)

  return (
    <main id="song-profile-main">
      <SongInfoCard song={song}/>
      <div id="critique-box-container">
        <div className="critique-box">
          <p>promt musicality?</p>
          <label>rating</label>
          <input type="number" max={5} min={0} />
          <textarea name="" id=""></textarea>
        </div>
        <div className="critique-box">
          <p>promt rhythm?</p>
          <label>rating</label>
          <input type="number" max={5} min={0} />
          <textarea name="" id=""></textarea>
        </div>
        <div className="critique-box">
          <p>promt sound design?</p>
          <label>rating</label>
          <input type="number" max={5} min={0} />
          <textarea name="" id=""></textarea>
        </div>
        <div className="critique-box">
          <p>promt arrangment?</p>
          <label>rating</label>
          <input type="number" max={5} min={0} />
          <textarea name="" id=""></textarea>
        </div>
        <div className="critique-box">
          <p>promt mixing/master?</p>
          <label>rating</label>
          <input type="number" max={5} min={0} />
          <textarea name="" id=""></textarea>
        </div>
        <div className="critique-box">
          <p>promt overall personal take?</p>
          <label>rating</label>
          <input type="number" max={5} min={0} />
          <textarea name="" id=""></textarea>
        </div>
        <button>Submit</button>
      </div>
    </main>
  );
};

export default ReviewSong;
