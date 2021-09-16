import React, { useContext, useEffect } from "react";
import { PostContext } from "./PostProvider";
import { PostDetail } from "./PostDetail";
import { useHistory } from "react-router-dom";
import "tailwindcss/tailwind.css";

export const PostList = () => {
  const { posts, getPosts } = useContext(PostContext);
  const history = useHistory();

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section className="space-y-6 pb-8">
      <div className="flex items-center justify-center pb-8">
        <button
          className=" py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          onClick={() => history.push("/create")}
        >
          Create Post
        </button>
      </div>
      {posts.map((post) => {
        return <PostDetail key={post.id} post={post} />;
      })}
    </section>
  );
};
