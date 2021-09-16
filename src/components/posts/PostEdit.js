import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CategoryContext } from "../categories/CategoryProvider";
import { PostContext } from "./PostProvider";

export const UpdatePost = () => {
  const { updatePost, getPostById } = useContext(PostContext);
  const { getCategories, categories } = useContext(CategoryContext);

  const { postId } = useParams();

  const history = useHistory();

  const currentUserId = parseInt(localStorage.getItem("uteachilearn_token"));

  const [currentPost, setCurrentPost] = useState({
    user: currentUserId,
    title: "",
    category: 0,
    created_on: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    getPostById(parseInt(postId)).then(setCurrentPost);
  }, []);

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
      id: currentPost.id,
      title: currentPost.title,
      category: parseInt(currentPost.category),
      created_on: currentPost.created_on,
      image: currentPost.image,
      description: currentPost.description,
    };
    updatePost(newPost).then(() => history.push("/"));
  };

  return (
    <form className="notebookForm">
      <h2 className="notebookForm__title">Edit Post</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Title of post: </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control"
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
            className="form-control"
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
        <div className="form-group">
          <label htmlFor="maker">Insert Image URL:</label>
          <input
            type="text"
            name="image"
            required
            autoFocus
            className="form-control"
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
            className="form-control"
            value={currentPost.description}
            onChange={changePostState}
          ></input>
        </div>
      </fieldset>

      <button className="btn btn-primary" onClick={handleClickUpdatePost}>
        Save
      </button>
      <button className="btn btn-primary" onClick={() => history.push("/")}>
        Cancel
      </button>
    </form>
  );
};
