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
        Authorization: `Token ${localStorage.getItem("uteachilearn_token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meeting),
    }).then(setMeetings);
  };

  const deleteMeeting = (meetingId) => {
    return fetch(`http://localhost:8000/meeting/${meetingId}`, {
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
