import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { CategoryContext } from "./CategoryProvider";
import { Category } from "./CategoryDetail";
import { CategoryForm } from "./CategoryForm";

export const CategoryList = () => {
  const { getCategories, categories } = useContext(CategoryContext);
  const history = useHistory();

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="categories_list space-y-6 m-8category p-8  mx-auto  rounded-xl shadow-md overflow-hidden md:max-w-2xl m-0">
        <div className="">
          <CategoryForm />
        </div>
        {categories.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </div>
    </>
  );
};
