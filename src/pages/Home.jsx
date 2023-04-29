import React from 'react';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';

export function Home() {
	const [pizzaItems, setPizzaItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [categoryId, setCategoryId] = React.useState(0);
	const [sortType, setSortType] = React.useState({
		name: 'популярності',
		sortProperty: 'rating',
	});
	React.useEffect(() => {
		try {
			setIsLoading(true);
			const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
			const sortBy = sortType.sortProperty.replace('-', '');
			const category = categoryId > 0 ? `category=${categoryId}` : '';
			fetch(
				`https://643aa752bd3623f1b9b848b9.mockapi.io/items?${category}&sortBy=${sortBy}&order=${order}`,
			)
				.then((res) => res.json())
				.then((json) => setPizzaItems(json));
			setIsLoading(false);
		} catch (error) {
			console.error('Error', error);
		}
		window.scrollTo(0, 0);
	}, [categoryId, sortType]);
	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={(i) => setCategoryId(i)} />
				<Sort value={sortType} onChangeSort={(i) => setSortType(i)} />
			</div>
			<h2 className="content__title">Усі піцци</h2>
			<div className="content__items">
				{isLoading
					? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
					: pizzaItems.map((obj, index) => <PizzaBlock key={index} {...obj} />)}
			</div>
		</div>
	);
}
