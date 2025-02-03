import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import CategoryMenu from "./CategoryMenu";
import { AppContext } from "../App";
export default function Header() {
  const [showCategories, setShowCategories] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const { books, setBooks } = useContext(AppContext);
  const navigate = useNavigate();
  const handleCategoryClick = () => {
    setShowCategories(!showCategories);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const filteredBooks = books.filter((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (filteredBooks.length === 0) {
      navigate("/error");
    } else {
      setBooks(filteredBooks);
    }
  };
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>
        <Link to="/favorites">Favorites</Link>
        {/* Use a button or link to toggle CategoryMenu */}
        <button onClick={handleCategoryClick}>
          {showCategories ? "Hide Categories" : "Show Categories"}
        </button>
      </nav>

      {/*search bar*/}
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Search for books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">search</button>
      </form>
      {/* Render CategoryMenu based on state */}
      {showCategories && <CategoryMenu />}
    </header>
  );
}
