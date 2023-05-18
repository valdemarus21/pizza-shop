import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params, thunkApi) => {
	const { order, sortBy, category, search, currentPage } = params;
	const { data } = await axios.get(
		`https://643aa752bd3623f1b9b848b9.mockapi.io/items?limit=4&page=${currentPage}${category}${search}&sortBy=${sortBy}&order=${order}`,
	);
		if(data.length === 0){
			return thunkApi.rejectWithValue('немає піцци')
		}
	return thunkApi.fulfillWithValue(data);
});

const initialState = {
	items: [],
	status: 'loading'
};

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action) {
			state.items = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
		   .addCase(fetchPizzas.pending, (state) => {
			  state.status = "loading"
			  console.log(state.status)
			  state.items = []
		   })
		   .addCase(fetchPizzas.fulfilled, (state, action) => {
			  state.items = action.payload
			  state.status = "success"
			  console.log(state.status)
		   })
		   .addCase(fetchPizzas.rejected, (state) => {
			  state.status = "error"
			  console.log(state.status)
			  state.items = []
		   })
	 }
});
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
