import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light",
  user: null,
  token: null,
  events: [],
  sponsors: [],
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      if (state.user) {
        state.user.friends = action.payload.friends;
      } else {
        console.error("user friends none-exsistent:(");
      }
    },
    setEvents: (state, action) => {
      state.events = action.payload.events;
    },
    setSponsors: (state, action) => {
      state.sponsors = action.payload.sponsors;
    },
    setSponsor: (state, action) => {
      const updatedSponsors = state.sponsors.sponsors.map((sponsor) => {
        if (sponsor._id === action.payload.sponsor._id)
          return action.payload.sponsor;
        return sponsor;
      });
      state.sponsors.sponsors = updatedSponsors;
    },
    setEvent: (state, action) => {
      const updatedEvents = state.events.events.map((event) => {
        if (event._id === action.payload.event._id) return action.payload.event;
        return event;
      });
      state.events.events = updatedEvents;
      console.log(updatedEvents);
    },
  },
});
export const {
  setMode,
  setLogin,
  setLogout,
  setEvent,
  setEvents,
  setFriends,
  setSponsor,
  setSponsors,
} = authSlice.actions;
export default authSlice.reducer;
