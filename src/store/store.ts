import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';
import { SongInfo } from "../components/views/ProfilePage";
import { LoginSlice, LoginState } from "./slices/loginSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

interface RootState {
  login: LoginState;
}

const rootReducer = combineReducers<RootState>({
  login: LoginSlice.reducer
});

// Configuration for redux-persist
const persistConfig = {
  key: 'root',
  storage,
};


// Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor object
export const persistor = persistStore(store);

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector