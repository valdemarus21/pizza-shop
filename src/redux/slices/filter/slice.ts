
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilterSliceState, Sort } from './types';

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
		setSearchValue(state, action: PayloadAction<string>) {
			state.searchValue = action.payload;
		},
		setSort(state, action: PayloadAction<Sort>) {
			state.sort = action.payload;
		},
		setCategoryId(state, action: PayloadAction<number>) {
			state.categoryId = action.payload;
		},
		setCurrentPage(state, action: PayloadAction<number>) {
			state.currentPage = action.payload;
		},
		setFilters(state, action: PayloadAction<FilterSliceState>) {
			state.currentPage = Number(action.payload.currentPage);
			state.sort = action.payload.sort;
			state.categoryId = Number(action.payload.categoryId);
		},
	},
});

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
	filterSlice.actions;
export default filterSlice.reducer;
