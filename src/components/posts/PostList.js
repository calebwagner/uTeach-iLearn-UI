import React, { useContext, useEffect } from "react";
import { PostContext } from "./PostProvider";
import { PostDetail } from "./PostDetail";
import { PostForm } from "./PostForm";
import "tailwindcss/tailwind.css";

export const PostList = () => {
  const { posts, getPosts } = useContext(PostContext);

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section className="space-y-6 pb-8 mt-12">
      <div className="float-right w-1/4 fixed top-0 right-0 z-50 col-span-3 m-6">
        <PostForm />
      </div>
      {posts.map((post) => {
        return <PostDetail key={post.id} post={post} />;
      })}
    </section>
  );
};
