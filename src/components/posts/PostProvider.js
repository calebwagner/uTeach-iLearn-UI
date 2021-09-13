import React, { useState, createContext } from "react";

export const PostContext = createContext();

export const PostProvider = (props) => {
  const [posts, setPosts] = useState([]);

  //   posts.sort((post1, post2) =>
  //     post1.publication_date < post2.publication_date ? 1 : -1
  //   );

  const getMyPosts = (userId) => {
    return fetch(`http://localhost:8000/myposts?user=${userId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
    })
      .then((res) => res.json())
      .then(setPosts);
  };

  const getPosts = () => {
    return fetch("http://localhost:8000/posts", {
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
    })
      .then((res) => res.json())
      .then(setPosts);
  };

  const getPostById = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
    }).then((res) => res.json());
  };

  const createPost = (post) => {
    return fetch("http://localhost:8000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
      body: JSON.stringify(post),
    }).then(getPosts);
  };

  const deletePost = (postId) => {
    return fetch(`http://localhost:8000/posts/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
        "Content-Type": "application/json",
      },
    }).then(getPosts);
  };

  const updatePost = (post) => {
    return fetch(`http://localhost:8000/posts/${post.id}`, {
      method: "PUT",
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    }).then(getPosts);
  };

  return (
    <PostContext.Provider
      value={{
        posts,
        getPosts,
        getPostById,
        getMyPosts,
        createPost,
        deletePost,
        updatePost,
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
