import React, { useContext, useState } from "react";
import { CategoryContext } from "./CategoryProvider";

export const CategoryForm = () => {
  const { createCategory } = useContext(CategoryContext);

  const [currentCategory, setCurrentCategory] = useState({
    title: "",
    description: "",
  });

  const changeCategoryState = (event) => {
    const newCategoryState = { ...currentCategory };
    newCategoryState[event.target.name] = event.target.value;
    setCurrentCategory(newCategoryState);
  };

  return (
    <form className="message_form justify-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="postForm__title mb-4 font-extrabold text-2xl">
        Create A Category
      </h2>
      <fieldset>
        <div className="form-group mb-4">
          <label htmlFor="name  block text-gray-700 text-sm font-bold mb-2">
            Title of Category:
          </label>
          <div className="form-group mb-4">
            <input
              type="text"
              name="title"
              required
              autoFocus
              className="form-control w-2/3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              placeholder="title ..."
              value={currentCategory.title}
              onChange={changeCategoryState}
            />
          </div>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="description">Write your description here:</label>
          <div>
            <textarea
              type="text"
              name="description"
              cols={10}
              rows={5}
              required
              autoFocus
              className="form-control w-2/3 shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={currentCategory.description}
              onChange={changeCategoryState}
            />
          </div>
        </div>
      </fieldset>

      <button
        type="submit"
        className="m-8 py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        onClick={(evt) => {
          evt.preventDefault();
          const category = {
            title: currentCategory.title,
            description: currentCategory.description,
          };

          createCategory(category);
          setCurrentCategory({
            title: "",
            description: "",
          });
        }}
      >
        Create
      </button>
    </form>
  );
};
