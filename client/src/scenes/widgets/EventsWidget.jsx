import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "state";
import EventWidget from "./EventWidget";

const EventsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const token = useSelector((state) => state.token);
  
  const getEvents = async () => {
    const response = await fetch("http://localhost:3001/events", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setEvents({ events: data }));
  };

  const getUserEvents = async () => {
    const response = await fetch(
      `http://localhost:3001/events/${userId}/events`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setEvents({ events: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserEvents();
    } else {
      getEvents();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {Array.isArray(events) &&
        events.map(
          ({
            _id,
            userId,
            firstName,
            lastName,
            eventName,
            date,
            eventLocation,
            email,
            eventPhoneNumber,
            description,
            theme,
            location,
            bannerpicturePath,
            logopicturePath,
            userPicturePath,
            ticketSold,
            marketingPlans,
            likes,
          }) => (
            <EventWidget
              key={_id}
              eventId={_id}
              eventUserId={userId}
              name={`${firstName} ${lastName}`}
              eventName={eventName}
              date={date}
              eventLocation={eventLocation}
              email={email}
              eventPhoneNumber={eventPhoneNumber}
              description={description}
              theme={theme}
              location={location}
              bannerpicturePath={bannerpicturePath}
              logopicturePath={logopicturePath}
              userPicturePath={userPicturePath}
              ticketSold={ticketSold}
              marketingPlans={marketingPlans}
              likes={likes}
            />
          )
        )}
    </>
  );
};

export default EventsWidget;
