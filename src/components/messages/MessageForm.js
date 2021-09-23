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

  const refreshPage = () => {
    window.location.reload();
  };

  const changeMessageState = (event) => {
    const newMessageState = { ...currentMessage };
    newMessageState[event.target.name] = event.target.value;
    setCurrentMessage(newMessageState);
  };

  return (
    <form className="message_form bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 mt-6">
      <h2 className="postForm__title mb-4 font-extrabold text-2xl">
        Create Message
      </h2>
      <fieldset>
        <div className="form-group mb-2 block text-sm font-bold text-gray-700">
          <div>
            <label htmlFor="name block text-gray-700 text-sm font-bold mb-2 ">
              Title of Message:
            </label>
          </div>
          <input
            type="text"
            name="title"
            required
            autoFocus
            className="form-control w-2/3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            placeholder="messages ..."
            value={currentMessage.title}
            onChange={changeMessageState}
          />
        </div>
        <div className="form-group mb-2 block text-sm font-bold text-gray-700">
          <div>
            <label htmlFor="description">Write your description here:</label>
          </div>
          <textarea
            type="text"
            name="description"
            required
            autoFocus
            rows="5"
            placeholder="description of your message ..."
            className="form-control w-2/3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={currentMessage.description}
            onChange={changeMessageState}
          />
        </div>
        <div className="form-group mb-2 block text-sm font-bold text-gray-700">
          <div>
            <label htmlFor="post_category">Users:</label>
          </div>
          <select
            value={currentMessage.recipient}
            name="recipient"
            id="recipient"
            className="form-control w-2/3 shadow appearance-none border rounded  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
        className=" py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        onClick={(evt) => {
          evt.preventDefault();
          let timestamp = Date.now();
          const message = {
            title: currentMessage.title,
            description: currentMessage.description,
            recipient: parseInt(currentMessage.recipient),
            read: currentMessage.read,
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
      <button
        className="m-8 py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        onClick={refreshPage}
      >
        Cancel
      </button>
    </form>
  );
};
