import React, { useEffect, useContext } from "react";
import { SavedPostList } from "../posts/SavedPostList.js";
import { ProfileContext } from "./ProfileProvider.js";

export const Profile = () => {
  const { profile, getProfile } = useContext(ProfileContext);

  useEffect(() => {
    getProfile();
  }, []);

  //   console.log(profile.app_user.image_url);

  return (
    <div className="">
      <div className="space-y-6 pb-8 m-0 max-w-screen-2xl ">
        <article className="profile p-8 m-0 bg-white rounded-xl shadow-md overflow-hidden  mt-12">
          <header>
            <h1>Your Profile</h1>
          </header>
          <section className="profile__info">
            <img
              className="h-48 w-16 object-scale-down md:w-48"
              src={profile.app_user?.image_url}
              alt="profile picture"
            ></img>
            <div className="profile__name">
              Welcome: {profile?.app_user?.user?.first_name}
              {profile?.app_user?.user?.last_name}
            </div>
            <div className="profile__username">
              Username: {profile?.app_user?.user?.username}
            </div>
            <div className="profile__bio">
              About you: {profile?.app_user?.bio}
            </div>
          </section>
        </article>
        <SavedPostList />
      </div>
    </div>
  );
};
