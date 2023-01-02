import React from 'react';

const BookList = (props) => {
	const FavouriteComponent = props.favouriteComponent;

	return (
		<>
			{props.books.map((book, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
					<img src={book.Cover} alt='book'></img>
					<div
						onClick={() => props.handleFavouritesClick(book)}
						className='overlay d-flex align-items-center justify-content-center'
					>
						<FavouriteComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default BookList;
