import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CategoryContext } from "../categories/CategoryProvider";
import { PostContext } from "./PostProvider";

export const UpdatePost = () => {
  const { updatePost, getPostById } = useContext(PostContext);
  const { getCategories, categories } = useContext(CategoryContext);

  const { postId } = useParams();

  const history = useHistory();

  const [currentPost, setCurrentPost] = useState({
    title: "",
    category: 0,
    created_on: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    getPostById(parseInt(postId)).then(
      (
        post // I need the current values of the post I want to edit
      ) =>
        setCurrentPost({
          title: post.title,
          category: post.category.id, // parseInt(currentPost.category) was getting whole object but I needed just the ID
          created_on: post.created_on,
          image: post.image,
          description: post.description,
        })
    );
  }, [postId]);

  useEffect(() => {
    getCategories();
  }, []);

  const changePostState = (event) => {
    const newPostState = { ...currentPost };
    newPostState[event.target.name] = event.target.value;
    setCurrentPost(newPostState);
  };

  const handleClickUpdatePost = (event) => {
    event.preventDefault();
    const newPost = {
      id: postId,
      title: currentPost.title,
      category: currentPost.category,
      created_on: currentPost.created_on,
      image: currentPost.image,
      description: currentPost.description,
    };
    updatePost(newPost).then(() => history.push("/"));
  };

  return (
    <form className="notebookForm mt-12 bg-white px-8 pt-6 pb-8 mb-4 space-y-6 m-8category p-8  mx-auto  rounded-xl shadow-md overflow-hidden md:max-w-2xl m-0">
      <h2 className="notebookForm__title mb-4 font-extrabold text-2xl">
        Edit Post
      </h2>
      <fieldset>
        <div className="form-group mb-4">
          <div className="form-group block mb-2 text-sm font-bold text-gray-700">
            <label htmlFor="name block text-gray-700 text-sm font-bold mb-2">
              Title of post:
            </label>
          </div>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control w-2/3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={currentPost.title}
            onChange={changePostState}
          />
        </div>
        <div className="form-group mb-4">
          <div className="form-group block mb-2 text-sm font-bold text-gray-700">
            <label htmlFor="post_category">Category:</label>
          </div>
          <select
            value={currentPost.category}
            name="category"
            id="category"
            className="form-control w-2/3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={changePostState}
          >
            <option value="0">Select article category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-4">
          <div className="form-group block mb-2 text-sm font-bold text-gray-700">
            <label htmlFor="maker block mb-2 text-sm font-bold text-gray-700">
              Insert Image URL:
            </label>
          </div>
          <input
            type="text"
            name="image"
            required
            autoFocus
            className="form-control w-2/3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={currentPost.image}
            onChange={changePostState}
          ></input>
        </div>
        <div className="form-group mb-4">
          <div className="form-group block mb-2 text-sm font-bold text-gray-700">
            <label htmlFor="description block mb-2 text-sm font-bold text-gray-700">
              Write your description here:
            </label>
          </div>
          <textarea
            type="text"
            name="description"
            required
            autoFocus
            rows="5"
            className="form-control w-2/3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={currentPost.description}
            onChange={changePostState}
          />
        </div>
      </fieldset>

      <button
        className="edit_post_btn m-8 py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        onClick={handleClickUpdatePost}
      >
        Save
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
