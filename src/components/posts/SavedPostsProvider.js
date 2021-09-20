import React, { useState } from "react";

export const SavedPostContext = React.createContext();

export const SavedPostProvider = (props) => {
  const [savedPosts, setSavedPosts] = useState([]);

  const getSavedPosts = () => {
    return fetch("http://localhost:8000/savedposts", {
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setSavedPosts);
  };

  const savePost = (savedPost) => {
    return fetch("http://localhost:8000/savedposts", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(savedPost),
    }).then(getSavedPosts);
  };

  const unsavePost = (savedPostId) => {
    return fetch(`http://localhost:8000/savedposts/${savedPostId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
    }).then(getSavedPosts);
  };

  return (
    <SavedPostContext.Provider
      value={{ savedPosts, getSavedPosts, savePost, unsavePost }}
    >
      {props.children}
    </SavedPostContext.Provider>
  );
};
