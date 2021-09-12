import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { PostContext } from "./PostProvider";

export const PostDetail = ({ post }) => {
  const { posts, getPosts, deletePost } = useContext(PostContext);

  return (
    <section className="post">
      <div>
        <Link to={`/posts/${post.id}`}>
          <img
            className="profile_image"
            //   src={post.user.image_url}
            //   src={require("./images/profilepic.jpg")}
            src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            alt="profile picture"
          ></img>
        </Link>
      </div>{" "}
      <h3 className="post__title">
        <Link to={`/edit/${post.id}`}>{post.title}</Link>
      </h3>
      <div className="post__author">
        Author: {post.user.user.first_name} {post.user.user.last_name}
      </div>
      <div>
        <h3>Description:</h3>
        <h5>{post.description}</h5>
      </div>
      <img
        className="post_image"
        src="https://www.aihr.com/wp-content/uploads/Learning-and-development.png"
        alt="picture"
      ></img>
      <div className="post__category">Category: {post.category?.title}</div>
      {/* <Link to={`/posts/${post.id}`}>Comments</Link> */}
      <button className="btn delete__btn" onClick={() => deletePost(post.id)}>
        Delete
      </button>
    </section>
  );
};
