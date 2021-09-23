import React from "react";
import { ConnectionList } from "../connections/ConnectionList.js";
import { MeetingForm } from "../events/MeetingForm.js";
import { MeetingList } from "../events/MeetingList.js";
import { Profile } from "./Profile.js";

export const ProfileView = () => {
  return (
    <article className="profile  ">
      <div className="float-right w-1/4  top-0 right-0 z-50 col-span-3 m-6 ">
        <MeetingForm />
        <div className="overflow-y-scroll">
          <MeetingList />
        </div>
      </div>
      <div className="ml-96 max-w-5xl">
        <Profile />
      </div>
      <div className="absolute top-96 left-3 w-1/6">
        <ConnectionList />
      </div>
    </article>
  );
};
