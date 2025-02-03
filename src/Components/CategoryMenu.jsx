import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
const CategoryMenu = () => {
  const categories = [
    "Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Fantasy",
    "Morality",
    "Society",
    "Power",
    "Justice",
    "Adventure",
    "Tragedy",
    "War",
    "Phil0sopy",
  ];
  return (
    <nav className="Category-menu">
      <ul>
        {categories.map((category) => (
          <li key={category}>
            <Link to={`/category/${category.toLowerCase()}`}>{category}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default CategoryMenu;
