import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "./PostProvider";
import { useHistory } from "react-router-dom";
import { CategoryContext } from "../categories/CategoryProvider";

export const PostForm = () => {
  const history = useHistory();
  const { posts, createPost, getPosts } = useContext(PostContext);
  const { getCategories, categories } = useContext(CategoryContext);

  const [currentPost, setCurrentPost] = useState({
    title: "",
    category: 0,
    created_on: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    getCategories();
  }, []);

  const changePostState = (event) => {
    const newPostState = { ...currentPost };
    newPostState[event.target.name] = event.target.value;
    setCurrentPost(newPostState);
  };

  return (
    <form className="postForm justify-center bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="postForm__title">Create Post</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Title of post: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control form-control w-2/3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={currentPost.title}
            onChange={changePostState}
          />
        </div>
        <div className="form-group">
          <label htmlFor="post_category">Category:</label>
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
        <div className="form-group">
          <label htmlFor="maker">Insert Image URL:</label>
          <input
            type="text"
            name="image"
            required
            autoFocus
            className="form-control form-control w-2/3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={currentPost.image}
            onChange={changePostState}
          ></input>
        </div>
        <div className="form-group">
          <label htmlFor="description">Write your description here:</label>
          <input
            type="text"
            name="description"
            required
            autoFocus
            className="form-control form-control w-2/3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={currentPost.description}
            onChange={changePostState}
          ></input>
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
            image: currentPost.image,
            description: currentPost.description,
          };

          createPost(post).then(() => history.push("/"));
        }}
      >
        Create
      </button>
      <button
        className="cancel_post py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        onClick={() => history.push("/")}
      >
        Cancel
      </button>
    </form>
  );
};
