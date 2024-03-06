import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSponsors } from "state";
import SponsorWidget from "./SponsorWidget";
import {Typography, Button} from "@mui/material";
import {useMediaQuery} from "@mui/material";
import { Box } from "@mui/material";
import SponsorCustomPagination from "components/SponsorCustomPagination";
import SponsorLocationSearch from "components/SponsorLocationSearch";
import SponsorSort from "components/SponsorSort";
import SearchSponsorName from "components/SearchSponsorName";
import InterestedTheme from "components/InterestedTheme";


const SponsorsWidget = ({userId, isProfile=false}) => {
 
    const dispatch = useDispatch();
    const sponsors = useSelector((state) => state.sponsors);
    const token = useSelector((state) => state.token);
    const [sort, setSort] = useState(JSON.parse(localStorage.getItem("sponsorSort")) || { sort: "budget", order: "desc" });
  const [filterInterestedTheme, setFilterInterestedTheme] = useState(JSON.parse(localStorage.getItem("sponsorFilterTheme")) || []);
  const [filterLocation, setFilterLocation] = useState(JSON.parse(localStorage.getItem("sponsorFilterLocation")) || "");
  const [filterSponsorName , setFilterSponsorName] = useState(JSON.parse(localStorage.getItem("sponsorFilterSponsorName")) || "")
  const [page, setPage] = useState(isProfile ? 1 : parseInt(localStorage.getItem("sponsorPage")) || 1);
  const [search, setSearch] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");
  
  const clearFilters = () => {
    setFilterInterestedTheme([]); // Clear filterTheme state
    setFilterLocation(""); // Optionally clear location filter as well
    setFilterSponsorName(""); 
    setPage(1); // Reset page to 1 when filters are cleared
    localStorage.removeItem("sponsorFilterTheme"); // Remove stored filterTheme from localStorage
    localStorage.removeItem("sponsorFilterLocation"); // Optionally remove stored filterLocation as well
    localStorage.removeItem("sponsorFilterSponsorName");
    
  };

  useEffect(() => {
    const getSponsors = async () => {
      try {
        const filterThemeString = filterInterestedTheme.join(",");
  
        const response = await fetch(
          `http://localhost:3001/sponsors?page=${page}&sort=${sort.sort},${sort.order}&interestedtheme=${filterThemeString}&search=${search}&location=${filterLocation}&sponsorName=${filterSponsorName}`, // Include location in the API request
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
  
        const data = await response.json();
  
        dispatch(setSponsors({ sponsors: data }));
      } catch (error) {
        console.error("Error fetching sponsors:", error);
      }
    };
  
    const getUserSponsors = async () => {
      const filterThemeString = filterInterestedTheme.join(",");
      const response = await fetch(
        `http://localhost:3001/sponsors/${userId}/sponsors?page=${page}&sort=${sort.sort},${sort.order}&interestedtheme=${filterThemeString}&search=${search}&location=${filterLocation}&sponsorName=${filterSponsorName}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      dispatch(setSponsors({ sponsors: data }));
    };
  
    if (isProfile) {
      getUserSponsors();
      
    } else {
      getSponsors();
    }
  }, [sort, filterInterestedTheme, filterLocation, filterSponsorName, page, search, userId, isProfile, token]);
  
  const handleSortChange = (newSort) => {
    setSort(newSort);
    setPage(1); // Reset page to 1 when sorting changes
    localStorage.setItem("sponsorSort", JSON.stringify(newSort));
  };
  const handleFilterInterestedThemeChange = (newFilterInterestedTheme) => {
    setFilterInterestedTheme(newFilterInterestedTheme);
    setPage(1); // Reset page to 1 when filter changes
    localStorage.setItem("sponsorFilterTheme", JSON.stringify(newFilterInterestedTheme));
  };
  const handleFilterLocationChange = (newLocation) => {
    setFilterLocation(newLocation);
    setPage(1); // Reset page to 1 when location filter changes
    localStorage.setItem("sponsorFilterLocation", JSON.stringify(newLocation));
  };
  const handleFilterSponsorNameChange = (newSponsorName)=>{
    setFilterSponsorName(newSponsorName);
    setPage(1);
    localStorage.setItem("sponsorFilterSponsorName", JSON.stringify(newSponsorName) );
  }
  const handlePageChange = (newPage) => {
    setPage(newPage);
    localStorage.setItem("sponsorPage", newPage);
   
  };
  return (
    <Box>
    {/* Filters */}
    <Box mt={3}  >
      <Box display={"flex"} gap={ isNonMobile?  7 : 2}>
        <Box>
        <SponsorSort sort={sort} setSort={handleSortChange} />
        </Box>
        <Box textAlign={"center"}>
          <Typography fontSize={isNonMobile? "5rem" : "3rem"} color={"#ffea00"} fontWeight={"bold"}> Loot </Typography>
        </Box>
        <Button  variant="outlined" onClick={clearFilters}>
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
      <SponsorLocationSearch
        value={filterLocation}
        onChange={handleFilterLocationChange}
        placeholder="Search by Location"
      />
     
      </Box>
      <Box mt={2}>
      <SearchSponsorName
        value={filterSponsorName}
        onChange={handleFilterSponsorNameChange}
        placeholder="Search by Sponsor Name"
      />
      </Box>
      
      <Box mt={2}>
      <InterestedTheme
        filterInterestedTheme={filterInterestedTheme}
        interestedthemes={sponsors.interestedthemes ? sponsors.interestedthemes : []}
        setFilterInterestedTheme={handleFilterInterestedThemeChange}
      />
      </Box>
    </Box>
    {/* Event Listings */}
    <Box>
      {Array.isArray(sponsors.sponsors) &&
        sponsors.sponsors.map(
          ({
            _id,
            userId,
            sponsorName,
            location, 
            sponsorphoneNumber,
            sponsorInfo,
            interestedtheme,
            sponsorpicturePath,
            budget,
            industry,
            sponsortwitterLink,
            sponsorlinkedinLink,
            sponsorCoordinator,
            sponsorEmail,
            likes
          }) => (
            <SponsorWidget
              key={_id}
              sponsorId={_id}
              sponsorUserId={userId}     
              sponsorName={sponsorName}
              location={location}
              sponsorEmail={sponsorEmail}
              sponsorphoneNumber={sponsorphoneNumber}
              sponsorInfo={sponsorInfo}
              interestedtheme={interestedtheme}
              sponsorpicturePath={sponsorpicturePath}
              budget={budget}
             industry={industry}
             sponsorCoordinator={sponsorCoordinator}
             sponsortwitterLink={sponsortwitterLink}
             sponsorlinkedinLink={sponsorlinkedinLink}
             likes={likes}
            />
          )
        )}
         <Box display={"flex" } justifyContent={"center"}>
    <SponsorCustomPagination
      page={page}
      limit={sponsors.limit ? sponsors.limit : 0}
      total={sponsors.total ? sponsors.total : 0}
      setPage={handlePageChange}
    />
  </Box>
      
    </Box>
  </Box>
  )
}

export default SponsorsWidget