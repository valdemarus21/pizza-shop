import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
export function FullPizza() {
	const { id } = useParams();
	const [pizza, setPizza] = useState();
	React.useEffect(() => {
		async function fetchPizza() {
			try {
				const { data } = await axios.get('https://643aa752bd3623f1b9b848b9.mockapi.io/items/' + id);
				setPizza(data);
			} catch (error) {
				console.log('error :', error);
			}
		}
        fetchPizza()
	}, []);
    if(!pizza){
        return (
            <div className="">
                Завантаження ... 
            </div>
        )
    }
	return (
		<>
			<div className="container">
				<img src={pizza.imageUrl} alt="" />
				<h2>{pizza.title}</h2>
				<p></p>
				<h4>{pizza.price}</h4>
			</div>
		</>
	);
}
