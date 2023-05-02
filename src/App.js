import React from 'react';
import { Routes, Route } from 'react-router-dom';
// ============
import './scss/app.scss';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Cart } from './pages/Cart';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { FullPizza } from './pages/FullPizza';
import { MainLayout } from './layouts/MainLayout';

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route exact path="" element={<Home />} />
						<Route path="*" element={<NotFound />} />
						<Route path="cart" element={<Cart />} />
						<Route path="pizza/:id" element={<FullPizza />} />
					</Route>
				</Routes>
			</div>
		</Provider>
	);
}

export default App;
