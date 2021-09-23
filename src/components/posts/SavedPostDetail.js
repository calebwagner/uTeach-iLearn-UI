import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { AuthorContext } from "../authors/AuthorProvider";
import { ConnectionContext } from "../connections/ConnectionProvider";
import { ProfileContext } from "../profile/ProfileProvider";
import { PostContext, PostProvider } from "./PostProvider";
import { SavedPostContext } from "./SavedPostsProvider";
import { HumanDate } from "../utils/HumanDate";

export const SavedPostDetail = ({ savedPost }) => {
  const { unsavePost } = useContext(SavedPostContext);
  const { getPosts, posts } = useContext(PostContext);

  const history = useHistory();

  useEffect(() => {
    getPosts();
  }, []);

  const unsaveThePost = () => {
    unsavePost(savedPost.id).then(() => {
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

  return (
    <section className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl ">
      <div className="md:flex-shrink-0">
        <div className="flex space-y-4">
          <img
            className="inline object-cover w-24 h-24 mr-2 rounded-full cursor-auto transition duration-500 ease-in-out  transform hover:-translate-y-2 hover:scale-110"
            src={savedPost.post.user.image_url}
            alt="profile picture"
          ></img>
          <div className="">
            <h3 className="post_title_link rounded-full  block mb-2 text-sm font-extrabold text-gray-700 ">
              Title: {savedPost.post?.title} ||
              <div className=" inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-bold text-gray-700 mr-2 mb-2">
                {savedPost.post?.category?.title}
              </div>
            </h3>
            <div className="block mb-2 text-sm font-bold text-gray-700">
              Author: {savedPost?.post?.user?.user?.first_name}{" "}
              {savedPost?.post?.user?.user?.last_name}
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
            {savedPost?.post?.description}
          </h5>
        </div>

        <div className="flex items-center justify-center">
          <button
            className="py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            onClick={unsaveThePost}
          >
            Unsave
          </button>
        </div>
      </div>
    </section>
  );
};
