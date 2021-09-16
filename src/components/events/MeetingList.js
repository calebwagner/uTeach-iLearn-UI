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
        <div className="categories_list space-y-6 pb-8">
          {/* <div lassName="float-right w-1/4 sticky top-0 z-50 col-span-3 "> */}
          {meetings.map((meeting) => {
            return <Meetings key={meeting.id} meeting={meeting} />;
          })}
        </div>
      </section>
    </>
  );
};
