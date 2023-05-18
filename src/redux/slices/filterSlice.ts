import { RootState } from './../store';
import { createSlice } from '@reduxjs/toolkit';

type Sort = {
	name: string;
	sortProperty: 'rating' | '-rating' | 'title' | '-title' | 'price' | '-price';
};

interface FilterSliceState {
	searchValue: string;
	categoryId: number;
	currentPage: number;
	sort: Sort;
}

const initialState: FilterSliceState = {
	searchValue: '',
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
		setSearchValue(state, action) {
			state.searchValue = action.payload;
		},
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
export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;
export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
	filterSlice.actions;
export default filterSlice.reducer;
