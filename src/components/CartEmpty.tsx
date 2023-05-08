import React from 'react';
import image from '../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';
export const CartEmpty: React.FC = () => {
	return (
		<>
			<div className="cart cart--empty">
				<h2>
					Кошик пустий <span>😕</span>
				</h2>
				<p>
					Скоріш за все, ви ще не замовляли піццу
					<br />
					Для замовлення перейдіть на головну сторінку
				</p>
				<img src={image} alt="empty-cart" />
				<Link to="/" className="button button--black">
					<span>Повернутися назад</span>
				</Link>
			</div>
		</>
	);
}
