import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Categories } from '../components/Categories';
import { Sort } from '../components/Sort';
import { PizzaBlock } from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId } from '../redux/slices/filterSlice';
export function Home() {
	const dispatch = useDispatch()
	const categoryId = useSelector((state) => state.filter.categoryId);
	const sortType = useSelector(state => state.filter.sort.sortProperty)
	const onChangeCategory = (id) => {
		dispatch(setCategoryId(id))
	}
	const { searchValue } = React.useContext(SearchContext);
	const [pizzaItems, setPizzaItems] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);

	const [currentPage, setCurrentPage] = React.useState(1);
	React.useEffect(() => {
		try {
			setIsLoading(true);
			const order = sortType.includes('-') ? 'asc' : 'desc';
			const sortBy = sortType.replace('-', '');
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
				<Categories value={categoryId} onChangeCategory={(i) => onChangeCategory(i)} />
				<Sort />
			</div>
			<h2 className="content__title">Усі піцци</h2>
			<div className="content__items">{isLoading ? skeleton : pizzas}</div>
			<Pagination onChangePage={(number) => setCurrentPage(number)} />
		</div>
	);
}
