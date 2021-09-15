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

  return (
    <ConnectionContext.Provider value={{ connections, getConnections }}>
      {props.children}
    </ConnectionContext.Provider>
  );
};
