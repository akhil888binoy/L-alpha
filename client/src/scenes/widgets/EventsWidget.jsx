import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEvents } from "state";
import EventWidget from "./EventWidget";
import {Typography, Button} from "@mui/material";
import Search from "components/Search";
import Sort from "components/Sort";
import Theme from "components/Theme";
import {useMediaQuery} from "@mui/material";
import { Box } from "@mui/material";
import CustomPagination from "components/CustomPagination";
import SearchEventName from "components/SearchEventName";


const EventsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const events = useSelector((state) => state.events);
  const token = useSelector((state) => state.token);
  const [sort, setSort] = useState(JSON.parse(localStorage.getItem("eventSort")) || { sort: "date", order: "desc" });
  const [filterTheme, setFilterTheme] = useState(JSON.parse(localStorage.getItem("eventFilterTheme")) || []);
  const [filterLocation, setFilterLocation] = useState(JSON.parse(localStorage.getItem("eventFilterLocation")) || "");
  const [filterEventName , setFilterEventName] = useState(JSON.parse(localStorage.getItem("eventFilterEventName")) || "")
  const [page, setPage] = useState(isProfile ? 1 : parseInt(localStorage.getItem("eventPage")) || 1);
  const [search, setSearch] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");

 
  
  
  const clearFilters = () => {
    setFilterTheme([]); // Clear filterTheme state
    setFilterLocation(""); // Optionally clear location filter as well
    setFilterEventName(""); // Clear Event Name
    setPage(1); // Reset page to 1 when filters are cleared
    localStorage.removeItem("eventFilterTheme"); // Remove stored filterTheme from localStorage
    localStorage.removeItem("eventFilterLocation"); // Optionally remove stored filterLocation as well
    localStorage.removeItem("eventFilterEventName");
    
  };

  useEffect(() => {
    const getEvents = async () => {
      try {
        const filterThemeString = filterTheme.join(",");
  
        const response = await fetch(
          `http://localhost:3001/events?page=${page}&sort=${sort.sort},${sort.order}&theme=${filterThemeString}&search=${search}&location=${filterLocation}&eventName=${filterEventName}`, // Include location in the API request
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
      const filterThemeString = filterTheme.join(",");
      const response = await fetch(
        `http://localhost:3001/events/${userId}/events?page=${page}&sort=${sort.sort},${sort.order}&theme=${filterThemeString}&search=${search}&location=${filterLocation}&eventName=${filterEventName}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setEvents({ events: data }));
    };
  
    if (isProfile) {
      getUserEvents();
      
    } else {
      getEvents();
    }
  }, [sort, filterTheme, filterLocation, filterEventName, page, search, userId, isProfile, token]);
  

  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(1); // Reset page to 1 when sorting changes
    localStorage.setItem("eventSort", JSON.stringify(newSort));
  };

  const handleFilterThemeChange = (newFilterTheme) => {
    setFilterTheme(newFilterTheme);
    setPage(1); // Reset page to 1 when filter changes
    localStorage.setItem("eventFilterTheme", JSON.stringify(newFilterTheme));
  };

  const handleFilterLocationChange = (newLocation) => {
    setFilterLocation(newLocation);
    setPage(1); // Reset page to 1 when location filter changes
    localStorage.setItem("eventFilterLocation", JSON.stringify(newLocation));
  };

  const handleFilterEventNameChange = (newEventName)=>{
    setFilterEventName(newEventName);
    setPage(1);
    localStorage.setItem("eventFilterEventName", JSON.stringify(newEventName) );
  }

  const handlePageChange = (newPage) => {
    setPage(newPage);
    localStorage.setItem("eventPage", newPage);
   
  };

  return (
    <Box>
      {/* Filters */}
      <Box mt={3}  >
        <Box display={"flex"} gap={ isNonMobile?  7 : 2}>
          <Box>
          <Sort sort={sort} setSort={handleSortChange} />
          </Box>
          <Box textAlign={"center"}>
            <Typography fontSize={isNonMobile? "5rem" : "3rem"} color={"primary"} fontWeight={"bold"}> Loot </Typography>
          </Box>
          <Button variant="outlined" onClick={clearFilters}>
            <Box>
            <Box>
            <Typography fontSize={"1.5rem"}>  Clear </Typography>
            </Box>
            <Box>
            <Typography>Filters</Typography>
            </Box>
            </Box>
           
         
          
          </Button>

        </Box>
        <Box mt={2}>
        <Search
          value={filterLocation}
          onChange={handleFilterLocationChange}
          placeholder="Search by Location"
        />
       
        </Box>
        <Box mt={2}>
        <SearchEventName
          value={filterEventName}
          onChange={handleFilterEventNameChange}
          placeholder="Search by Event Name"
        />
        </Box>
        
        <Box mt={2}>
        <Theme
          filterTheme={filterTheme}
          themes={events.themes ? events.themes : []}
          setFilterTheme={handleFilterThemeChange}
        />
        </Box>
      </Box>
      {/* Event Listings */}
      <Box>
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
           <Box display={"flex" } justifyContent={"center"}>
      <CustomPagination
        page={page}
        limit={events.limit ? events.limit : 0}
        total={events.total ? events.total : 0}
        setPage={handlePageChange}
      />
    </Box>
        
      </Box>
    </Box>
  );
};

export default EventsWidget;
