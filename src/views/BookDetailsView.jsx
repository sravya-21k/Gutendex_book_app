import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { AppContext } from "../App";
// import { Link } from "react-router-dom";

import "../BookDetailsView.css";

export default function BookDetailsView() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetails = async () => {
      try {
        setError(null);
        setLoading(true);
        const response = await fetch(`https://gutendex.com/books/${bookId}`);
        if (!response.ok)
          throw new Error(`Failed to fetch book with ID:${bookId}`);
        const data = await response.json();
        console.log("Book Details:", data);
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetails();
  }, [bookId]);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Book not found.</p>;

  return (
    <div className="book-details-container">
      <h1>{book.title}</h1>
      <p className="author">Author:{book.authors?.[0]?.name || "Unknown"}</p>
      <p className="description">
        Description:{book.description || " No description available."}
      </p>

      <img
        src={book.formats?.["image/jpeg"] || "/default-book.jpg"}
        alt={book.title}
      />

      <p className="category">
        Category: {book.subjects?.join(", ") || "No category"}
      </p>
      <p className="language">
        Language: {book.languages?.join(", ") || "Unknown"}
      </p>
      <p className="read-book">Downloads: {book.download_count || "N/A"}</p>
      {book.formats?.["text/html"] && (
        <a
          href={book.formats["text/html"]}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read Book
        </a>
      )}
    </div>
  );
}
