
import { Routes, Route } from 'react-router-dom';
// ============
import './scss/app.scss';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Cart } from './pages/Cart';
import { FullPizza } from './pages/FullPizza';
import { MainLayout } from './layouts/MainLayout';

function App() {
	return (
		
			<div className="App">
				<Routes>
					<Route path="/" element={<MainLayout />}>
						<Route path="" element={<Home />} />
						<Route path="*" element={<NotFound />} />
						<Route path="cart" element={<Cart />} />
						<Route path="pizza/:id" element={<FullPizza />} />
					</Route>
				</Routes>
			</div>
	);
}

export default App;
