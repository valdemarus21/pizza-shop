import React from 'react';
import styles from './NotFoundBlock.module.scss';
export const NotFoundBlock: React.FC = () => {
	return (
		<>
			<br />
			<div className={styles.root}>
				<h1>Нічого не знайдено</h1>
				<p>Така сторінка не існує!</p>
			</div>
		</>
	);
}
