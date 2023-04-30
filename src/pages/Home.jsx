import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId } from '../redux/slices/filterSlice';
import axios from 'axios';
export function Home() {
	const dispatch = useDispatch();
	const { categoryId, sort } = useSelector((state) => state.filter);
	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id));
	};
	const { searchValue } = React.useContext(SearchContext);
	const [pizzaItems, setPizzaItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	const [currentPage, setCurrentPage] = React.useState(1);
	React.useEffect(() => {
		try {
			setIsLoading(true);
			const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
			const sortBy = sort.sortProperty.replace('-', '');
			const category = categoryId > 0 ? `&category=${categoryId}` : '';
			const search = searchValue ? `&search=${searchValue}` : '';
			axios
				.get(
					`https://643aa752bd3623f1b9b848b9.mockapi.io/items?limit=4&page=${currentPage}${category}${search}&sortBy=${sortBy}&order=${order}`,
				)
				.then((response) => setPizzaItems(response.data));
			setIsLoading(false);
		} catch (error) {
			console.error('Error', error);
		}
		window.scrollTo(0, 0);
	}, [categoryId, sort.sortProperty, searchValue, currentPage]);
	const pizzas = pizzaItems.map((obj, index) => <PizzaBlock key={index} {...obj} />);
	const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);
	return (
		<div className="container">
			<div className="content__top">
				<Categories value={categoryId} onChangeCategory={(i) => onChangeCategory(i)} />
				<Sort />
			</div>
			<h2 className="content__title">Усі піцци</h2>
			<div className="content__items">{isLoading ? skeleton : pizzas}</div>
			<Pagination onChangePage={(number) => setCurrentPage(number)} />
		</div>
	);
}
