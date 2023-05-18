
import React from 'react';

type CategoriesProps = {
	value: number;
	onChangeCategory: (i: number) => void;
};
export const Categories: React.FC<CategoriesProps> = React.memo(({ value, onChangeCategory }) => {
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
})
