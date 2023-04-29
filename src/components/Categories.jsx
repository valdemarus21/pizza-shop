import React from 'react';

export function Categories({ value, onChangeCategory }) {
	const categories = ['Усі', 'М`ясні', 'Вегетарианські', 'Гриль', 'Гострі', 'Закриті'];

	return (
		<div className="categories">
			<ul className="categories__list">
				{categories.map((categoryName, i) => (
					<li onClick={() => onChangeCategory(i)} key={i} className={value === i ? 'active' : ''}>
						{categoryName}
					</li>
				))}
			</ul>
		</div>
	);
}
