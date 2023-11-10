import { createSlice } from "@reduxjs/toolkit"

interface LoginState {
    userId: number | null
}

const initialState : LoginState = {
    userId: null
}


export const LoginSlice=createSlice({
    name: "LoginState",
    initialState,
    reducers:{
         signIn: (state, action)=>{
              let userId = action.payload
              console.log(action.payload, "in sign in")
              return state =  {
                userId : userId
              }
        }, signOut: (state) => {
            return state = {
                userId: null
            }
        }
    }
})


export default LoginSlice.reducer;
export const {signIn, signOut} = LoginSlice.actions;