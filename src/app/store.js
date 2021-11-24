import { configureStore } from "@reduxjs/toolkit";
import userReducer from "features/User/userSlice";
import categoriesReducer from "app/categoriesSlice";

export const store = configureStore({
	reducer: {
		users: userReducer,
		categories: categoriesReducer,
	},
});
