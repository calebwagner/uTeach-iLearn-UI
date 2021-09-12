import React, { useState, createContext } from "react";

export const CategoryContext = createContext();

export const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);

  const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCategories(data));
  };

  const getCategoryById = (categoryId) => {
    return fetch(`http://localhost:8000/categories/${categoryId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
    }).then((res) => res.json());
  };

  const createCategory = (category) => {
    return fetch(`http://localhost:8000/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
      body: JSON.stringify(category),
    }).then(getCategories);
  };

  const deleteCategory = (categoryId) => {
    return fetch(`http://localhost:8000/categories/${categoryId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
    }).then(getCategories);
  };

  const updateCategory = (category) => {
    return fetch(`http://localhost:8000/categories/${category.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
      body: JSON.stringify(category),
    }).then(getCategories(category));
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        getCategories,
        getCategoryById,
        createCategory,
        deleteCategory,
        updateCategory,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};
