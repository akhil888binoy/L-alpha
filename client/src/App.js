import React, { useMemo, lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "theme";

const HomePage = lazy(() => import("scenes/homePage"));
const LoginPage = lazy(() => import("scenes/loginPage"));
const ProfilePage = lazy(() => import("scenes/profilePage"));
const LandingPage = lazy(() => import("scenes/landingPage"));
const MainFooter = lazy(() => import("scenes/MainFooter"));
const EventDetailsPage = lazy(() => import("scenes/eventdetailsPage"));
const EventForm = lazy(() => import("scenes/eventForm"));
const DeletePage = lazy(() => import("scenes/deletePage"));
const EditForm = lazy(() => import("scenes/editForm"));
const SponsorHomePage = lazy(() => import("scenes/sponsorhomePage"));
const LikedPage = lazy(() => import("scenes/likedPage"));
const SponsorProfilePage = lazy(() => import("scenes/sponsorprofilePage"));
const SponsorForm = lazy(() => import("scenes/sponsorForm"));
const SponsorDeletePage = lazy(() => import("scenes/sponsordeletePage"));
const SponsorDetailPage = lazy(() => import("scenes/sponsordetailPage"));
const SponsorEditForm = lazy(() => import("scenes/sponsoreditForm"));
const AboutUsPage = lazy(() => import("scenes/aboutusPage"));
const PaymentSuccessPage = lazy(() => import("scenes/paymentSuccess"));
const PaymentCancelPage = lazy(() => import("scenes/paymentCancel"));
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/aboutus" element={<AboutUsPage />} />
              <Route
                path="/home"
                element={isAuth ? <HomePage /> : <Navigate to="/" />}
              />
              <Route
                path="/sponsorhome"
                element={isAuth ? <SponsorHomePage /> : <Navigate to="/" />}
              />
              <Route
                path="/eventForm"
                element={isAuth ? <EventForm /> : <Navigate to="/" />}
              />
              <Route
                path="/sponsorForm"
                element={isAuth ? <SponsorForm /> : <Navigate to="/" />}
              />
              <Route
                path="/events/:eventId/event"
                element={isAuth ? <EventDetailsPage /> : <Navigate to="/" />}
              />
              <Route
                path="/sponsors/:sponsorId/sponsor"
                element={isAuth ? <SponsorDetailPage /> : <Navigate to="/" />}
              />
              <Route
                path="/profile/:userId"
                element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
              />
              <Route
                path="/profile/:userId/sponsor"
                element={isAuth ? <SponsorProfilePage /> : <Navigate to="/" />}
              />
              <Route
                path="/deletePage"
                element={isAuth ? <DeletePage /> : <Navigate to="/" />}
              />
              <Route
                path="/sponsordeletePage"
                element={isAuth ? <SponsorDeletePage /> : <Navigate to="/" />}
              />
              <Route
                path="/likedPage"
                element={isAuth ? <LikedPage /> : <Navigate to="/" />}
              />
              <Route
                path="/events/:eventId/edit"
                element={isAuth ? <EditForm /> : <Navigate to="/" />}
              />
              <Route
                path="/sponsors/:sponsorId/edit"
                element={isAuth ? <SponsorEditForm /> : <Navigate to="/" />}
              />
              <Route
                path="/success"
                element={isAuth ? <PaymentSuccessPage /> : <Navigate to="/" />}
              />

              <Route
                path="/cancel"
                element={isAuth ? <PaymentCancelPage /> : <Navigate to="/" />}
              />
            </Routes>
            <MainFooter />
          </Suspense>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
