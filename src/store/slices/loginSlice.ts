import { createSlice } from "@reduxjs/toolkit"
import Genre from "../../components/views/ProfilePage"

interface LoginState {
    userId: number | null
    genreArray : number[] | null
    songInReview : number | null
}

const initialState : LoginState = {
    userId: null,
    genreArray: null,
    songInReview: null
}


export const LoginSlice=createSlice({
    name: "LoginState",
    initialState,
    reducers:{
         signIn: (state, action)=>{
              let {userId, genreArray,songInReview} = action.payload
              console.log(action.payload, "in sign in")
              return state =  {
                userId : userId,
                genreArray : genreArray,
                songInReview: songInReview
              }
        }, signOut: (state) => {
            return state = {
                userId: null,
                genreArray: null,
                songInReview: null
            }
        }
    }
})


export default LoginSlice.reducer;
export const {signIn, signOut} = LoginSlice.actions;