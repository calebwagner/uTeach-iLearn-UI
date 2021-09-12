import React from "react";
import { Route } from "react-router-dom";
import { CategoryProvider } from "./categories/CategoryProvider";
import { UpdatePost } from "./posts/PostEdit";
import { PostForm } from "./posts/PostForm";
import { PostList } from "./posts/PostList";
import { PostProvider } from "./posts/PostProvider";

export const ApplicationViews = () => {
  return (
    <>
      <PostProvider>
        <CategoryProvider>
          <Route exact path="/create">
            <PostForm />
          </Route>

          <Route exact path="/edit/:postId">
            <UpdatePost />
          </Route>

          <Route exact path="/">
            <PostList />
          </Route>
        </CategoryProvider>
      </PostProvider>
    </>
  );
};
