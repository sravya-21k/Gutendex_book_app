import React from "react";
import { useContext, useEffect, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import { AppContext } from "../App";
import "../App.css";

export default function CategoryView() {
  const { category } = useParams();
  const { books, loading, error, fetchBooks, favorites, setFavorites } =
    useContext(AppContext);

  useEffect(() => {
    fetchBooks(`https://gutendex.com/books?topic=${category}`);
  }, [category, fetchBooks]);

  const handleFavoriteClick = useCallback(
    (bookId) => {
      setFavorites((prevFavorites) => {
        if (prevFavorites.includes(bookId)) {
          return prevFavorites.filter((id) => id !== bookId);
        } else {
          return [...prevFavorites, bookId];
        }
      });
    },
    [setFavorites]
  );
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error:{error}</div>;
  if (!books.length) return <div>No book found for {category}.</div>;

  return (
    <div className="category-view">
      <h2>{category}Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>
              <h3>{book.title}</h3>
              <p>{book.author_name?.[0] || "Unknown Author"}</p>
            </Link>
            {/*Favorite button */}
            <button
              onClick={() => handleFavoriteClick(book.id)}
              className={favorites.includes(book.id) ? " favorite" : ""}
            >
              {favorites.includes(book.id)
                ? "Remove Favorite"
                : "Add Favorites"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
