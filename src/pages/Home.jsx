import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import qs from 'qs';

import { useNavigate } from 'react-router-dom';
// slices
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzaSlice';
// components
import { Categories } from '../components/Categories';
import { Sort, list } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { setItems } from '../redux/slices/pizzaSlice';

export function Home() {
	const { searchValue } = React.useContext(SearchContext);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { categoryId, sort, currentPage } = useSelector((state) => state.filter);
	const pizzaItems = useSelector((state) => state.pizza.items);
	let status = useSelector((state) => state.pizza.status);
	const isSearch = React.useRef(false);
	const isMounted = React.useRef(false);
	// const [isLoading, setIsLoading] = React.useState(true);

	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};

	const onChangePage = (number) => {
		dispatch(setCurrentPage(number));
	};

	const getPizzas = async () => {
		try {
			// setIsLoading(true);
			const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
			const sortBy = sort.sortProperty.replace('-', '');
			const category = categoryId > 0 ? `&category=${categoryId}` : '';
			const search = searchValue ? `&search=${searchValue}` : '';
			// const { data } = await axios.get(
			// 	`https://643aa752bd3623f1b9b848b9.mockapi.io/items?limit=4&page=${currentPage}${category}${search}&sortBy=${sortBy}&order=${order}`,
			// );
			dispatch(
				fetchPizzas({
					order,
					sortBy,
					category,
					search,
					currentPage,
				}),
			);
			// setIsLoading(false);
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
				}),
			);
			isSearch.current = true;
		}
	}, []);

	const pizzas = pizzaItems.map((obj, index) => <PizzaBlock key={index} {...obj} />);
	const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={(i) => onChangeCategory(i)} />
				<Sort />
			</div>
			{status === 'error' ? (
				<div class="cart cart--empty" style={{marginTop:'100px'}}>
					<h2>
						ЙОЙ! <icon>😕</icon>
					</h2>
					<p>
						Сталася помилка!
						<br />
						Наша команда працює над відновленням доступу...
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
}
