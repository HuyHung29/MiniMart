import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsApi from "api/productsApi";

export const fetchProducts = createAsyncThunk(
	"products/fetchProducts",
	async (params) => {
		try {
			const response = await productsApi.getAllProduct(params);
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const fetchCurrentProduct = createAsyncThunk(
	"products/fetchCurrentProduct",
	async (id) => {
		try {
			const response = await productsApi.getProductById(id);
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

export const updateProduct = createAsyncThunk(
	"products/updateProduct",
	async ({ editProductId, formData }) => {
		try {
			const response = await productsApi.updateProduct(
				editProductId,
				formData
			);
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const deleteProduct = createAsyncThunk(
	"products/deleteProduct",
	async (id) => {
		try {
			await productsApi.deleteProduct(id);
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const deleteMultiProduct = createAsyncThunk(
	"products/deleteMultiProduct",
	async (data) => {
		try {
			await productsApi.deleteMultiProduct(data);
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

const productsSlice = createSlice({
	name: "products",
	initialState: {
		listProduct: [],
		currentProduct: {},
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.listProduct = [...action.payload.products];
			})
			.addCase(fetchCurrentProduct.pending, (state) => {
				state.currentProduct = {};
			})
			.addCase(fetchCurrentProduct.fulfilled, (state, action) => {
				state.currentProduct = { ...action.payload.product };
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.listProduct.unshift(action.payload.product);
			})
			.addCase(updateProduct.fulfilled, (state, { payload }) => {
				const { product } = payload;
				const index = state.listProduct.findIndex(
					(item) => item._id === product._id
				);
				state.listProduct[index] = product;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				const index = state.listProduct.findIndex(
					(item) => item._id === action.meta.arg
				);
				if (index !== -1) {
					state.listProduct.splice(index, 1);
				}
			})
			.addCase(deleteMultiProduct.fulfilled, (state, { meta }) => {
				const { productIds } = meta.arg;
				productIds.forEach((item) => {
					state.listProduct.splice(
						state.listProduct.findIndex(
							(product) => product._id === item
						),
						1
					);
				});
			});
	},
});

// export const {} = productsSlice.actions;

export default productsSlice.reducer;
