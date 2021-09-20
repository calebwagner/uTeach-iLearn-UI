import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { AuthorContext } from "../authors/AuthorProvider";
import { ConnectionContext } from "../connections/ConnectionProvider";
import { ProfileContext } from "../profile/ProfileProvider";
import { PostContext, PostProvider } from "./PostProvider";
import { SavedPostContext } from "./SavedPostsProvider";
import { HumanDate } from "../utils/HumanDate";

export const SavedPostDetail = ({ savedPost }) => {
  const { savePost, unsavePost, getSavedPosts, savedPosts } =
    useContext(SavedPostContext);
  const { getPosts, posts } = useContext(PostContext);
  const { getAuthorById, author } = useContext(AuthorContext);
  const { authorId } = useParams();
  const parsedIntAuthorId = parseInt(authorId);

  //   useEffect(() => {
  //     getAuthorById(parsedIntAuthorId);
  //   }, []);

  const history = useHistory();

  const [postIsSaved, setPostIsSaved] = useState();

  useEffect(() => {
    getPosts().then(() => {
      const foundSavedPost = posts.find((post) => {
        return post?.id === savedPost?.post?.id;
      });
      if (foundSavedPost) {
        setPostIsSaved(true);
      } else {
        setPostIsSaved(false);
      }
    });
  }, [postIsSaved]);

  const SaveThePost = () => {
    savePost({
      user: savePost.user.user.id,
      post: posts.id,
    }).then(() => {
      history.push("/profile");
    });
  };

  const foundSavedPost = posts.find((post) => {
    return post.id === savedPost?.post?.id;
  });

  const unsaveThePost = () => {
    unsavePost(foundSavedPost.id).then(() => {
      history.push("/profile");
    });
  };

  const [time, setTime] = useState("");

  useEffect(() => {
    if ("created_on" in savedPost.post) {
      const time = savedPost?.post?.created_on;
      const converted_time = HumanDate(time);
      setTime(converted_time);
    }
  }, [posts]);

  //   console.log(savedPost?.post?.description);

  return (
    <section className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex-shrink-0">
        <div className="flex">
          {/* <Link to={`/authors/${parsedIntAuthorId}`}> */}
          <img
            className="h-48 w-16 object-scale-dow md:w-48 cursor-auto hover:-translate-y-2 hover:scale-110"
            //   src={post.user.image_url}
            //   src={require("./images/profilepic.jpg")}
            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            alt="profile picture"
          ></img>
          {/* </Link> */}
          <div className="space-y-4">
            <h3 className="post_title_link cursor-auto hover:-translate-y-2 hover:scale-110">
              {/* <Link to={`/edit/${posts.id}`}> */}
              Title: {savedPost.post?.title} ||
              <div className=" inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {savedPost.post?.category?.title}
              </div>
              {/* </Link> */}
            </h3>
            <div className="inline-">
              Author: {savedPost?.post?.user?.user?.first_name}
              {savedPost?.post?.user?.user?.last_name}
            </div>
            <div>Posted on: {time}</div>
          </div>
        </div>
        <div>
          <h5>Description: {savedPost?.post?.description}</h5>
        </div>
        <img
          className="h-48 w-full object-cover md:w-48"
          src="https://www.aihr.com/wp-content/uploads/Learning-and-development.png"
          alt="picture"
        />

        {postIsSaved ? (
          <button
            className="py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            onClick={unsaveThePost}
          >
            Unsave
          </button>
        ) : (
          <button
            className="connect-btn m-8 py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            onClick={SaveThePost}
          >
            Save
          </button>
        )}
      </div>
    </section>
  );
};
