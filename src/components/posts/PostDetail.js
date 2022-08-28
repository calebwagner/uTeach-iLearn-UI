import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PostContext } from "./PostProvider";
import { SavedPostContext } from "./SavedPostsProvider";
import { HumanDate } from "../utils/HumanDate";
import "tailwindcss/tailwind.css";

export const PostDetail = ({ post }) => {
  const { deletePost } = useContext(PostContext);
  const { savePost, unsavePost, getSavedPosts, savedPosts } =
    useContext(SavedPostContext);

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

  // function savedPost(post) {
  //   return post?.id === post.post.id;
  // }

  // const refreshPage = () => {
  //   window.location.reload();
  // };

  function refreshPage() {
    window.location.reload();
  }

  const SaveThePost = () => {
    savePost({
      user: post.user.user.id,
      post: post.id,
    }).then(refreshPage);
  };

  // function returnFoundSavedPost()
  // const foundSavedPost = savedPosts.find((savedPost) => {
  //   return post?.id === savedPost?.post.id;
  // });

  // function foundSavedPost() {
  //   if ()
  // }

  // var array = [...]

  // function getAll(ids){
  //   return array.find(function matchId(record){
  //     return record.id == record
  //   })
  // }

  // function getFoundSavedPost(postId) {
  //   return savePost.find(function savedPost(theSavedPost){
  //     return post?.id === theSavedPost?.post.id;
  //   })
  // }

  // const unsaveThePost = () => {
  //   unsavePost(foundSavedPost.id).then(refreshPage);
  // };

  let foundSavedPost = savedPosts.find(function savedPost(theSavedPost) {
    return post?.id === theSavedPost?.post.id;
  });

  const unsaveThePost = () => {
    let foundSavedPost = savedPosts.find((savedPost) => {
      return post?.id === savedPost?.post.id;
    });
    if (foundSavedPost) {
      unsavePost(
        // TODO: PUT FUNCTION() HERE ...
        foundSavedPost.id).then(refreshPage);
    }
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
        <div className="flex space-y-4">
          <Link to={`/authors/${post?.user?.user?.id}`}>
            <img
              className="inline object-cover w-24 h-24 mr-2 rounded-full cursor-auto transition duration-500 ease-in-out  transform hover:-translate-y-2 hover:scale-110"
              src={post.user.image_url}
              alt="profile picture"
            ></img>
          </Link>
          <div className="">
            <h3 className="post_title_link rounded-full hover:bg-green-100 block mb-2 text-sm font-extrabold text-gray-700 cursor-auto transition duration-500 ease-in-out  transform hover:-translate-y-2 hover:scale-110">
              <Link to={`/edit/${post.id}`}>
                Title: {post.title} ||
                <div className=" inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-bold text-gray-700 mr-2 mb-2">
                  {post.category?.title}
                </div>
              </Link>
            </h3>
            <div className="block mb-2 text-sm font-bold text-gray-700">
              Author: {post.user.user.first_name} {post.user.user.last_name}
            </div>
            <div className="block mb-2 text-sm font-bold text-gray-700">
              Posted on: {time}
            </div>
          </div>
        </div>
        <div>
          <h5 className="w-full rounded-md mt-4 inline-block bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700 mr-2 mb-2">
            <div className="block mb-2 font-extrabold text-gray-700">
              Description:
            </div>
            {post.description}
          </h5>
        </div>

        <div className="flex items-center justify-center">
          {postIsSaved ? (
            <button
              className="m-8 py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
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
