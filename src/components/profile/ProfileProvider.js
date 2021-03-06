import React, { useState } from "react";

export const ProfileContext = React.createContext();

export const ProfileProvider = (props) => {
  const [profile, setProfile] = useState([]);

  const getProfile = () => {
    return fetch("http://localhost:8000/profile", {
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setProfile);
  };

  const getProfileById = (profileId) => {
    return fetch(`http://localhost:8000/profile/${profileId}`, {
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
    })
      .then((res) => res.json())
      .then(setProfile);
  };

  return (
    <ProfileContext.Provider value={{ profile, getProfile, getProfileById }}>
      {props.children}
    </ProfileContext.Provider>
  );
};
