import React, { useContext, useEffect } from "react";
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
    <section className="space-y-6 pb-8 static mt-12 ">
      <div className="float-right w-1/4 fixed top-0 right-0 z-50 col-span-3 m-6">
        <MessageForm />
      </div>
      {messages.map((message) => {
        return <MessageDetail key={message.id} message={message} />;
      })}
    </section>
  );
};
