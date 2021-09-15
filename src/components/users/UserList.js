import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { UserContext } from "./UserProviders";
import { UserDetail } from "./UserDetail";

export const UserList = () => {
  const { users, getUsers } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className="space-y-6 pb-8">
      {users.map((user) => {
        return <UserDetail key={user.id} user={user} />;
      })}
    </section>
  );
};
