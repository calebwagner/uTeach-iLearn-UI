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
          className="inline object-cover w-12 h-12 mr-2 rounded-full"
          src={connection.profile.image_url}
          //   src="https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg"
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
