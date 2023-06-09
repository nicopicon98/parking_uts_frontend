import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { clearLocalStorage, persistLocalStorage } from "../../../components/pages/utilities";
import { IUserInfo } from "../../models/user";

// Defining an empty user state
export const EmptyUserState: IUserInfo = {
  name: "",
  lastName: "",
  nickname: "",
  email: "",
  role: {
    id: 0,
    roleName: "",
  },
};

export const UserKey = "user";

// Creating a Redux slice for user state management
export const userSlice = createSlice({
  name: "user",
  // Initializing the state from localStorage or using the EmptyUserState
  initialState: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)
    : EmptyUserState,
  reducers: {
    // Reducer to create a new user and persist it in localStorage
    createUser: (state, action: PayloadAction<IUserInfo>) => {
      // Persist the new user information in localStorage
      persistLocalStorage<IUserInfo>(UserKey, action.payload);
      // Update the state with the new user information
      return action.payload;
    },
    // Reducer to update the existing user and persist the changes in localStorage
    updateUser: (state, action) => {
      const result: IUserInfo = { ...state, ...action.payload };
      persistLocalStorage<IUserInfo>(UserKey, result);
      return result;
    },
    // Reducer to reset the user state and clear localStorage
    resetUser: () => {
      clearLocalStorage(UserKey);
      return EmptyUserState;
    },
  },
});

// Exporting the actions from the user slice
export const { createUser, updateUser, resetUser } = userSlice.actions;

// Exporting the user slice as default
export default userSlice;
