import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CategoryContext } from "../categories/CategoryProvider";

export const UpdateCategory = () => {
  const { getCategoryById, updateCategory } = useContext(CategoryContext);

  const { categoryId } = useParams();

  const history = useHistory();

  const currentUserId = parseInt(localStorage.getItem("uteachilearn_token"));

  const [currentCategory, setCurrentCategory] = useState({
    user: currentUserId,
    title: "",
    description: "",
  });

  useEffect(() => {
    getCategoryById(parseInt(categoryId)).then(setCurrentCategory);
  }, []);

  const changeCategoryState = (event) => {
    const newCategoryState = { ...currentCategory };
    newCategoryState[event.target.name] = event.target.value;
    setCurrentCategory(newCategoryState);
  };

  const handleClickUpdateCategory = (event) => {
    event.preventDefault();
    const newCategory = {
      id: currentCategory.id,
      title: currentCategory.title,
      description: currentCategory.description,
    };
    updateCategory(newCategory).then(() => history.push("/categories"));
  };

  return (
    <form className="notebookForm bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="notebookForm__title mb-4">Edit Category</h2>
      <fieldset>
        <div className="form-group mb-4">
          <label htmlFor="name block text-gray-700 text-sm font-bold mb-2">
            Title of Category:{" "}
          </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={currentCategory.title}
            onChange={changeCategoryState}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Write your description here:</label>
          <input
            type="text"
            name="description"
            required
            autoFocus
            className="form-control shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={currentCategory.description}
            onChange={changeCategoryState}
          ></input>
        </div>
      </fieldset>

      <button
        className="m-8 py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        onClick={handleClickUpdateCategory}
      >
        Save
      </button>
      <button
        className="py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        onClick={() => history.push("/categories")}
      >
        Cancel
      </button>
    </form>
  );
};
