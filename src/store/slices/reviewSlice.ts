import { createSlice } from "@reduxjs/toolkit"
import { SongInfo } from "../../components/views/ProfilePage"



const initialState: SongInfo = {
    id: 0, title: "", embeddedLink: "", artLink: ""
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
                embeddedLink: data.embeddedLink,
                artLink: data.artLink,
              }
        }
    }
})


export default ReviewSlice.reducer;
export const {queueNewReview} = ReviewSlice.actions;