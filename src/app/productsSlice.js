import productsApi from "api/productsApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
	"products/fetchProducts",
	async () => {
		try {
			const response = await productsApi.getAllProduct();
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const createProduct = createAsyncThunk(
	"products/createProduct",
	async (data) => {
		try {
			const response = await productsApi.createProduct(data);
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

const productsSlice = createSlice({
	name: "products",
	initialState: [],
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.fulfilled, (state, action) => {
				return action.payload.products;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.push(action.payload.product);
			});
	},
});

// export const {} = productsSlice.actions;

export default productsSlice.reducer;
