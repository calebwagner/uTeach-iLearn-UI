import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PostContext } from "./PostProvider";
import "tailwindcss/tailwind.css";
import "./css/PostDetail.css";
import { ProfileContext } from "../profile/ProfileProvider";

export const PostDetail = ({ post }) => {
  const { posts, getPosts, deletePost } = useContext(PostContext);
  const { getProfileById, getProfile } = useContext(ProfileContext);
  const { profileId } = useParams();

  const [profile, setProfile] = useState({});

  useEffect(() => {
    getProfileById(parseInt(profileId)).then(setProfile);
  }, []);

  //   useEffect(() => {
  //     getProfile();
  //   }, []);

  return (
    <section className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex-shrink-0">
        <div className="flex">
          {/* TODO: */}
          <Link to={`/userprofile/${profileId}`}>
            <img
              className="h-48 w-16 object-scale-down	 md:w-48"
              //   src={post.user.image_url}
              //   src={require("./images/profilepic.jpg")}
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              alt="profile picture"
            ></img>
          </Link>
          <div className="space-y-4">
            <h3 className="">
              <Link to={`/edit/${post.id}`}>
                Title: {post.title} ||
                <div className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                  {post.category?.title}
                </div>
              </Link>
            </h3>
            <div className="inline-">
              Author: {post.user.user.first_name} {post.user.user.last_name}
            </div>
            <div>Date: {post.created_on}</div>
          </div>
        </div>
        <div>
          <h5>Description: {post.description}</h5>
        </div>
        {/* <img
          className="h-48 w-full object-cover md:w-48"
          src="https://www.aihr.com/wp-content/uploads/Learning-and-development.png"
          alt="picture"
        /> */}
        {/* <Link to={`/posts/${post.id}`}>Comments</Link> */}
        <div className="flex items-center justify-center">
          <button className="m-8 py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75">
            Save
          </button>
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
