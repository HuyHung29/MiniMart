import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import purchaseApi from "api/purchaseApi";
import { hideLoading, showLoading } from "./uiSlice";

// const cart = JSON.parse(localStorage.getItem("cart"));

export const fetchOrders = createAsyncThunk(
	"purchase/fetchOrders",
	async (_, { dispatch }) => {
		try {
			dispatch(showLoading());
			const response = await purchaseApi.getOrders();
			dispatch(hideLoading());
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const changeOrderStatus = createAsyncThunk(
	"purchase/changeOrderStatus",
	async ({ status, orderId }) => {
		console.log(status, orderId);
		try {
			const response = await purchaseApi.changeOrderStatus(
				{ status },
				orderId
			);
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const fetchCart = createAsyncThunk("purchase/fetchCart", async () => {
	try {
		const response = await purchaseApi.getCart();
		return response.data;
	} catch (error) {
		throw error.response.data.message;
	}
});

export const addToCart = createAsyncThunk(
	"purchase/addToCart",
	async (data) => {
		try {
			const response = await purchaseApi.addToCart(data);
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

export const deleteFromCart = createAsyncThunk(
	"purchase/deleteFromCart",
	async (id) => {
		try {
			const response = await purchaseApi.deleteCartById(id);
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

const purchaseSlice = createSlice({
	name: "purchase",
	initialState: {
		cart: [],
		orders: [],
	},
	reducers: {
		updateCart(state, action) {
			const index = state.cart.findIndex(
				(item) => item.id === action.payload.id
			);
			if (index !== -1) {
				state.cart[index].quantity = action.payload.newQuantity;
			}

			localStorage.setItem("cart", JSON.stringify(state.cart));
		},

		deleteMultiFromCart(state, action) {
			const cartIds = action.payload;
			cartIds.forEach((item) => {
				state.cart.splice(
					state.cart.findIndex((cart) => cart.id === item),
					1
				);
			});

			localStorage.setItem("cart", JSON.stringify(state.cart));
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOrders.fulfilled, (state, action) => {
				state.orders = action.payload.orders;
			})
			.addCase(fetchCart.fulfilled, (state, action) => {
				const cart = action.payload.cart;
				const { products, quantity } = cart;
				state.cart = products.map((product, index) => ({
					...product,
					quantity: quantity[index],
				}));
			})
			.addCase(addToCart.fulfilled, (state, action) => {
				const isInCart = !!state.cart.find(
					(item) => item._id === action.meta.arg.productId
				);
				if (isInCart) {
				} else {
					const cart = action.payload.cart;
					const { products, quantity } = cart;
					state.cart = products.map((product, index) => ({
						...product,
						quantity: quantity[index],
					}));
				}
			})
			.addCase(deleteFromCart.fulfilled, (state, action) => {})
			.addCase(changeOrderStatus.fulfilled, (state, action) => {
				const id = action.meta.arg.orderId;
				const index = state.orders.findIndex(
					(order) => order._id === id
				);

				if (index !== -1) {
					state.orders[index] = action.payload.order;
				}
			});
	},
});

export const { updateCart, deleteMultiFromCart } = purchaseSlice.actions;

export default purchaseSlice.reducer;
