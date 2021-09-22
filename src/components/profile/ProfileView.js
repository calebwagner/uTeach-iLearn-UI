import React, { useEffect, useContext } from "react";
import { MeetingForm } from "../events/MeetingForm.js";
import { MeetingList } from "../events/MeetingList.js";
import { Profile } from "./Profile.js";
// import { HumanDate } from "../utils/HumanDate.js";

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
    </article>
  );
};
