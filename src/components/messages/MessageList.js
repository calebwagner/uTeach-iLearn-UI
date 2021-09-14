import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { UserContext } from "../users/UserProviders";
import { MessageDetail } from "./MessageDetail";
import { MessageForm } from "./MessageForm";
import { MessageContext } from "./MessageProvider";

export const MessageList = () => {
  const { messages, getMessages } = useContext(MessageContext);

  const currentUserId = parseInt(localStorage.getItem("uteachilearn_token"));

  useEffect(() => {
    getMessages();
  }, []);

  const filteredMsgByUserId = messages.filter(
    (message) => currentUserId === message.recipient.user.id
  );

  return (
    <section className="space-y-6 pb-8">
      <div className="float-right w-1/4 sticky top-0 z-50 col-span-3 ">
        <MessageForm />
      </div>
      {filteredMsgByUserId.map((message) => {
        return <MessageDetail key={message.id} message={message} />;
      })}
    </section>
  );
};
