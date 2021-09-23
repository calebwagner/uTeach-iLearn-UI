import React, { useContext, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { SavedPostDetail } from "./SavedPostDetail";
import { SavedPostContext } from "./SavedPostsProvider";

export const SavedPostList = () => {
  const { savedPosts, getSavedPosts } = useContext(SavedPostContext);

  useEffect(() => {
    getSavedPosts();
  }, []);

  return (
    <section className="space-y-6 pb-8 ">
      {savedPosts.map((savedPost) => {
        return <SavedPostDetail key={savedPost.id} savedPost={savedPost} />;
      })}
    </section>
  );
};
