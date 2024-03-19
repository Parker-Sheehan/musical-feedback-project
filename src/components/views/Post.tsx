// import "./ProfileInfo.css";
import { FC, useState } from "react";
import Messages from "./ChatBox";
import { GoHeart, GoHeartFill } from "react-icons/go";

const Post = () => {
  let [liked, setLiked] = useState(false)

  let likeSongHandler = () => {
    let newLikedValue = !liked
    setLiked(newLikedValue)
  }

  return (
    <div className="size-full">
      <div className="h-3/4 w-full flex justify-center items-center my-5">
        <div className="h-full w-full lg:w-1/2 m-8 flex flex-col items-center bg-background2 rounded-lg p-2">
          <div className=" w-full h-14 mb-4 flex items-center">
            <div
              className="bg-cover bg-center bg-no-repeat h-10 w-10 rounded-full ml-1"
              style={{
                backgroundImage: `url(https://i.pinimg.com/originals/50/f0/c3/50f0c3351809f62d2d8d3fe255a72fa5.jpg)`,
              }}
            ></div>
            <div className=" h-5/6 w-fit text-heading flex items-end font-heading text-xl text-text ml-2">
              Of The Trees
            </div>
          </div>
          <div className="bg-blue-100 w-full h-3/4 mb-2">
            <iframe
              width="100%"
              height="100%"
              allow="autoplay"
              src={
                "https://w.soundcloud.com/player/?visual=true&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F474445329"
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
