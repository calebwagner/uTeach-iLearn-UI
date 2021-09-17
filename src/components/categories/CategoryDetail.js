import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CategoryContext } from "./CategoryProvider.js";

export const Category = ({ category }) => {
  const { deleteCategory } = useContext(CategoryContext);

  return (
    <section className="m-8category p-8  mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-0">
      <div className="md:flex-shrink-0 ">
        <h1 className="text-xl font-semibold">Category: {category.title}</h1>
        <Link to={`categories/edit/${category.id}`}>
          <div className="font-semibold">Description:</div>
          <div>{category.description}</div>
        </Link>
        <button
          className="py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          onClick={() => deleteCategory(category.id)}
        >
          Delete
        </button>
      </div>
    </section>
  );
};
