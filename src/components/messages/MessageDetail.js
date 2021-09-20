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
    <section className="p-8 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex-shrink-0">
        <div className="flex">
          <Link to={`/posts/${message.id}`}>
            <img
              className="h-48 w-16 object-scale-down	 md:w-48"
              //   src={post.user.image_url}
              //   src={require("./images/profilepic.jpg")}
              src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
              alt="profile picture"
            ></img>
          </Link>
          <div className="space-y-4">
            <h3 className="">Title: {message.title}</h3>
            <div className="inline-">
              From: {message.user.user.first_name}
              {message.user.user.last_name}
            </div>
            <div>Message Received on: {time}</div>
            <div>
              Recipient:
              {message.recipient.user.first_name}
              {message.recipient.user.last_name}
            </div>
          </div>
        </div>
        <div>
          <h5>Description: {message.description}</h5>
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
