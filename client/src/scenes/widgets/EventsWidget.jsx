import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "state";
import EventWidget from "./EventWidget";
import Search from "components/Search";
import Sort from "components/Sort";
import Theme from "components/Theme";
import CustomPagination from "components/CustomPagination";

const EventsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const token = useSelector((state) => state.token);
  const [sort, setSort] = useState({ sort: "date", order: "desc" });
  const [filterTheme, setFilterTheme] = useState([]);
  const [filterLocation, setFilterLocation] = useState(""); // State for location filter
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const getEvents = async () => {
    try {
      const filterThemeString = filterTheme.join(",");

      const response = await fetch(
        `http://localhost:3001/events?page=${page}&sort=${sort.sort},${sort.order}&theme=${filterThemeString}&search=${search}&location=${filterLocation}`, // Include location in the API request
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = await response.json();

      dispatch(setEvents({ events: data }));
    } catch (error) {
      console.error("Error fetching events:", error);
    }
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
  }, [sort, filterTheme, filterLocation, page, search]); // Include filterLocation in the dependency array

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(1); // Reset page to 1 when sorting changes
  };

  const handleFilterThemeChange = (newFilterTheme) => {
    setFilterTheme(newFilterTheme);
    setPage(1); // Reset page to 1 when filter changes
  };

  const handleFilterLocationChange = (newLocation) => { // Function to handle location filter change
    setFilterLocation(newLocation);
    setPage(1); // Reset page to 1 when location filter changes
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      {Array.isArray(events.events) &&
        events.events.map(
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
      <CustomPagination
        page={page}
        limit={events.limit ? events.limit : 0}
        total={events.total ? events.total : 0}
        setPage={handlePageChange}
      />
      <Sort sort={sort} setSort={handleSortChange} />
     
      <Search
        value={filterLocation}
        onChange={handleFilterLocationChange}
        placeholder="Search by Location"
      />
       <Theme
        filterTheme={filterTheme}
        themes={events.themes ? events.themes : []}
        setFilterTheme={handleFilterThemeChange}
      />
    </>
  );
};

export default EventsWidget;
