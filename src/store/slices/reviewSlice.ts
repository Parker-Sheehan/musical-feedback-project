import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { SongInfo } from "../../components/views/ProfilePage"



const initialState: SongInfo = {
    id: 0, title: "", link: "", albumArt: ""
}


export const ReviewSlice=createSlice({
    name: "review",
    initialState,
    reducers:{
         queueNewReview: (state, action)=>{
              let data = action.payload
              console.log(action.payload)
              return state =  {
                ...state,
                id: data.id,
                title: data.title,
                link: data.link,
                albumArt: data.albumArt,
              }
        }
    }
})


export default ReviewSlice.reducer;
export const {queueNewReview} = ReviewSlice.actions;