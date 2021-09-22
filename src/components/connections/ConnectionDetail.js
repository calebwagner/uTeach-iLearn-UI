import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";

export const ConnectionDetail = ({ connection }) => {
  //   const { getConnections } = useContext(ConnectionContext);
  const history = useHistory();

  console.log(connection.user.image_url);

  return (
    <div>
      <section className=" flex bg-white rounded-xl shadow-md overflow-hidden ">
        {/* <div>{connection.user.image_url}</div> */}

        <img
          className="rounded-full mr-6 object-scale-dow md:w-12 cursor-auto transition duration-500 ease-in-out  transform hover:-translate-y-2 hover:scale-110"
          src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
          alt="profile picture"
        ></img>
        <div>
          {connection.profile.user.first_name}{" "}
          {connection.profile.user.last_name}
        </div>
      </section>
    </div>
  );
};
