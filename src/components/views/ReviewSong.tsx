import SongInfoCard from "../main/SongInfoCard";
const ReviewSong = () => {
  return (
    <main id="song-profile-main">
      <SongInfoCard />
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
      </div>
    </main>
  );
};

export default ReviewSong;
