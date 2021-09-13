import React from "react";
import { Link } from "react-router-dom";

import "./Aside.css";

export const Aside = () => {
  return (
    <section className="space-y-6 pb-8 sticky top-0 z-50 bg-white shadow w-64 my-2 m-8">
      <div>
        <div className="block p-4 text-grey-darker font-bold border-purple hover:bg-grey-lighter border-r-4">
          <Link>uTeachiLearn</Link>
        </div>
        <div className="block p-4 text-grey-darker font-bold border-purple hover:bg-grey-lighter border-r-4">
          <Link>Categories</Link>
        </div>
        <div className="block p-4 text-grey-darker font-bold border-purple hover:bg-grey-lighter border-r-4">
          <Link to={`/messages`}>Messages</Link>
        </div>
        <div className="block p-4 text-grey-darker font-bold border-purple hover:bg-grey-lighter border-r-4">
          <Link>Profile</Link>
        </div>
      </div>
    </section>
  );
};
