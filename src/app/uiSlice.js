import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
	name: "purchase",
	initialState: {
		loading: false,
	},
	reducers: {
		showLoading(state) {
			state.loading = true;
		},
		hideLoading(state) {
			state.loading = false;
		},
	},
});

export const { showLoading, hideLoading } = uiSlice.actions;

export default uiSlice.reducer;
