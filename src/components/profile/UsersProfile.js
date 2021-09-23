import React, { useEffect, useContext, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { AuthorContext } from "../authors/AuthorProvider.js";
import { ConnectionContext } from "../connections/ConnectionProvider.js";
import { PostContext } from "../posts/PostProvider.js";
import { UserContext } from "../users/UserProviders.js";
import { ProfileContext } from "./ProfileProvider.js";

export const UsersProfileDetail = () => {
  const { profile, getProfile, getProfileById } = useContext(ProfileContext);
  const { posts, getPosts, getPostById } = useContext(PostContext);
  const { unaddConnection, addConnection, getConnections, connections } =
    useContext(ConnectionContext);
  const { users, getUsers } = useContext(UserContext);
  const { getAuthorById, author } = useContext(AuthorContext);
  const { authorId } = useParams();
  const history = useHistory();

  const [isConnected, setIsConnected] = useState();

  useEffect(() => {
    getConnections().then(() => {
      const alreadyConnected = connections.find((connected) => {
        return parseInt(authorId) === connected.profile.user.id;
      });
      if (alreadyConnected) {
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
      user: users.user?.id,
      profile: parseInt(authorId),
    }).then(refreshPage);
  };

  const alreadyConnected = connections.find((connected) => {
    return parseInt(authorId) === connected.profile.user.id;
  });

  const unaddAConnection = () => {
    unaddConnection(alreadyConnected.id).then(refreshPage);
  };

  useEffect(() => {
    getAuthorById(authorId);
  }, []);

  return (
    <article className="profile m-8 bg-white p-2 max-w-md mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="">
        <div className="">
          <article className="profile ">
            <section className="profile__info ">
              <img
                className="inline object-cover w-48 h-48 mr-2 rounded-full"
                src={author.image_url}
                alt="profile picture"
              ></img>
              <div className="block text-gray-700 font-bold text-2xl">
                <div className="profile__name  ">
                  User: {author?.user?.first_name} {author?.user?.last_name}
                </div>
                <div className="profile__username">
                  Username: {author?.user?.username}
                </div>
                <div className="profile__bio text-lg font-bold">
                  About: {author?.bio}
                </div>
              </div>
            </section>
          </article>
        </div>
      </div>
      {isConnected ? (
        <button
          className="py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
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
    </article>
  );
};
