import React, { useState, createContext } from "react";

export const AuthorContext = createContext();

export const AuthorProvider = (props) => {
  const [authors, setAuthors] = useState([]);
  const [author, setAuthor] = useState({});

  const getAuthors = () => {
    return fetch(`http://localhost:8000/authors`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setAuthors);
  };

  //   const getAuthorDetails = (authorId) => {
  //     return fetch(`http://localhost:8000/authors/${authorId}`, {
  //       headers: {
  //         Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then(setAuthor);
  //   };

  const getAuthorById = (authorId) => {
    return fetch(`http://localhost:8000/authors/${authorId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
    })
      .then((res) => res.json())
      .then(setAuthor);
  };

  return (
    <AuthorContext.Provider
      value={{ authors, getAuthors, author, getAuthorById }}
    >
      {props.children}
    </AuthorContext.Provider>
  );
};
