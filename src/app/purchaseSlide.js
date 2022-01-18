import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import purchaseApi from "api/purchaseApi";

localStorage.setItem(
	"cart",
	JSON.stringify([
		{
			id: "61e1b0c381a13684f4821187",
			name: "Đào đỏ Mỹ",
			picture:
				"https://res.cloudinary.com/dt5zd3iz4/image/upload/v1642180802/MiniMart/Product/ulzqmctn6wtyhydnsoyi.jpg",
			price: 31200,
			quantity: 1,
		},
		{
			id: "61e1b0f981a13684f482118c",
			name: "Vải thiều Thanh Hà",
			picture:
				"https://res.cloudinary.com/dt5zd3iz4/image/upload/v1642180856/MiniMart/Product/vpfk5ma4i1mo8ckbz4n1.jpg",
			price: 39500,
			quantity: 1,
		},
	])
);

const cart = JSON.parse(localStorage.getItem("cart"));

export const fetchOrders = createAsyncThunk(
	"purchase/fetchOrders",
	async () => {
		try {
			const response = await purchaseApi.getOrders();
			return response.data;
		} catch (error) {
			throw error.response.data.message;
		}
	}
);

const purchaseSlice = createSlice({
	name: "purchase",
	initialState: {
		cart: cart,
		orders: [],
	},
	reducers: {
		addToCart(state, action) {
			const isInCart = !!state.cart.find(
				(item) => item.id === action.payload.id
			);
			if (isInCart) {
			} else {
				state.cart.unshift(action.payload);
			}

			localStorage.setItem("cart", JSON.stringify(state.cart));
		},
		updateCart(state, action) {
			const index = state.cart.findIndex(
				(item) => item.id === action.payload.id
			);
			if (index !== -1) {
				state.cart[index].quantity = action.payload.newQuantity;
			}

			localStorage.setItem("cart", JSON.stringify(state.cart));
		},
		deleteFromCart(state, action) {
			const index = state.cart.findIndex(
				(item) => item.id === action.payload
			);
			if (index !== -1) {
				state.cart.splice(index, 1);
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
	extraReducers: (builder) => {},
});

export const { addToCart, updateCart, deleteFromCart, deleteMultiFromCart } =
	purchaseSlice.actions;

export default purchaseSlice.reducer;
