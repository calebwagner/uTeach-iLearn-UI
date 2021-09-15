import React, { useState } from "react";

export const ConnectionContext = React.createContext();

export const ConnectionProvider = (props) => {
  const [connections, setConnections] = useState([]);

  const getConnections = () => {
    return fetch("http://localhost:8000/connections", {
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setConnections);
  };

  const addConnection = (connection) => {
    return fetch("http://localhost:8000/connections", {
      method: "POST",
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(connection),
    }).then(setConnections);
  };

  const unaddConnection = (connectionId) => {
    return fetch(`http://localhost:8000/messages/${connectionId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
    }).then(getConnections);
  };

  return (
    <ConnectionContext.Provider
      value={{ connections, getConnections, addConnection, unaddConnection }}
    >
      {props.children}
    </ConnectionContext.Provider>
  );
};
