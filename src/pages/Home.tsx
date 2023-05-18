import React from 'react';
import { useSelector } from 'react-redux';
import qs from 'qs';

import { Link, useNavigate } from 'react-router-dom';
// slices
import {
	FilterSliceState,
	selectFilter,
	setCategoryId,
	setCurrentPage,
	setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
// components
import { Categories } from '../components/Categories';
import { Sort, list } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Pagination } from '../components/Pagination';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { RootState, useAppDispatch } from '../redux/store';

// 

export const Home: React.FC = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch()
	const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
	const pizzaItems = useSelector((state: RootState) => state.pizza.items);
	let status = useSelector((state: RootState) => state.pizza.status);
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);

	const onChangeCategory = (id: number) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (number: number) => {
		dispatch(setCurrentPage(number));
	};

	const getPizzas = async () => {
		try {
			const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
			const sortBy = sort.sortProperty.replace('-', '');
			const category = categoryId > 0 ? `&category=${categoryId}` : '';
			const search = searchValue ? `&search=${searchValue}` : '';
			dispatch(
				fetchPizzas({
					order,
					sortBy,
					category,
					search,
					currentPage,
				}),
			);
		} catch (error) {
			console.error('Error', error);
		}
	};
	React.useEffect(() => {
		window.scrollTo(0, 0);

		if (!isSearch.current) {
			getPizzas();
		}
		isSearch.current = false;
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);
	React.useEffect(() => {
		if (isMounted.current) {
			const queryString = qs.stringify({
				sortProperty: sort.sortProperty,
				categoryId,
				currentPage,
			});
			navigate(`?${queryString}`);
		}
		isMounted.current = true;
	}, [categoryId, sort.sortProperty, currentPage]);
	React.useEffect(() => {
		if (window.location.search) {
			const params = qs.parse(window.location.search.substring(1));
			const sort = list.find((obj) => obj.sortProperty === params.sortProperty);
			dispatch(
				setFilters({
					...params,
					sort,
				} as unknown as FilterSliceState),
			);
			isSearch.current = true;
		}
	}, []);

	const pizzas = pizzaItems.map((obj: any, index: number) => (
		<Link key={index} to={`/pizza/${obj.id}`}>
			<PizzaBlock {...obj} />
		</Link>
	));
	const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={(i: number) => onChangeCategory(i)} />
				<Sort />
			</div>
			{status === 'error' ? (
				<div className="cart cart--empty" style={{ marginTop: '100px' }}>
					<h2>
						ЙОЙ! <span>😕</span>
					</h2>
					<p>
						Сталася помилка!
						<br />
					</p>
				</div>
			) : (
				<>
					<h2 className="content__title">Усі піцци</h2>
					<div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>
					<Pagination currentPage={currentPage} onChangePage={onChangePage} />
				</>
			)}
		</div>
	);
};
