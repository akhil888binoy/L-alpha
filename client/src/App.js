import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import LandingPage from "scenes/landingPage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";
import EventDetailsPage from "scenes/eventdetailsPage";
import MainLandingPage from "scenes/MainLandingPage";
import MainFooter from "scenes/MainFooter";
import EventForm from "scenes/eventForm";
import DeletePage from "scenes/deletePage";
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline></CssBaseline>
          <Routes>
            <Route
              path="/"
              element={<MainLandingPage></MainLandingPage>}
            ></Route>
            <Route path="/login" element={<LoginPage></LoginPage>}></Route>
            <Route
              path="/home"
              element={isAuth ? <HomePage /> : <Navigate to="/" />}
            />
            <Route
              path="/eventForm"
              element={isAuth ? <EventForm /> : <Navigate to="/" />}
            />
            <Route
              path="/events/:eventId/event"
              element={isAuth ? <EventDetailsPage /> : <Navigate to="/" />}
            />
            <Route
              path="/profile/:userId"
              element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
            />
            <Route
              path="/deletePage"
              element={isAuth ? <DeletePage /> : <Navigate to="/" />}
            />
          </Routes>
          <MainFooter></MainFooter>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
