import React, { useContext, useEffect } from "react";
import { Meetings } from "./MeetingDetail";
import { MeetingContext } from "./MeetingProvider";

export const MeetingList = () => {
  const { getMeetings, meetings } = useContext(MeetingContext);

  useEffect(() => {
    getMeetings();
  }, []);

  return (
    <>
      <section>
        <div className="categories_list space-y-6 pb-8 ">
          {meetings.map((meeting) => {
            return <Meetings key={meeting.id} meeting={meeting} />;
          })}
        </div>
      </section>
    </>
  );
};
