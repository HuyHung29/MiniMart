const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
	name: "user",
	initialState: [],
	reducers: {},
	extraReducers: (builder) => {},
});

export default userSlice.reducer;
