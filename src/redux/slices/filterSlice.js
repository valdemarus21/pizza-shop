import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	categoryId: 0,
	currentPage: 1,
	sort: {
		name: 'популярності',
		sortProperty: 'rating',
	},
};

const filterSlice = createSlice({
	name: 'filters',
	initialState,

	reducers: {
		setSort(state, action) {
			state.sort = action.payload;
		},
		setCategoryId(state, action) {
			state.categoryId = action.payload;
		},
		setCurrentPage(state, action) {
			state.currentPage = action.payload;
		},
		setFilters(state, action) {
			state.currentPage = Number(action.payload.currentPage);
			state.sort = action.payload.sort;
			state.categoryId = Number(action.payload.categoryId);
		},
	},
});

export const { setCategoryId, setSort, setCurrentPage, setFilters } = filterSlice.actions;
export default filterSlice.reducer;
