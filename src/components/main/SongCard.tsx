import { Link } from "react-router-dom";
import { SongInfo } from "../views/ProfilePage";
import { FC } from "react";

interface SongCardProps {
  song: SongInfo;
}

const SongCard: FC<SongCardProps> = ({ song }) => {

  return (
    <div className="lg:w-1/2 lg:h-1/2 w-full h-full flex justify-center items-center p-3">
      <div className="size-full bg-sec flex flex-col justify-between rounded-lg p-3">
        <div className=" flex justify-around">
          <h2 className="text-text font-heading text-wrap break-words">{song.title}</h2>
          <Link
            to={"/SongProfilePage/" + song.songId}
            state={{ songObj: song }}
            className="w-1/4"
          >
            <button className="bg-accent min-h-fit h-3/4 w-full rounded text-black ">
              View Song
            </button>
          </Link>
          <button className="bg-prim h-3/4 w-1/4 rounded">Add Token</button>
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
