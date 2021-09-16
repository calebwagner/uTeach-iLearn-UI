import React, { useState, createContext } from "react";

export const MessageContext = createContext();

export const MessageProvider = (props) => {
  const [messages, setMessages] = useState([]);

  messages.sort((msg1, msg2) => (msg1.timestamp < msg2.timestamp ? 1 : -1));

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
      }}
    >
      {props.children}
    </MessageContext.Provider>
  );
};
