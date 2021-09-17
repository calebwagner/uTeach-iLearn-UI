import React, { useContext, useEffect } from "react";
import { CategoryContext } from "./CategoryProvider";
import { Category } from "./CategoryDetail";
import { CategoryForm } from "./CategoryForm";

export const CategoryList = () => {
  const { getCategories, categories } = useContext(CategoryContext);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="categories_list space-y-6 m-8  p-8  mx-auto  rounded-xl shadow-md overflow-hidden md:max-w-2xl">
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
