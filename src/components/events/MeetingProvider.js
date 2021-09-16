import React, { useState } from "react";

export const MeetingContext = React.createContext();

export const MeetingProvider = (props) => {
  const [meetings, setMeetings] = useState([]);

  const getMeetings = () => {
    return fetch("http://localhost:8000/meetings", {
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
    })
      .then((response) => response.json())
      .then(setMeetings);
  };

  const createMeeting = (meeting) => {
    return fetch("http://localhost:8000/meetings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
      body: JSON.stringify(meeting),
    }).then(getMeetings);
  };

  const deleteMeeting = (meetingId) => {
    return fetch(`http://localhost:8000/meetings/${meetingId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
      },
    }).then(getMeetings);
  };

  return (
    <MeetingContext.Provider
      value={{ meetings, getMeetings, createMeeting, deleteMeeting }}
    >
      {props.children}
    </MeetingContext.Provider>
  );
};
