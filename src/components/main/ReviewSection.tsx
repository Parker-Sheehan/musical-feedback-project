import { useRef, FC } from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import {clearSongInReview} from "../../store/slices/loginSlice"
import { useNavigate } from "react-router-dom";

import axios from "axios";

interface ReviewSectionProps {
    reviewForId?: number; // Make sure userId is optional if it can be undefined
    songId?: number
  }

const ReviewSection: FC<ReviewSectionProps> = ({reviewForId, songId}) => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const musicalityScoreRef = useRef<HTMLInputElement>(null);
  const musicalityTextRef = useRef<HTMLTextAreaElement>(null);
  const rhythmScoreRef = useRef<HTMLInputElement>(null);
  const rhythmTextRef = useRef<HTMLTextAreaElement>(null);
  const soundDesignScoreRef = useRef<HTMLInputElement>(null);
  const soundDesignTextRef = useRef<HTMLTextAreaElement>(null);
  const arrangmentScoreRef = useRef<HTMLInputElement>(null);
  const arrangmentTextRef = useRef<HTMLTextAreaElement>(null);
  const mixScoreRef = useRef<HTMLInputElement>(null);
  const mixTextRef = useRef<HTMLTextAreaElement>(null);
  const overallScoreRef = useRef<HTMLInputElement>(null);
  const overallTextRef = useRef<HTMLTextAreaElement>(null);
  let loginState = useAppSelector((state) => state.login)
  
  const submitReviewHandler = async () => {

    console.log(loginState)
    
    console.log("sign up handler hit");
    console.log(musicalityScoreRef.current?.value);
    if (
      musicalityScoreRef.current?.value &&
      musicalityTextRef.current?.value &&
      rhythmScoreRef.current?.value &&
      rhythmTextRef.current?.value &&
      soundDesignScoreRef.current?.value &&
      soundDesignTextRef.current?.value &&
      arrangmentScoreRef.current?.value &&
      arrangmentTextRef.current?.value &&
      mixScoreRef.current?.value &&
      mixTextRef.current?.value &&
      overallScoreRef.current?.value &&
      overallTextRef.current?.value
    ) {
      console.log("all current values correct");
      let bodyObj = {
        musicalityScore: +musicalityScoreRef.current?.value,
        musicalityText: musicalityTextRef.current?.value,
        rhythmScore: +rhythmScoreRef.current?.value,
        rhythmText: rhythmTextRef.current?.value,
        soundDesignScore: +soundDesignScoreRef.current?.value,
        soundDesignText: soundDesignTextRef.current?.value,
        arrangmentScore: +arrangmentScoreRef.current?.value,
        arrangmentText: arrangmentTextRef.current?.value,
        mixScore: +mixScoreRef.current?.value,
        mixText: mixTextRef.current?.value,
        overallScore: +overallScoreRef.current?.value,
        overallText: overallTextRef.current?.value,
        reviewForId: reviewForId,
        songId: songId
      };
      console.log(bodyObj);

      console.log("the axios cal +++++++++++++++++++++++++++++++++++++++++++++++")
      await axios.post(`http://localhost:3000/postCritique/${loginState.userId}`, bodyObj);
      console.log("the axios cal +++++++++++++++++++++++++++++++++++++++++++++++")

     dispatch(clearSongInReview())

      //   console.log(newAccount.data.userId);

      //   dispatch(signIn(newAccount.data.userId));

        return navigate("/Profile");
    }
  };

  return (
    <div className="flex flex-col w-11/12 bg-background2 items-center rounded-lg`">
      <div className="bg-red-500 size-4/5 flex flex-col items-center m-6 rounded-md h-72 justify-evenly">
      <p className="text-background font-body">Aesthetic question</p>
        <p className="text-background font-body w-11/12">Describe the aesthetic of this song, what sort of imagery or feelings does it invoke?</p>
        <textarea ref={musicalityTextRef} className="w-11/12 h-50"></textarea>
      </div>
      <div className="bg-red-500 size-4/5 flex flex-col items-center m-6 rounded-md h-72 justify-evenly">
      <p className="text-background font-body">Technical question</p>
        <p className="text-background font-body w-11/12">What technical aspects of the production that you think could be improved{"(EQ, ryhthm, mix, sound design, musicality, etc...)"}? which ones shined through?</p>
        <textarea ref={rhythmTextRef} className="w-11/12 h-50"></textarea>
      </div>
      <div className="bg-red-500 size-4/5 flex flex-col items-center m-6 rounded-md h-72 justify-evenly pb-2">
        <p className="text-background font-body">Artist's question</p>
        <p className="text-background font-body w-11/12">What technical aspects of the production that you think could be improved{"(EQ, ryhthm, mix, sound design, musicality, etc...)"}? which ones shined through?</p>
        <textarea ref={soundDesignTextRef} className="w-11/12 h-50"></textarea>
      </div>
      <button className="bg-prim mb-2 rounded-sm p-1" onClick={submitReviewHandler}>Submit</button>
    </div>
  );
};

export default ReviewSection;
