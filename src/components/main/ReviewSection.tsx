import { useRef, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {clearSongInReview, updateReviewTokens} from "../../store/slices/loginSlice"
import { useNavigate } from "react-router-dom";

import axios from "axios";

interface ReviewSectionProps {
    reviewForId?: number; // Make sure userId is optional if it can be undefined
    songId?: number
    artistQuestion: string
  }

const ReviewSection: FC<ReviewSectionProps> = ({reviewForId, songId, artistQuestion}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const aestheticCritiqueRef = useRef<HTMLTextAreaElement>(null);
  const technicalCritiqueRef = useRef<HTMLTextAreaElement>(null);
  const artistCritiqueRef = useRef<HTMLTextAreaElement>(null);

  let loginState = useAppSelector((state) => state.login)
  
  const submitReviewHandler = async () => {

    console.log(loginState)
    
    console.log("sign up handler hit");
    if (
      aestheticCritiqueRef.current?.value &&
      technicalCritiqueRef.current?.value &&
      artistCritiqueRef.current?.value
    ) {
      console.log("all current values correct");
      let bodyObj = {
        aestheticCritique: aestheticCritiqueRef.current?.value,
        technicalCritique: technicalCritiqueRef.current?.value,
        artistCritique: artistCritiqueRef.current?.value,
        reviewForId: reviewForId,
        songId: songId
      };
      console.log(bodyObj);

      console.log("the axios cal +++++++++++++++++++++++++++++++++++++++++++++++")
      let response = await axios.post(`http://localhost:3000/postCritique/${loginState.userId}`, bodyObj);
      console.log(response)

     dispatch(clearSongInReview())
     dispatch(updateReviewTokens("increase"))


      //   console.log(newAccount.data.userId);

        // dispatch(signIn(newAccount.data.userId));

        return navigate("/Profile");
    }
  };

  return (
    <div className="flex flex-col w-11/12 bg-background2 items-center rounded-lg mb-3 ">
      <div className="bg-red-500 size-4/5 flex flex-col items-center m-6 rounded-md h-72 justify-evenly">
      <p className="text-background font-body">Aesthetic question</p>
        <p className="text-background font-body w-11/12">Describe the aesthetic of this song, what sort of imagery or feelings does it invoke?</p>
        <textarea ref={aestheticCritiqueRef} className="w-11/12 h-50"></textarea>
      </div>
      <div className="bg-red-500 size-4/5 flex flex-col items-center m-6 rounded-md h-72 justify-evenly">
      <p className="text-background font-body">Technical question</p>
        <p className="text-background font-body w-11/12">What technical aspects of the production that you think could be improved{"(EQ, ryhthm, mix, sound design, musicality, etc...)"}? which ones shined through?</p>
        <textarea ref={technicalCritiqueRef} className="w-11/12 h-50"></textarea>
      </div>
      <div className="bg-red-500 size-4/5 flex flex-col items-center m-6 rounded-md h-72 justify-evenly pb-2">
        <p className="text-background font-body">Creator's question</p>
        <p className="text-background font-body w-11/12">{artistQuestion}</p>
        <textarea ref={artistCritiqueRef} className="w-11/12 h-50"></textarea>
      </div>
      {songId && <button className="bg-prim mb-2 rounded-sm p-1" onClick={submitReviewHandler}>Submit</button>}
    </div>
  );
};

export default ReviewSection;
