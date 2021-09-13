import React, { useState, createContext } from "react";

export const MessageContext = createContext();

export const MessageProvider = (props) => {
  const [messages, setMessages] = useState([]);
  //   const [users, setUsers] = useState([]);

  //   const getUsers = () => {
  //     return fetch("http://localhost:8000/users", {
  //       headers: {
  //         Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
  //       },
  //     })
  //       .then((res) => res.json())
  //       .then((data) => setUsers(data));
  //   };

  const getMessages = () => {
    return fetch("http://localhost:8000/messages", {
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMessages(data));
  };

  const getMessageById = (messageId) => {
    return fetch(`http://localhost:8000/messages/${messageId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
    }).then((res) => res.json());
  };

  const sendMessage = (message) => {
    return fetch("http://localhost:8000/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
      body: JSON.stringify(message),
    }).then(getMessages);
  };

  const deleteMessage = (messageId) => {
    return fetch(`http://localhost:8000/messages/${messageId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
    }).then(getMessages);
  };

  return (
    <MessageContext.Provider
      value={{
        messages,
        getMessages,
        getMessageById,
        sendMessage,
        deleteMessage,
        // getUsers,
        // users,
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};
