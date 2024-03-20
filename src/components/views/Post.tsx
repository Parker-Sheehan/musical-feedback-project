// import "./ProfileInfo.css";
import { FC, useState } from "react";
import Messages from "./ChatBox";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { PostInfo } from "./FeadPage";
import axios from "axios";
import { useAppSelector } from "../../store/store";
import { Link } from "react-router-dom";

const Post:FC<PostInfo> = ({songId, embeddedLink, user, songLikes}) => {
  let [liked, setLiked] = useState(songLikes)

  let loggedInUserId = useAppSelector((state) => state.login.userId);




  let likeSongHandler = async() => {
    let newLikedValue = !liked
    setLiked(newLikedValue)
    let likeSong = await axios.post(`http://localhost:3000/likeSong`, {userId: loggedInUserId, songId: songId, likeStatus: liked})

  }

  console.log(songId, embeddedLink, user, songLikes)

  return (
    <div className="h-3/4 w-full">
      <div className="h-full w-full flex justify-center items-center my-5">
        <div className="h-full w-full lg:w-1/2 m-8 flex flex-col items-center bg-background2 rounded-lg p-2">
          <div className=" w-full h-14 mb-4 flex items-center">
          <Link className=" decoration-transparent size-fit flex items-center" to={"/Profile/" + user.userId}>

            <div
              className="bg-cover bg-center bg-no-repeat h-10 w-10 rounded-full ml-1"
              style={{
                backgroundImage: `url(${user.profilePicture})`,
              }}
              ></div>
            <div className=" h-5/6 w-fit text-heading flex items-end font-heading text-xl text-text ml-2">
              {user.displayName}
            </div>
          </Link>
          </div>
          <div className="bg-blue-100 w-full h-3/4 mb-2">
            <iframe
              width="100%"
              height="100%"
              allow="autoplay"
              src={
                `${embeddedLink}`
              }
            ></iframe>
          </div>
          <div className="flex items-start justify-end w-full h-14 px-4 py-2">
          <div className="text-text text-xl p-2">
            {liked ? (<GoHeartFill className="text-text"  onClick={likeSongHandler}></GoHeartFill>) : (<GoHeart className="text-text" onClick={likeSongHandler}></GoHeart>)}
            
            
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
