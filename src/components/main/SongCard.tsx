import "./SongCard.css";
import { Link } from "react-router-dom";
import { SongInfo } from "../views/ProfilePage";
import { FC } from "react";

interface SongCardProps {
  song: SongInfo;
}

const SongCard: FC<SongCardProps> = ({ song }) => {
  console.log(song);
  return (
    <div className="song-card-block">
      <div
        className="song-card"
        style={{
          background: `url(https://i1.sndcdn.com/artworks-000189983181-azrg5q-t500x500.jpg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2>{song.title}</h2>
        <Link to={"/SongProfilePage/" + song.songId} state={{ songObj: song }}>
          <button className="view-critique-button">View Song</button>
        </Link>
      </div>
    </div>
  );
};

export default SongCard;
