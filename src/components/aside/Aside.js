import React from "react";
import { Link } from "react-router-dom";

import "./Aside.css";

export const Aside = () => {
  return (
    <section className="rounded-lg absolute left-0 top-0  space-y-6 bg-white mt-4 ml-4 w-2/12 ">
      <div className="">
        <div className=" hover:bg-green-100 block p-4 text-grey-darker font-bold ">
          <Link to={`/`}>uTeachiLearn</Link>
        </div>
        <div className=" hover:bg-green-100 block p-4 text-grey-darker font-bold ">
          <Link to={`/categories`}>Categories</Link>
        </div>
        <div className=" hover:bg-green-100 block p-4 text-grey-darker font-bold ">
          <Link to={`/messages`}>Messages</Link>
        </div>
        <div className="hover:bg-green-100 block p-4 text-grey-darker font-bold ">
          <Link to={`/profile`}>Profile</Link>
        </div>
        <div className="hover:bg-green-100 block p-4 text-grey-darker font-bold ">
          <Link to={`/users`}>Users</Link>
        </div>
        <div>
          <Link
            to="/login"
            className=" hover:bg-red-300 block p-4 text-grey-darker font-bold "
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
