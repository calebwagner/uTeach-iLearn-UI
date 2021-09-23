import React from "react";

export const ConnectionDetail = ({ connection }) => {
  return (
    <div>
      <section className=" flex bg-white rounded-xl shadow-md overflow-hidden ">
        <img
          className="inline object-cover w-12 h-12 mr-2 rounded-full"
          src={connection.profile.image_url}
          alt="profile"
        ></img>
        <div className="text-lg font-bold">
          {connection.profile.user.first_name}{" "}
          {connection.profile.user.last_name}
        </div>
      </section>
    </div>
  );
};
