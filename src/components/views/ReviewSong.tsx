import { FC, useEffect, useState, useRef } from "react";
import SongInfoCard from "../main/SongInfoCard";
import { useAppSelector, useAppDispatch } from "../../store/store";
import instance from "../../utils/axios";
import { SongInfo } from "./ProfilePage";
import { updateReviewTokens } from "../../store/slices/loginSlice";
import ReviewSection from "../main/ReviewSection";
import { useNavigate } from "react-router-dom";

export interface SongAndUser {
  songInfo: SongInfo;
  userInfo: { displayName: string; userId: number; profilePicture: string };
}

const ReviewSong = () => {
  let [song, setSong] = useState<SongAndUser | null>(null);
  let [artistQuestion, setArtistQuestion] = useState<string>("");
  let [showAppCritiquePage, setShowAppCritiquePage] = useState<string>("loading");

  let loginState = useAppSelector((state) => state.login);

  const websiteReviewRef = useRef<HTMLTextAreaElement>(null);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getReviewSong = async () => {
    try {
      let songToReview = await instance.get(
        `http://localhost:3000/getReviewSong/${loginState.userId}`
      );
      if (songToReview.data === "") {
        setShowAppCritiquePage("true");
      } else {
        let { songId, title, embeddedLink, artistQuestion, songReviewToken } =
          songToReview.data;
        let { displayName, userId, profilePicture } = songToReview.data.user;
        console.log(songToReview.data);
        setShowAppCritiquePage("false");

        setArtistQuestion(songToReview.data.artistQuestion);

        let songAndUser: SongAndUser = {
          songInfo: {
            songId: songId,
            title,
            embeddedLink,
            artLink: "",
            userId,
            artistQuestion,
            songReviewToken,
          },
          userInfo: {
            displayName,
            userId,
            profilePicture,
          },
        };
        setSong(songAndUser);
      }
    } catch (err: any) {
      return alert(err.response);
    }
  };

  const submitWebsiteReview = async () => {
    if (websiteReviewRef.current?.value) {
      console.log("all current values correct");
      let bodyObj = { websiteReview: websiteReviewRef.current?.value };
      try {
        await instance.post(
          `http://localhost:3000/postWebsiteCritique/${loginState.userId}`,
          bodyObj
        );
        dispatch(updateReviewTokens("increase5"));

        return navigate("/Profile");
      } catch (err) {
        console.log(err);
      }
    }
  };

  useEffect(() => {
    getReviewSong();
    console.log("current");
  }, []);

  return (
    <>
      {showAppCritiquePage === "true" && (
        <main className="flex flex-col items-center h-fit w-3/4">
          <h1 className="text-heading text-text">
            Critique Page
          </h1>
          <div className="flex flex-col w-full bg-background2 items-center rounded-lg m-3 ">
            <p className="text-text m-2">
              Looks like there are no more songs to review in your genre range!
            </p>
            <p className="text-text m-2">
              To gain review tokens either
              expand genre prefrances or you can leave a critique of my website.
            </p>
            <p className="text-text m-2">(this can be done once a week)</p>
            <div className="bg-sec2 size-4/5 flex flex-col items-center m-6 rounded-md h-72 justify-evenly">
              <p className="text-text w-11/12">
                What imporovements, features, changes or bug fixes do you think
                could be made to this website?
              </p>
              <textarea
                ref={websiteReviewRef}
                className="w-11/12 h-50"
              ></textarea>
            </div>
            <button
              className="bg-prim mb-2 rounded-sm p-1"
              onClick={() => {
                submitWebsiteReview();
              }}
            >
              Submit
            </button>
            <p className="text-text m-2">
              This project is created and maintained by a solo dev so any and
              all feadback is appreciated more than you know : )
            </p>
          </div>
        </main>
      ) }
      
      { showAppCritiquePage === "false" && (
        <main className="flex flex-col items-center h-fit">
          <h1 className="text-heading text-text">
            Review {song?.songInfo.title}
          </h1>
          <SongInfoCard SongAndUser={song} />
          <ReviewSection
            reviewForId={song?.userInfo.userId}
            songId={song?.songInfo.songId}
            artistQuestion={artistQuestion}
          />
        </main>
      )}
    </>
  );
};

export default ReviewSong;
