import React, { useContext, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ConnectionContext } from "../connections/ConnectionProvider";
import { MeetingContext } from "./MeetingProvider";

export const MeetingForm = () => {
  const { createMeeting } = useContext(MeetingContext);
  const { getConnections, connections } = useContext(ConnectionContext);
  const history = useHistory();

  const [currentMeeting, setCurrentMeeting] = useState({
    connection: 0,
    description: "",
    created_on: "",
    scheduled_date: "",
  });

  useEffect(() => {
    getConnections();
  }, []);

  const refreshPage = () => {
    window.location.reload();
  };

  const changeMeetingState = (event) => {
    const newMeetingState = { ...currentMeeting };
    newMeetingState[event.target.name] = event.target.value;
    setCurrentMeeting(newMeetingState);
  };

  return (
    <form className="message_form bg-white shadow-md rounded p-4">
      <h2 className="postForm__title mb-4 font-extrabold text-2xl">
        Schedule Meeting
      </h2>
      <fieldset>
        <div className="form-group mb-4">
          <div className="form-group block mb-2 text-sm font-bold text-gray-700">
            <label htmlFor="description">Description:</label>
          </div>
          <input
            type="text"
            name="description"
            required
            autoFocus
            className="form-control w-2/3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={currentMeeting.description}
            onChange={changeMeetingState}
          ></input>
        </div>
        <div className="form-group mb-4">
          <div className="form-group block mb-2 text-sm font-bold text-gray-700">
            <label htmlFor="post_category">Users:</label>
          </div>
          <select
            value={currentMeeting.connection}
            name="connection"
            id="connection"
            className="w-2/3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={changeMeetingState}
          >
            <option value="select">Select connection here</option>
            {connections.map((connection) => (
              <option key={connection.id} value={connection.id}>
                {connection.profile.user.first_name}
                {connection.profile.user.last_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-4">
          <div className="form-group block mb-2 text-sm font-bold text-gray-700">
            <label htmlFor="description">Date:</label>
          </div>
          <input
            type="test"
            name="scheduled_date"
            required
            autoFocus
            placeholder="MM/DD/YY"
            className="form-control w-2/3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={currentMeeting.scheduled_date}
            onChange={changeMeetingState}
          ></input>
        </div>
      </fieldset>

      <button
        type="submit"
        className="m-8 py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        onClick={(evt) => {
          evt.preventDefault();
          let timestamp = Date.now();
          const meeting = {
            connection: parseInt(currentMeeting.connection),
            description: currentMeeting.description,
            created_on: timestamp,
            scheduled_date: currentMeeting.scheduled_date,
          };

          createMeeting(meeting);
          setCurrentMeeting({
            connection: 0,
            description: "",
            created_on: "",
            scheduled_date: "",
          });
        }}
      >
        Create
      </button>
      <button
        className="cancel_post py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        onClick={refreshPage}
      >
        Cancel
      </button>
    </form>
  );
};
