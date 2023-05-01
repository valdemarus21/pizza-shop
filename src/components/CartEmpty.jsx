import React from 'react';
import image from '../assets/img/empty-cart.png';
import { Link } from 'react-router-dom';
export function CartEmpty() {
	return (
		<>
			<div class="cart cart--empty">
				<h2>
					Кошик пустий <icon>😕</icon>
				</h2>
				<p>
					Скоріш за все, ви ще не замовляли піццу
					<br />
					Для замовлення перейдіть на головну сторінку
				</p>
				<img src={image} alt="empty-cart" />
				<Link to="/" class="button button--black">
					<span>Повернутися назад</span>
				</Link>
			</div>
		</>
	);
}
