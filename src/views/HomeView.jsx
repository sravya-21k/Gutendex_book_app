import { useContext, useEffect } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import "../App.css";

export default function HomeView() {
  const { books, loading, error, fetchBooks } = useContext(AppContext);

  useEffect(() => {
    if (books.length === 0) {
      fetchBooks("https://gutendex.com/books");
    }
  }, [books, fetchBooks]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error:{error} </div>;

  return (
    <div className="home-view container">
      <h2>Books</h2>
      <ul>
        {books.map((book) => (
          <li key={book.id}>
            <Link to={`/book/${book.id}`}>
              <h3>{book.title}</h3>
              <p>{book.author_name?.[0]}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
