import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	sort: {
		name: 'популярності',
		sortProperty: 'rating',
	},
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,

	reducers: {
		setSort(state, action){
			state.sort = action.payload
		},
		setCategoryId(state, action) {
			state.categoryId = action.payload;
		},
	},
});

export const { setCategoryId, setSort } = filterSlice.actions;
export default filterSlice.reducer