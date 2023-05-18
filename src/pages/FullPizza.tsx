import React, { useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
const FullPizza: React.FC = () => {
	const { id } = useParams();
	const [pizza, setPizza] = useState<{
		imageUrl: string;
		title: string;
		price: number;
	}>();
	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get('https://643aa752bd3623f1b9b848b9.mockapi.io/items/' + id);
				setPizza(data);
			} catch (error) {
				console.log('error :', error);
			}
		}
		fetchPizza();
	}, []);
	if (!pizza) {
		return (
			<>
				<div className="">Завантаження ...</div>
			</>
		);
	}
	return (
		<>
			<div className="container">
				<img src={pizza.imageUrl} alt="" />
				<h2>{pizza.title}</h2>
				<h4>{pizza.price} грн.</h4>
				<Link to="/">
					<button style={{ marginTop: 25}} className="button button-outline button--add">Назад</button>
				</Link>
			</div>
		</>
	);
};
export default FullPizza;
