import { configureStore } from "@reduxjs/toolkit";
// import { persistStore, persistReducer } from 'redux-persist';
// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import thunk from 'redux-thunk';
import { combineReducers } from '@reduxjs/toolkit';
import { LoginSlice, LoginState } from "./slices/loginSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

interface RootState {
  login: LoginState;
}

const rootReducer = combineReducers<RootState>({
  login: LoginSlice.reducer
});

// Configuration for redux-persist
// const persistConfig = {
//   key: 'root',
//   storage,
// };
  

// // Create persisted reducer
// const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure store with persisted reducer
// export const store = configureStore({
//   reducer: persistedReducer,
//   middleware: [thunk]
//   getDefaultMiddleware({
//     serializableCheck: {
//       ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//     },
//   }),
// });

export const store = configureStore({
  reducer: rootReducer
})

// Create a persistor object
// export const persistor = persistStore(store);

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector:TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector