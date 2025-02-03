import { useEffect, useState, createContext } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";

export const AppContext = createContext();

export default function App() {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [categories, setCategories] = useState([]);

  const [selectedBook, setSelectedBook] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [nextPageUrl, setNextPageUrl] = useState("https://gutendex.com/books");
  const [isFetching, setIsFetching] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });
  const baseAPIurl = "https://gutendex.com/books";

  const fetchBooks = async (url, reset = false) => {
    if (isFetching) return;
    setIsFetching(true);
    try {
      console.log(`Fetching from URL:${url}`);
      const response = await fetch(url);
      const data = await response.json();
      console.log("Full API Response:", data); // Log to check data

      setBooks((prevBooks) => {
        const bookMap = new Map();
        [...prevBooks, ...data.results].forEach((books) => {
          bookMap.set(books.id, books);
        });
        return Array.from(bookMap.values());
      });
      setFilteredBooks((prevBooks) => [...prevBooks, ...data.results]);

      setNextPageUrl(data.next); // Update next page URL
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };
  const fetchBookDetails = async (id) => {
    try {
      setError(null);
      setLoading(true);
      const response = await fetch(`${baseAPIurl}/${id}`);
      if (!response.ok) throw new Error("Failed to fetch book details");
      const data = await response.json();
      setSelectedBook(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch the initial page of books when component mounts
  useEffect(() => {
    console.log("Fetching books for URL : ", nextPageUrl);
    if (nextPageUrl && !isFetching) {
      fetchBooks(nextPageUrl);
    } // Fetch books for the first page or passed URL
  }, [nextPageUrl]);

  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  return (
    <AppContext.Provider
      value={{
        books,
        setBooks,
        filteredBooks,
        setFilteredBooks,
        categories,
        setCategories,

        favorites,
        setFavorites,
        selectedBook,
        error,
        loading,
        fetchBooks,
        fetchBookDetails,
      }}
    >
      <div>
        <Header />
        <main className="container">
          {loading && books.length === 0 ? (
            <div className="loading">Loading...</div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </AppContext.Provider>
  );
}
