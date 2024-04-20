import { createSlice } from "@reduxjs/toolkit";
import Genre from "../../components/views/ProfilePage";

export interface LoginState {
  userId: number | null;
  genreArray: number[] | null;
  songInReview: number | null;
  userReviewToken: number | null
}

const initialState: LoginState = {
  userId: null,
  genreArray: null,
  songInReview: null,
  userReviewToken: null
};

export const LoginSlice = createSlice({
  name: "LoginState",
  initialState,
  reducers: {
    signIn: (state, action) => {
      let { userId, genreArray, songInReview, userReviewToken } = action.payload;
      console.log(action.payload, "in sign in");
      return (state = {
        userId: userId,
        genreArray: genreArray,
        songInReview: songInReview,
        userReviewToken: userReviewToken
      });
    },
    updateSongInReview: (state, action) => {
      let { userId, genreArray, userReviewToken } = state;
      console.log(action.payload, "update review song in redux")
      return (state = {
        userId,
        genreArray,
        songInReview: action.payload,
        userReviewToken
      });
    },
    clearSongInReview: (state) => {
      let {userId, genreArray,userReviewToken} = state
      return (state = {
        userId,
        genreArray,
        songInReview: 0,
        userReviewToken
      })
    },
    updateReviewTokens: (state, action) => {
      let {userId, genreArray, songInReview, userReviewToken} = state
      if(action.payload === "increase"){
        return (state = {
          userId,
          genreArray,
          songInReview,
          userReviewToken: userReviewToken! + 1
        })
      }
      return (state = {
        userId,
        genreArray,
        songInReview,
        userReviewToken: userReviewToken! - 1
      })
    }
    ,
    signOut: (state) => {
      return (state = {
        userId: null,
        genreArray: null,
        songInReview: null,
        userReviewToken: null
      });
    },
  },
});

export default LoginSlice.reducer;
export const { signIn, signOut, updateSongInReview, clearSongInReview, updateReviewTokens } = LoginSlice.actions;
