import { Link } from "react-router-dom";
import { SongInfo } from "../views/ProfilePage";
import { FC } from "react";
import axios from "axios";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { updateReviewTokens } from "../../store/slices/loginSlice";

interface SongCardProps {
  song: SongInfo;
}

const SongCard: FC<SongCardProps> = ({ song }) => {

  let tokenState = useAppSelector((state) => state.login.userReviewToken)
  let userId = useAppSelector((state) => state.login.userId)

  let dispatch = useAppDispatch()


  const addTokenHandler = async () => {
    console.log("attadlsfj")
    if(tokenState! > 0 ){
      try{
        await axios.post(`http://localhost:3000/addTokenToSong/${song.songId}`, {userId: userId});
        dispatch(updateReviewTokens("decrese"));

  
      }catch(err){
        alert("error with server")
      }
    }else{
      alert("insufficient tokens, give a song a critique first")
    }

  }

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
            <button className="bg-accent min-h-fit h-3/4 w-full rounded text-black">
              View Song
            </button>
          </Link>
          <button className="bg-prim h-3/4 w-1/4 rounded" onClick={addTokenHandler}>Add Token</button>
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
