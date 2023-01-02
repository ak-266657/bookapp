import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BookList from './components/BookList';
import BookListHeading from './components/BookListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';

const App = () => {
	const [books, setBooks] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getBookRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setBooks(responseJson.Search);
		}
	};

	useEffect(() => {
		getBookRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const bookFavourites = JSON.parse(
			localStorage.getItem('react-book-app-favourites')
		);

		if (bookFavourites) {
			setFavourites(bookFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-book-app-favourites', JSON.stringify(items));
	};

	const addFavouriteBook = (book) => {
		const newFavouriteList = [...favourites, book];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteBook = (book) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== book.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<BookListHeading heading='Movies' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
				<BookList
					books={books}
					handleFavouritesClick={addFavouriteMovie}
					favouriteComponent={AddFavourites}
				/>
			</div>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<BookListHeading heading='Favourites' />
			</div>
			<div className='row'>
				<BookList
					books={favourites}
					handleFavouritesClick={removeFavouriteBook}
					favouriteComponent={RemoveFavourites}
				/>
			</div>
		</div>
	);
};

export default App;
