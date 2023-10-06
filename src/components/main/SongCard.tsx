import "./SongCard.css";
import { Link } from "react-router-dom";
import { SongInfo } from "../views/ProfilePage";
import { FC } from "react";

interface SongCardProps {
  song: SongInfo;
}

const SongCard: FC<SongCardProps> = ({ song }) => {
  console.log(song.albumArt);
  return (
    <div className="song-card-block">
      <div
        className="song-card"
        style={{
          background: `url(${song.albumArt})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2>{song.title}</h2>
        <Link to={"/SongProfilePage/" + song.id} state={{ songObj: song }}>
          <button className="view-critique-button">View Song</button>
        </Link>
      </div>
    </div>
  );
};

export default SongCard;
