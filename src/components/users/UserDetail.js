import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { AuthorContext } from "../authors/AuthorProvider";
import { ProfileContext } from "../profile/ProfileProvider";

export const UserDetail = ({ user }) => {
  const { profile, getProfile } = useContext(ProfileContext);
  const { getAuthorById, author } = useContext(AuthorContext);
  const { authorId } = useParams();

  useEffect(() => {
    getAuthorById(authorId);
  }, []);

  return (
    <article className="profile p-8 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <header>
        <h1>
          User: {user?.user?.first_name} {user?.user?.last_name}
        </h1>
      </header>
      <section className="profile__info">
        <img
          className="h-48 w-16 object-scale-down md:w-48"
          //   src={post.user.image_url}
          //   src={require("./images/profilepic.jpg")}
          src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
          alt="profile picture"
        ></img>

        <div className="profile__username">
          Username: {user?.user?.username}
        </div>
        <Link to={`/authors/${user.id}`} className="">
          profile link
        </Link>
        {/* <div className="profile__bio">About: {user?.user?.bio}</div> */}
      </section>
    </article>
  );
};
