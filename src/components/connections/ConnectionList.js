import React, { useContext, useEffect } from "react";
import { ConnectionDetail } from "./ConnectionDetail";
import { ConnectionContext } from "./ConnectionProvider";
import "tailwindcss/tailwind.css";

export const ConnectionList = () => {
  const { getConnections, connections } = useContext(ConnectionContext);

  useEffect(() => {
    getConnections();
  }, []);

  return (
    <section className="ml-4 space-y-6 pb-8  mt-12 bg-white rounded-xl  p-3">
      <h2 className="postForm__title mb-4 font-extrabold text-2xl">
        Connections
      </h2>
      {connections.map((connection) => {
        return <ConnectionDetail key={connection.id} connection={connection} />;
      })}
    </section>
  );
};
