import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { AuthorContext } from "../authors/AuthorProvider";
import { ConnectionContext } from "../connections/ConnectionProvider";
import { ProfileContext } from "../profile/ProfileProvider";

export const UserDetail = ({ user }) => {
  const { getAuthorById } = useContext(AuthorContext);
  const { unaddConnection, addConnection, getConnections, connections } =
    useContext(ConnectionContext);
  const { authorId } = useParams();
  const history = useHistory();

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

  const addAConnection = () => {
    addConnection({
      user: user.user.id,
      profile: user.id,
    }).then(() => {
      history.push("/users");
    });
  };

  const foundConnection = connections.find((connected) => {
    return user.id === connected.profile.user.id;
  });

  const unaddAConnection = () => {
    unaddConnection(foundConnection.id).then(() => {
      history.push("/users");
    });
  };

  useEffect(() => {
    getAuthorById(authorId);
  }, []);

  return (
    <article className="profile p-8 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <header>
        <h1>
          User: {user?.user?.first_name} {user?.user?.last_name}
        </h1>
      </header>
      <section className="profile__info">
        <img
          className="h-48 w-16 object-scale-down md:w-48"
          //   src={post.user.image_url}
          //   src={require("./images/profilepic.jpg")}
          src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
          alt="profile picture"
        ></img>

        <div className="profile__username">
          Username: {user?.user?.username}
        </div>
        <button className="connect-btn m-8 py-2 px-4 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
          <Link to={`/authors/${user.id}`} className="">
            profile link
          </Link>
        </button>
        {/* <div className="profile__bio">About: {user?.user?.bio}</div> */}
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
