import React from 'react';
import { Routes, Route } from 'react-router-dom';
// ============
import './scss/app.scss';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import { Cart } from './pages/Cart';
export const SearchContext = React.createContext();
function App() {
	const [searchValue, setSearchValue] = React.useState('');
	return (
		<SearchContext.Provider value={{ searchValue, setSearchValue }}>
			<div className="App">
				<div className="wrapper">
					<Header />
					<div className="content">
						<Routes>
							<Route exact path="/" element={<Home />} />
							<Route path="*" element={<NotFound />} />
							<Route path="/cart" element={<Cart />} />
						</Routes>
					</div>
				</div>
			</div>
		</SearchContext.Provider>
	);
}

export default App;
