import "./SongCard.css";
import { Link } from "react-router-dom";
import { SongInfo } from "../views/ProfilePage";
import { FC } from "react";

interface SongCardProps {
  song: SongInfo;
}

const SongCard: FC<SongCardProps> = ({ song }) => {

  return (
    <div className="w-1/2 h-full flex justify-center items-center p-4">
      <div className="w-4/5 h-4/5 bg-sec flex flex-col justify-between p-4 rounded-lg">
        <div className=" flex justify-around">
          <h2 className="text-text font-heading">{song.title}</h2>
          <Link
            to={"/SongProfilePage/" + song.songId}
            state={{ songObj: song }}
            className="w-1/4"
          >
            <button className="bg-accent h-3/4 w-full rounded text-black ">
              View Song
            </button>
          </Link>
          <button className="bg-accent h-3/4 w-1/4 rounded">View Song</button>
        </div>
        <iframe
          width="100%"
          height="100%"
          allow="autoplay"
          src={song.embeddedLink}
        ></iframe>
      </div>
    </div>
  );
};

export default SongCard;
