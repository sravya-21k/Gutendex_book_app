import React, { useContext } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import BookCard from "../Components/BookCard";
import "../BookListView.css";

export default function BookListView() {
  const { filteredBooks, loading } = useContext(AppContext);
  const { books, favorites, setFavorites } = useContext(AppContext);

  const handleFavoriteClick = (bookId) => {
    const updatedFavorites = [...favorites]; //if exits
    if (updatedFavorites.includes(bookId)) {
      //
      //const index = updatedFavorites.indexOf(bookId);
      updatedFavorites.splice(updatedFavorites.indexOf(bookId), 1); //removed from favorites
    } else {
      updatedFavorites.push(bookId); //Added to favorites
    }
    setFavorites(updatedFavorites); // updated and shared usind setfavorites
  };
  if (loading) {
    return <div>Loading books...</div>;
  }
  if (filteredBooks.length === 0) {
    return <p>No books found</p>;
  }

  return (
    <div className="book-list">
      <h1>Book List</h1>
      {filteredBooks.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onFavoriteClick={handleFavoriteClick}
          isFavorite={favorites.includes(book.id)} // Pass correct favorite status
          bookImage={book.formats?.["image/jpeg"] || "/default-book.jpg"} // Pass image URL
        />
      ))}
    </div>
  );
}
