import { useRef, FC } from "react";
import ReviewSectionCard from "./ReviewSectionCard";
import React from "react";
import { useAppSelector } from "../../store/store";
import axios from "axios";

interface ReviewSectionProps {
    reviewForId?: number; // Make sure userId is optional if it can be undefined
  }

const ReviewSection: FC<ReviewSectionProps> = ({reviewForId}) => {
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
        reviewForId: reviewForId
      };
      console.log(bodyObj);

      console.log("the axios cal +++++++++++++++++++++++++++++++++++++++++++++++")
      await axios.post(`http://localhost:3000/postCritique/${loginState.userId}`, bodyObj);
      console.log("the axios cal +++++++++++++++++++++++++++++++++++++++++++++++")

      //   console.log(newAccount.data.userId);

      //   dispatch(signIn(newAccount.data.userId));

      //   return navigate("/Profile");
    }
  };

  return (
    <div id="critique-box-container">
      <div className="critique-box">
        <p>promt musicality?</p>
        <label>rating</label>
        <input ref={musicalityScoreRef} type="number" max={5} min={0} />
        <textarea ref={musicalityTextRef} name="" id=""></textarea>
      </div>
      <div className="critique-box">
        <p>promt rhythm?</p>
        <label>rating</label>
        <input ref={rhythmScoreRef} type="number" max={5} min={0} />
        <textarea ref={rhythmTextRef} name="" id=""></textarea>
      </div>
      <div className="critique-box">
        <p>promt sound design?</p>
        <label>rating</label>
        <input ref={soundDesignScoreRef} type="number" max={5} min={0} />
        <textarea ref={soundDesignTextRef} name="" id=""></textarea>
      </div>
      <div className="critique-box">
        <p>promt arrangment?</p>
        <label>rating</label>
        <input ref={arrangmentScoreRef} type="number" max={5} min={0} />
        <textarea ref={arrangmentTextRef} name="" id=""></textarea>
      </div>
      <div className="critique-box">
        <p>promt mix/master?</p>
        <label>rating</label>
        <input ref={mixScoreRef} type="number" max={5} min={0} />
        <textarea ref={mixTextRef} name="" id=""></textarea>
      </div>
      <div className="critique-box">
        <p>promt overall personal take?</p>
        <label>rating</label>
        <input ref={overallScoreRef} type="number" max={5} min={0} />
        <textarea ref={overallTextRef} name="" id=""></textarea>
      </div>
      <button onClick={submitReviewHandler}>Submit</button>
    </div>
  );
};

export default ReviewSection;
