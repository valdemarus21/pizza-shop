import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (props: any) => (
	<ContentLoader
		className="pizza-block"
		speed={2}
		width={260}
		height={460}
		viewBox="0 0 260 460"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
		{...props}>
		<rect x="21" y="253" rx="3" ry="3" width="137" height="18" />
		<rect x="19" y="226" rx="3" ry="3" width="239" height="21" />
		<rect x="75" y="283" rx="3" ry="3" width="177" height="28" />
		<circle cx="135" cy="111" r="107" />
		<rect x="167" y="253" rx="3" ry="3" width="88" height="18" />
	</ContentLoader>
);

export default Skeleton;
