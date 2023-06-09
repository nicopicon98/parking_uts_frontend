import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./states/user";
import { IUserInfo } from "../models/user";

export interface IAppStore {
  user: IUserInfo;
}

export default configureStore<IAppStore>({
  reducer: {
    user: userSlice.reducer,
  },
});
