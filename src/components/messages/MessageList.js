import React, { useContext, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "tailwindcss/tailwind.css";
import { MessageDetail } from "./MessageDetail";
import { MessageForm } from "./MessageForm";
import { MessageContext } from "./MessageProvider";

export const MessageList = () => {
  const { messages, getMessages } = useContext(MessageContext);

  useEffect(() => {
    getMessages();
  }, []);

  return (
    <section className="space-y-6 pb-8">
      <div>
        <MessageForm />
      </div>
      {messages.map((message) => {
        return <MessageDetail key={message.id} message={message} />;
      })}
    </section>
  );
};
