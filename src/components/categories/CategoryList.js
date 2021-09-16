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
      <div className="categories_list space-y-6 pb-8">
        <div lassName="float-right w-1/4 sticky top-0 z-50 col-span-3 ">
          <CategoryForm />
        </div>
        {categories.map((category) => (
          <Category key={category.id} category={category} />
        ))}
      </div>
    </>
  );
};
