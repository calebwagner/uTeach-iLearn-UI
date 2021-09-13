import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { Aside } from "./aside/Aside";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import { SearchBar } from "./posts/SearchBar";

export const App = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("uteachilearn_token")) {
          return (
            <>
              <div className="flex col-span-3 sticky top-0 z-50">
                <aside class="col-span-3 sticky top-0 z-50">
                  <Aside />
                </aside>
                <div class="col-span-3 sticky top-0 z-50">
                  <SearchBar />
                </div>
              </div>
              <main class="col-span-8">
                <ApplicationViews />
              </main>
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);
