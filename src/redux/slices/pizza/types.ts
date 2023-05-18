export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export type Pizza = {
	id: string;
	title: string;
	price: number;
	imageUrl: string;
	sizes: number[];
	types: number[];
	rating: number;
};
export type FetchPizzasArgs = {
	order: string;
	sortBy: string;
	category: string;
	search: string;
	currentPage: number;
};
export interface PizzaSliceState {
	items: Pizza[];
	status: Status;
}
