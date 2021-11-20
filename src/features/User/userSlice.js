import userApi from "api/userApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk("user/userLogin", async (data) => {
	try {
		const response = await userApi.login(data);
		return response.data;
	} catch (error) {
		throw error.response.data.message;
	}
});

export const fetchUserInfo = createAsyncThunk(
	"users/fetchUserInfo",
	async () => {
		try {
			const response = await userApi.getUser();
			return response.data;
		} catch (error) {
			if (error.response.status === 401) {
				const refreshToken = JSON.parse(
					localStorage.getItem("refresh")
				);
				const getNewToken = await userApi.getAccessToken(refreshToken);
				localStorage.setItem(
					"token",
					JSON.stringify(getNewToken.data.accessToken)
				);
			}
			throw error;
		}
	}
);

export const updateUser = createAsyncThunk("users/updateUser", async (data) => {
	try {
		const response = await userApi.updateUser(data);
		return response.data;
	} catch (error) {
		throw error.response.data.message;
	}
});

const loginStatus = JSON.parse(localStorage.getItem("isLogin"));
const userInfo = JSON.parse(localStorage.getItem("user"));

const userSlice = createSlice({
	name: "users",
	initialState: {
		isLogin: loginStatus ? loginStatus : false,
		user: userInfo ? userInfo.user : {},
	},
	reducers: {
		userLogout: (state) => {
			state.isLogin = false;
			state.user = {};
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(userLogin.fulfilled, (state, action) => {
				state.isLogin = true;
				localStorage.setItem(
					"token",
					JSON.stringify(action.payload.accessToken)
				);
				localStorage.setItem(
					"refresh",
					JSON.stringify(action.payload.refreshToken)
				);
				localStorage.setItem("isLogin", JSON.stringify(state.isLogin));
			})
			.addCase(fetchUserInfo.fulfilled, (state, action) => {
				state.user = action.payload.user;
				localStorage.setItem("user", JSON.stringify(action.payload));
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.user = action.payload.user;
				localStorage.setItem("user", JSON.stringify(action.payload));
			});
	},
});

export const { userLogout } = userSlice.actions;

export default userSlice.reducer;
