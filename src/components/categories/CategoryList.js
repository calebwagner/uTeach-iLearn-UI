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
      <div className="categories_list space-y-6 pb-8 static mt-12 ">
        <div className="float-right w-1/4 fixed top-0 right-0 z-50 col-span-3 m-6">
          <CategoryForm />
        </div>
        {categories.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </div>
    </>
  );
};
