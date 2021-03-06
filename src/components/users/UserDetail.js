import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthorContext } from "../authors/AuthorProvider";
import { ConnectionContext } from "../connections/ConnectionProvider";

export const UserDetail = ({ user }) => {
  const { getAuthorById } = useContext(AuthorContext);
  const { unaddConnection, addConnection, getConnections, connections } =
    useContext(ConnectionContext);
  const { authorId } = useParams();

  const [isConnected, setIsConnected] = useState();

  useEffect(() => {
    getConnections().then(() => {
      const foundConnection = connections.find((connected) => {
        return user.user.id === connected.profile.user.id;
      });
      if (foundConnection) {
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    });
  }, [isConnected]);

  const refreshPage = () => {
    window.location.reload();
  };

  const addAConnection = () => {
    addConnection({
      user: user.user.id,
      profile: user.id,
    }).then(refreshPage);
  };

  const foundConnection = connections.find((connected) => {
    return user.id === connected.profile.user.id;
  });

  const unaddAConnection = () => {
    unaddConnection(foundConnection.id).then(refreshPage);
  };

  useEffect(() => {
    getAuthorById(authorId);
  }, []);

  return (
    <article className="profile  flex p-4  mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <img
        className="inline object-cover w-24 h-24 mr-2 rounded-full cursor-auto transition duration-500 ease-in-out  transform hover:-translate-y-2 hover:scale-110"
        src={user.image_url}
        alt="profile picture"
      ></img>
      <section className="profile__info">
        <div className="profile__username block mb-2  font-bold text-gray-700">
          Username: {user?.user?.username} || Name: {user?.user?.first_name}{" "}
          {user?.user?.last_name}
        </div>
        <button className="connect-btn m-8 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
          <Link to={`/authors/${user.id}`} className="">
            profile link
          </Link>
        </button>
        {isConnected ? (
          <button
            className="m-8 py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            onClick={unaddAConnection}
          >
            Unconnect
          </button>
        ) : (
          <button
            className="connect-btn m-8 py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            onClick={addAConnection}
          >
            Connect
          </button>
        )}
      </section>
    </article>
  );
};
