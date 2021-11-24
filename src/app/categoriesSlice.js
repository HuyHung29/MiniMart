import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import categoriesApi from "api/categoriesApi";

export const fetchCategories = createAsyncThunk(
	"categories/fetchCategories",
	async () => {
		try {
			const response = await categoriesApi.getAllCategory();
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

const categoriesSlice = createSlice({
	name: "categories",
	initialState: [],
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchCategories.fulfilled, (state, action) => {
			return state.concat(action.payload.categories);
		});
	},
});

export default categoriesSlice.reducer;
