import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
// ============
import './scss/app.scss';
import { Home } from './pages/Home';
import { MainLayout } from './layouts/MainLayout';

const Cart = React.lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = React.lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'));
const NotFound = React.lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<MainLayout />}>
					<Route path="" element={<Home />} />
					<Route
						path="*"
						element={
							<Suspense fallback={<div>...</div>}>
								<NotFound />
							</Suspense>
						}
					/>
					<Route
						path="cart"
						element={
							<Suspense fallback={<div>loadig ...</div>}>
								<Cart />
							</Suspense>
						}
					/>
					<Route
						path="pizza/:id"
						element={
							<Suspense fallback={<div>loading...</div>}>
								<FullPizza />
							</Suspense>
						}
					/>
				</Route>
			</Routes>
		</div>
	);
}

export default App;
