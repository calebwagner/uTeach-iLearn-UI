import React, { useContext } from "react";
import { MeetingContext } from "./MeetingProvider.js";

export const Meetings = ({ meeting }) => {
  const { deleteMeeting } = useContext(MeetingContext);

  return (
    <section className="flex m-8 category p-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex-shrink-0 ">
        <h1 className=" block mb-2 text-lg font-bold text-gray-700">
          Scheduled Meeting
        </h1>
        <div className="block mb-2 text-md font-bold text-gray-700">
          Meeting with: {meeting.connection.profile.user.first_name}
          {meeting.connection.profile.user.last_name}
        </div>
        <div className="block mb-2 text-md font-bold text-gray-700">
          Description: {meeting.description}
        </div>
        <div className="block mb-2 text-md font-bold text-gray-700">
          Contact: {meeting.connection.profile.user.email}
        </div>
        <div className="block mb-2 text-md font-bold text-gray-700">
          Date: {meeting.scheduled_date}
        </div>
        <button
          className="py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
          onClick={() => deleteMeeting(meeting.id)}
        >
          Delete
        </button>
      </div>
      <img
        className="inline object-cover w-24 h-24 mr-2 rounded-full"
        src={meeting.connection.profile.image_url}
      ></img>
    </section>
  );
};
