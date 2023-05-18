import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

type Pizza = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
	rating: number;
};
type FetchPizzasArgs = {
	order: string;
	sortBy: string;
	category: string;
	search: string;
	currentPage: string;
};
interface PizzaSliceState {
	items: Pizza[];
	status: 'loading' | 'success' | 'error';
}
const initialState: PizzaSliceState = {
	items: [],
	status: 'loading',
};

export const fetchPizzas = createAsyncThunk<Pizza[], FetchPizzasArgs>(
	'pizza/fetchPizzasStatus',
	async (params, thunkApi) => {
		const { order, sortBy, category, search, currentPage } = params;
		const { data } = await axios.get<Pizza[]>(
			`https://643aa752bd3623f1b9b848b9.mockapi.io/items?limit=4&page=${currentPage}${category}${search}&sortBy=${sortBy}&order=${order}`,
		);
		if (data.length === 0) {
			return thunkApi.rejectWithValue('немає піцци');
		}
		return thunkApi.fulfillWithValue(data);
	},
);

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
				state.status = 'loading';
				state.items = [];
			})
			.addCase(fetchPizzas.fulfilled, (state, action) => {
				state.items = action.payload;
				state.status = 'success';
			})
			.addCase(fetchPizzas.rejected, (state) => {
				state.status = 'error';
				state.items = [];
			});
	},
});
export const { setItems } = pizzaSlice.actions;
export default pizzaSlice.reducer;
