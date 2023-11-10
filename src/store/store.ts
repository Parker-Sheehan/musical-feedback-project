import { configureStore } from "@reduxjs/toolkit";
import { ReviewSlice } from "./slices/reviewSlice";
import { LoginSlice } from "./slices/loginSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    review: ReviewSlice.reducer,
    login: LoginSlice.reducer
  },
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector