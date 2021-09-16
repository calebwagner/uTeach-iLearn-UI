import React, { useContext, useEffect } from "react";
import "tailwindcss/tailwind.css";
import { UserContext } from "../users/UserProviders.js";
import { UsersProfileDetail } from "./UsersProfile";

export const UsersProfileList = () => {
  const { users, getUsers } = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className="space-y-6 pb-8">
      {users.map((user) => {
        return <UsersProfileDetail key={user.id} user={user} />;
      })}
    </section>
  );
};
