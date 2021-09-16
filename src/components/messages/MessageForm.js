import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../users/UserProviders";
import { MessageContext } from "./MessageProvider";

export const MessageForm = () => {
  const { sendMessage } = useContext(MessageContext);
  const { getUsers, users } = useContext(UserContext);

  const [currentMessage, setCurrentMessage] = useState({
    title: "",
    description: "",
    timestamp: "",
    read: false,
    recipient: 0,
  });

  useEffect(() => {
    getUsers();
  }, []);

  const changeMessageState = (event) => {
    const newMessageState = { ...currentMessage };
    newMessageState[event.target.name] = event.target.value;
    setCurrentMessage(newMessageState);
  };

  return (
    <form className="message_form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="postForm__title mb-4">Create Message</h2>
      <fieldset>
        <div className="form-group mb-4">
          <label htmlFor="name block text-gray-700 text-sm font-bold mb-2">
            Title of Message:
          </label>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            placeholder="messages ..."
            value={currentMessage.title}
            onChange={changeMessageState}
          />
        </div>
        <div className="form-group mb-4">
          <label htmlFor="description">Write your description here:</label>
          <input
            type="text"
            name="description"
            required
            autoFocus
            className="form-control form-control shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={currentMessage.description}
            onChange={changeMessageState}
          ></input>
        </div>
        <div className="form-group mb-4">
          <label htmlFor="post_category">Users:</label>
          <select
            value={currentMessage.recipient}
            name="recipient"
            id="recipient"
            className="mb-2 tracking-wide form-control form-control shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            onChange={changeMessageState}
          >
            <option value="0">Select recipient here</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.user.first_name} {user.user.last_name}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <button
        type="submit"
        className="m-8 py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        onClick={(evt) => {
          evt.preventDefault();
          let timestamp = Date.now();
          const message = {
            title: currentMessage.title,
            description: currentMessage.description,
            recipient: parseInt(currentMessage.recipient),
            read: currentMessage.read,
            // read: false,
            timestamp: timestamp,
          };

          sendMessage(message);
          setCurrentMessage({
            title: "",
            description: "",
            timestamp: "",
            read: false,
            recipient: 0,
          });
        }}
      >
        Create
      </button>
      {/* <button
        className="py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        onClick={() => history.push("/messages")}
      >
        Cancel
      </button> */}
    </form>
  );
};
