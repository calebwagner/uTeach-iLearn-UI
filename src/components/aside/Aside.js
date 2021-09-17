import React from "react";
import { Link } from "react-router-dom";

import "./Aside.css";

export const Aside = () => {
  return (
    <section className="absolute left-0 top-0  space-y-6 bg-white mt-4 ml-4">
      <div>
        <div className="block p-4 text-grey-darker font-bold ">
          <Link to={`/`}>uTeachiLearn</Link>
        </div>
        <div className="block p-4 text-grey-darker font-bold ">
          <Link to={`/categories`}>Categories</Link>
        </div>
        <div className="block p-4 text-grey-darker font-bold ">
          <Link to={`/messages`}>Messages</Link>
        </div>
        <div className="block p-4 text-grey-darker font-bold ">
          <Link to={`/profile`}>Profile</Link>
        </div>
        <div className="block p-4 text-grey-darker font-bold ">
          <Link to={`/users`}>Users</Link>
        </div>
        <div>
          <Link
            to="/login"
            className="block p-4 text-grey-darker font-bold "
            onClick={(event) => {
              localStorage.removeItem("uteachilearn_token");
            }}
          >
            Logout
          </Link>
        </div>
      </div>
    </section>
  );
};
