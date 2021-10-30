import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "./PostProvider";
import { CategoryContext } from "../categories/CategoryProvider";

export const PostForm = () => {
  const { createPost } = useContext(PostContext);
  const { getCategories, categories } = useContext(CategoryContext);

  const [currentPost, setCurrentPost] = useState({
    title: "",
    category: 0,
    created_on: "",
    // image: "",
    description: "",
  });

  useEffect(() => {
    getCategories();
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  const changePostState = (event) => {
    const newPostState = { ...currentPost };
    newPostState[event.target.name] = event.target.value;
    setCurrentPost(newPostState);
  };

  return (
    <form className="postForm mt-12 bg-white px-8 pt-6 pb-8 mb-4 space-y-6 m-8category p-8  mx-auto  rounded-xl shadow-md overflow-hidden md:max-w-2xl m-0">
      <h2 className="postForm__title mb-4 font-extrabold text-2xl">
        Create Post
      </h2>
      <fieldset>
        <div className="form-group block mb-2 text-sm font-bold text-gray-700">
          <div className="block mb-2 text-sm font-bold text-gray-700">
            <label htmlFor="post_category">Category:</label>
          </div>
          <select
            value={currentPost.category}
            name="category"
            id="category"
            className="form-control form-control w-2/3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={changePostState}
          >
            <option value="0">Select article category</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group block mb-2 text-sm font-bold text-gray-700">
          <div className="block mb-2 text-sm font-bold text-gray-700">
            <label htmlFor="name ">Title of post:</label>
          </div>
          <input
            type="text"
            name="title"
            placeholder="I'm starting to learn ..."
            required
            autoFocus
            className="form-control form-control w-2/3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={currentPost.title}
            onChange={changePostState}
          />
        </div>

        <div className="form-group">
          <div className="block mb-2 text-sm font-bold text-gray-700">
            <label htmlFor="description">Write your description here:</label>
          </div>
          <textarea
            type="text"
            name="description"
            placeholder="I need help with ..."
            required
            autoFocus
            rows="5"
            className="form-control form-control w-2/3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={currentPost.description}
            onChange={changePostState}
          />
        </div>
      </fieldset>

      <button
        type="submit"
        className="create_btn m-8 py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        onClick={(evt) => {
          evt.preventDefault();
          let timestamp = Date.now();
          const post = {
            title: currentPost.title,
            category: parseInt(currentPost?.category),
            created_on: timestamp,
            // image: currentPost.image,
            description: currentPost.description,
          };

          createPost(post).then(refreshPage);
        }}
      >
        Create
      </button>
      <button
        className="cancel_post py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        onClick={refreshPage}
      >
        Cancel
      </button>
    </form>
  );
};
