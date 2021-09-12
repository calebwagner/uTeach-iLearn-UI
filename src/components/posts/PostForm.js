import React, { useContext, useState, useEffect } from "react";
import { PostContext } from "./PostProvider";
import { useHistory, useParams } from "react-router-dom";
import { CategoryContext } from "../categories/CategoryProvider";
// import { HumanDate } from "../utils/HumanDate";

export const PostForm = () => {
  const history = useHistory();
  const { posts, createPost, getPosts } = useContext(PostContext);
  const { getCategories, categories } = useContext(CategoryContext);
  //   const userId = parseInt(localStorage.getItem("uteachilearn_token"));

  const [currentPost, setCurrentPost] = useState({
    // user: userId,
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
    <form className="postForm">
      <h2 className="postForm__title">Create Post</h2>
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

      <button
        type="submit"
        className="btn btn-primary"
        onClick={(evt) => {
          // Prevent form from being submitted
          evt.preventDefault();
          let timestamp = Date.now();
          const post = {
            // user: userId,
            title: currentPost.title,
            category: parseInt(currentPost?.category),
            created_on: timestamp,
            image: currentPost.image,
            description: currentPost.description,
          };

          // Send POST request to your API
          createPost(post).then(() => history.push("/"));
        }}
      >
        Create
      </button>
      <button className="btn btn-primary" onClick={() => history.push("/")}>
        Cancel
      </button>
    </form>
  );
};
