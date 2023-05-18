import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza, FetchPizzasArgs } from "./types";

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
