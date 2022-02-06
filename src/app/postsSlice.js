import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsApi from "api/postsApi";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
	try {
		const response = await postsApi.getAllPost();
		return response.data;
	} catch (error) {
		throw error;
	}
});

export const fetchCurrentPost = createAsyncThunk(
	"posts/fetchCurrentPost",
	async (id) => {
		try {
			const response = await postsApi.getPost(id);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

export const updatePost = createAsyncThunk(
	"posts/updatePost",
	async ({ editPostId, formData }) => {
		try {
			const response = await postsApi.updatePost(editPostId, formData);
			return response.data;
		} catch (error) {
			throw error;
		}
	}
);

export const createPost = createAsyncThunk("posts/createPost", async (data) => {
	try {
		const response = await postsApi.createPost(data);
		return response.data;
	} catch (error) {
		throw error;
	}
});

const postsSlice = createSlice({
	name: "posts",
	initialState: {
		listPosts: [],
		currentPost: {},
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchPosts.fulfilled, (state, action) => {
				state.listPosts = action.payload.posts;
			})
			.addCase(fetchCurrentPost.fulfilled, (state, action) => {
				state.currentPost = action.payload.post;
			})
			.addCase(updatePost.fulfilled, (state, action) => {
				// state.currentPost = action.payload;
			})
			.addCase(createPost.fulfilled, (state, action) => {
				// state.currentPost = action.payload;
			});
	},
});

export default postsSlice.reducer;
