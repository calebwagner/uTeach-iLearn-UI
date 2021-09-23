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
    <form className="notebookForm mt-12 bg-white px-8 pt-6 pb-8 mb-4 space-y-6 m-8category p-8  mx-auto  rounded-xl shadow-md overflow-hidden md:max-w-2xl m-0">
      <h2 className="notebookForm__title mb-4 font-extrabold text-2xl">
        Edit Category
      </h2>

      <fieldset>
        <div className="form-group mb-4">
          <div className="form-group block mb-2 text-sm font-bold text-gray-700">
            <label htmlFor="name block text-gray-700 text-sm font-bold mb-2">
              Title of Category:
            </label>
          </div>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control w-2/3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={currentCategory.title}
            onChange={changeCategoryState}
          />
        </div>
        <div className="form-group block mb-2 text-sm font-bold text-gray-700">
          <div className="form-group mb-4 ">
            <label htmlFor="description block mb-2 text-sm font-bold text-gray-700">
              Write your description here:
            </label>
          </div>
          <textarea
            type="text"
            name="description"
            required
            autoFocus
            rows="6"
            className="form-control h- w-2/3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={currentCategory.description}
            onChange={changeCategoryState}
          />
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
