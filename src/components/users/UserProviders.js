import React, { useState, createContext } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [users, setUsers] = useState([]);

  const getUsers = () => {
    return fetch("http://localhost:8000/users", {
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  return (
    <UserContext.Provider
      value={{
        getUsers,
        users,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};
