import React, { useContext, useEffect } from "react";
import { PostContext } from "./PostProvider";
import { PostDetail } from "./PostDetail";
import { PostForm } from "./PostForm";
import { Link, useHistory } from "react-router-dom";

export const PostList = () => {
  const { posts, getPosts } = useContext(PostContext);
  const history = useHistory();

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <section className="posts">
      <button
        className="create_post_btn"
        onClick={() => history.push("/create")}
      >
        Create Post
      </button>
      {posts.map((post) => {
        return <PostDetail key={post.id} post={post} />;
      })}
    </section>
  );
};
