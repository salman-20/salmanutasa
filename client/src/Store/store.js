import { configureStore } from "@reduxjs/toolkit";
import UserSlice from "../Features/UserSlice";
import AdminSlice from "../Features/AdminSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

const persistConfig = {
  key: "reduxstore",
  storage,
};

const rootReducer = combineReducers({ users: UserSlice, admin: AdminSlice });

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

const persistedStore = persistStore(store);

export { persistedStore };
