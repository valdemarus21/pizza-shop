import React from 'react';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { useSelector } from '@reduxjs/toolkit'
import { SearchContext } from '../App';

export function Home() {
	const { searchValue} = React.useContext(SearchContext)
	const [pizzaItems, setPizzaItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [categoryId, setCategoryId] = React.useState(0);
	const [sortType, setSortType] = React.useState({
		name: 'популярності',
		sortProperty: 'rating',
	});
	const [currentPage, setCurrentPage] = React.useState(1)
	React.useEffect(() => {
		try {
			setIsLoading(true);
			const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
			const sortBy = sortType.sortProperty.replace('-', '');
			const category = categoryId > 0 ? `&category=${categoryId}` : '';
			const search = searchValue ? `&search=${searchValue}` : '';
			fetch(
				`https://643aa752bd3623f1b9b848b9.mockapi.io/items?limit=4&page=${currentPage}${category}${search}&sortBy=${sortBy}&order=${order}`,
			)
				.then((res) => res.json())
				.then((json) => setPizzaItems(json));
			setIsLoading(false);
		} catch (error) {
			console.error('Error', error);
		}
		window.scrollTo(0, 0);
	}, [categoryId, sortType, searchValue, currentPage]);
	const pizzas = pizzaItems.map((obj, index) => <PizzaBlock key={index} {...obj} />);
	const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
				<Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
			</div>
			<h2 className="content__title">Усі піцци</h2>
			<div className="content__items">{isLoading ? skeleton : pizzas}</div>
			<Pagination onChangePage={number => setCurrentPage(number)} />
		</div>
	);
}
