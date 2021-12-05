import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productsApi from "api/productsApi";

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

export const updateProduct = createAsyncThunk(
	"products/updateProduct",
	async ({ productId, formData }) => {
		try {
			const response = await productsApi.updateProduct(
				productId,
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
	initialState: [],
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.fulfilled, (state, action) => {
				return action.payload.products;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.push(action.payload.product);
			})
			.addCase(updateProduct.fulfilled, (state, { payload }) => {
				const { product } = payload;
				const index = state.findIndex(
					(item) => item._id === product._id
				);
				state[index] = product;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				const index = state.findIndex(
					(item) => item._id === action.meta.arg
				);
				if (index !== -1) {
					state.splice(index, 1);
				}
			})
			.addCase(deleteMultiProduct.fulfilled, (state, { meta }) => {
				const { productIds } = meta.arg;
				productIds.forEach((item) => {
					state.splice(
						state.findIndex((product) => product._id === item),
						1
					);
				});
			});
	},
});

// export const {} = productsSlice.actions;

export default productsSlice.reducer;
