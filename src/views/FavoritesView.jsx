import React, { useContext, useCallback, useEffect } from "react";
import { AppContext } from "../App";
import BookCard from "../Components/BookCard";
import "../App.css";

export default function FavoritesView() {
  const { books, favorites, setFavorites } = useContext(AppContext);

  const favoriteBooks = books.filter((book) => favorites.includes(book.id));
  console.log("Favorite List:", favorites);
  console.log("Favorite Books:", favoriteBooks);

  const handleFavoriteClick = useCallback(
    (bookId) => {
      console.log("Toggling favorite for book:", bookId);
      setFavorites((prevFavorites) => {
        const updatedFavorites = new Set(prevFavorites);
        if (updatedFavorites.has(bookId)) {
          updatedFavorites.delete(bookId);
        } else {
          updatedFavorites.add(bookId);
        }
        const updatedFavoritesArray = Array.from(updatedFavorites);
        console.log("Updated favorites array:", updatedFavoritesArray);
        localStorage.setItem(
          "favorites",
          JSON.stringify(updatedFavoritesArray)
        );
        return updatedFavoritesArray;
      });
    },
    [setFavorites]
  );

  // Only recreate the function if setFavorites changes

  return (
    <div className="favorite-list">
      <h1>Favorites</h1>
      {favoriteBooks.length > 0 ? (
        favoriteBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            isFavorite={true}
            onFavoriteClick={() => handleFavoriteClick(book.id)}
            bookImage={book.formats?.["image/jpeg"] || "/default-book.jpg"}
          />
        ))
      ) : (
        <p>No favorite books yet.</p>
      )}
    </div>
  );
}
