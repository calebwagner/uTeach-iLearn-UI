import React, { useContext, useEffect } from "react";
import { UserContext } from "./UserProviders";
import { UserDetail } from "./UserDetail";

export const UserList = () => {
  const { users, getUsers } = useContext(UserContext);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <section className="space-y-6 pb-8 m-4 p-4">
      {users.map((user) => {
        return <UserDetail key={user.id} user={user} />;
      })}
    </section>
  );
};
