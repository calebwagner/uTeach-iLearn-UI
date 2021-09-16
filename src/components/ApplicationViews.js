import React from "react";
import { Route } from "react-router-dom";
import { AuthorProvider } from "./authors/AuthorProvider";
import { UpdateCategory } from "./categories/CategoryEdit";
import { CategoryList } from "./categories/CategoryList";
import { CategoryProvider } from "./categories/CategoryProvider";
import { ConnectionProvider } from "./connections/ConnectionProvider";
import { MeetingProvider } from "./events/MeetingProvider";
import { MessageList } from "./messages/MessageList";
import { MessageProvider } from "./messages/MessageProvider";
import { UpdatePost } from "./posts/PostEdit";
import { PostForm } from "./posts/PostForm";
import { PostList } from "./posts/PostList";
import { PostProvider } from "./posts/PostProvider";
// import { Profile } from "./profile/Profile";
import { ProfileProvider } from "./profile/ProfileProvider";
import { ProfileView } from "./profile/ProfileView";
// import { UserProfile } from "./profile/UsersProfile";
import { UsersProfileList } from "./profile/UsersProfileList";
import { UserList } from "./users/UserList";
// import { UserProfileList } from "./profile/UserProfileList";
import { UserProvider } from "./users/UserProviders";

export const ApplicationViews = () => {
  return (
    <>
      <PostProvider>
        <CategoryProvider>
          <MessageProvider>
            <UserProvider>
              <ProfileProvider>
                <ConnectionProvider>
                  <MeetingProvider>
                    <AuthorProvider>
                      <Route exact path="/create">
                        <PostForm />
                      </Route>

                      <Route exact path="/edit/:postId">
                        <UpdatePost />
                      </Route>

                      <Route exact path="/">
                        <PostList />
                      </Route>

                      <Route exact path="/messages">
                        <MessageList />
                      </Route>

                      <Route exact path="/categories">
                        <CategoryList />
                      </Route>

                      <Route exact path="/categories/edit/:categoryId">
                        <UpdateCategory />
                      </Route>

                      {/* <Route exact path="/userprofile/:profileId">
                        <UserProfile />
                      </Route> */}

                      <Route exact path="/profile">
                        <ProfileView />
                      </Route>

                      <Route exact path="/authors/profile/:profileId">
                        <UsersProfileList />
                      </Route>

                      <Route exact path="/users">
                        <UserList />
                      </Route>
                    </AuthorProvider>
                  </MeetingProvider>
                </ConnectionProvider>
              </ProfileProvider>
            </UserProvider>
          </MessageProvider>
        </CategoryProvider>
      </PostProvider>
    </>
  );
};
