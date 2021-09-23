import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { MessageContext } from "./MessageProvider";
import { HumanDate } from "../utils/HumanDate";

export const MessageDetail = ({ message }) => {
  const { deleteMessage, updateMessage } = useContext(MessageContext);
  const [time, setTime] = useState("");

  useEffect(() => {
    if ("timestamp" in message) {
      const time = message.timestamp;
      const converted_time = HumanDate(time);
      setTime(converted_time);
    }
  }, [message]);

  const setMessageToRead = () => {
    updateMessage({
      id: message.id,
      title: message.title,
      description: message.description,
      timestamp: message.timestamp,
      read: true,
      recipient: message.recipient.user.id,
      user: message.user.user.id,
    });
  };

  const setMessageToUnread = () => {
    updateMessage({
      id: message.id,
      title: message.title,
      description: message.description,
      timestamp: message.timestamp,
      read: false,
      recipient: message.recipient.user.id,
      user: message.user.user.id,
    });
  };

  return (
    <section className="p-3 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex-shrink-0 ">
        <div className="flex space-y-4">
          <img
            className=" inline object-cover w-24 h-24 mr-2 rounded-full"
            src={message.recipient.image_url}
            //   src={require("./images/profilepic.jpg")}
            // src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
            alt="profile picture"
          ></img>

          <div className="space-y-4">
            <h3 className="block mb-2  font-extrabold text-gray-700">
              Title: {message.title}
            </h3>
            <div className="block mb-2 text-sm font-bold text-gray-700">
              From: {message.user.user.first_name} {message.user.user.last_name}
            </div>
            <div className="block mb-2 text-sm font-bold text-gray-700">
              Received on: {time}
            </div>
            {/* <div className="block mb-2 text-sm font-bold text-gray-700">
              Recipient: {message.recipient.user.first_name}{" "}
              {message.recipient.user.last_name}
            </div> */}
          </div>
        </div>
        <div>
          <h5 className="w-full rounded-md mt-4 inline-block bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700 mr-2 mb-2">
            <div className="font-extrabold">Description:</div>
            {message.description}
          </h5>
        </div>
        <div className="flex items-center justify-center">
          {message.read ? (
            <button
              className=" m-8 py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
              onClick={setMessageToUnread}
            >
              Unread
            </button>
          ) : (
            <button
              className="connect-btn m-8 py-2 px-4 bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
              onClick={setMessageToRead}
            >
              Read
            </button>
          )}
          <button
            className="py-2 px-4 bg-red-700 text-white font-semibold rounded-lg shadow-md hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
            onClick={() => deleteMessage(message.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
};
