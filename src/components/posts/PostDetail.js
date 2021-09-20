import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { PostContext } from "./PostProvider";
import { HumanDate } from "../utils/HumanDate";
import "tailwindcss/tailwind.css";
import { SavedPostContext } from "./SavedPostsProvider";

export const PostDetail = ({ post }) => {
  const { deletePost } = useContext(PostContext);
  const { savePost, unsavePost, getSavedPosts, savedPosts } =
    useContext(SavedPostContext);
  const history = useHistory();

  const [postIsSaved, setPostIsSaved] = useState();

  useEffect(() => {
    getSavedPosts().then(() => {
      const foundSavedPost = savedPosts.find((savedPost) => {
        return post?.id === savedPost.post.id;
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
      user: post.user.user.id,
      post: post.id,
    }).then(() => {
      history.push("/");
    });
  };

  //   console.log(savedPost?.post);

  const foundSavedPost = savedPosts.find((savedPost) => {
    return post?.id === savedPost?.post.id;
  });

  const unsaveThePost = () => {
    unsavePost(foundSavedPost.id).then(() => {
      history.push("/");
    });
  };

  const [time, setTime] = useState("");

  useEffect(() => {
    if ("created_on" in post) {
      const time = post.created_on;
      const converted_time = HumanDate(time);
      setTime(converted_time);
    }
  }, [post]);

  return (
    <section className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex-shrink-0">
        <div className="flex">
          <Link to={`/authors/${post?.user?.user?.id}`}>
            <img
              className="h-48 w-16 object-scale-dow md:w-48 cursor-auto transition duration-500 ease-in-out  transform hover:-translate-y-2 hover:scale-110"
              //   src={post.user.image_url}
              //   src={require("./images/profilepic.jpg")}
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              alt="profile picture"
            ></img>
          </Link>
          <div className="space-y-4">
            <h3 className="post_title_link cursor-auto transition duration-500 ease-in-out  transform hover:-translate-y-2 hover:scale-110">
              <Link to={`/edit/${post.id}`}>
                Title: {post.title} ||
                <div className=" inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {post.category?.title}
                </div>
              </Link>
            </h3>
            <div className="inline-">
              Author: {post.user.user.first_name} {post.user.user.last_name}
            </div>
            <div>Posted on: {time}</div>
          </div>
        </div>
        <div>
          <h5>Description: {post.description}</h5>
        </div>
        <img
          className="h-48 w-full object-cover md:w-48"
          src="https://www.aihr.com/wp-content/uploads/Learning-and-development.png"
          alt="picture"
        />

        <div className="flex items-center justify-center">
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
          <button
            className="py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            onClick={() => deletePost(post.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};
