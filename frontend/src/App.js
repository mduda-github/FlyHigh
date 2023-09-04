import * as React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CityDetails } from "./components/city/CityDetails";
import { CityForm } from "./components/city/CityForm";
import { CityList } from "./components/CityList";
import { FlightDetails } from "./components/flight/FlightDetails";
import { FlightForm } from "./components/flight/FlightForm";
import { FlightList } from "./components/FlightList";
import { Footer } from "./components/fragments/Footer";
import { Header } from "./components/fragments/Header";
import Navigation from "./components/fragments/Navigation";
import { MainContent } from "./components/other/MainContent";
import { PlaneList } from "./components/PlaneList";
import { PlaneDetails } from "./components/plane/PlaneDetails";
import { PlaneForm } from "./components/plane/PlaneForm";
import { UserList } from "./components/UserList";
import { UserDetails } from "./components/user/UserDetails";
import { UserForm } from "./components/user/UserForm";
import { LoginForm } from "./components/other/LoginForm";
import { getCurrentUser } from "./helpers/authHelper";
import { ProtectedRoutes } from "./components/other/ProtectedRoutes";

export const App = () => {
  const [state, setState] = React.useState({
    user: undefined,
    prevPath: "",
  });

  const handleLogin = (user) => {
    localStorage.setItem("user", user);
    setState({ ...state, user });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setState({ ...state, user: undefined });
  };

  React.useEffect(
    () => {
      const currentUser = getCurrentUser();
      setState({ ...state, user: currentUser });
    },

    // eslint-disable-next-line
    []
  );

  return (
    <Router>
      <>
        <Header />
        <Navigation handleLogout={handleLogout} />
        <Routes>
          <Route exact path="/" element={<MainContent />} />
          <Route
            exact
            path="/login"
            element={<LoginForm handleLogin={handleLogin} />}
          />
          <Route exact path="/cities" element={<CityList />} />
          <Route exact path="/flights" element={<FlightList />} />
          <Route exact path="/planes" element={<PlaneList />} />

          <Route element={<ProtectedRoutes />}>
            <Route
              exact
              path="/cities/details/:cityId"
              element={<CityDetails />}
            />
            <Route exact path="/cities/add" element={<CityForm />} />
            <Route exact path="/cities/edit/:cityId" element={<CityForm />} />
            <Route
              exact
              path="/flights/details/:flightId"
              element={<FlightDetails />}
            />
            <Route exact path="/flights/add" element={<FlightForm />} />
            <Route
              exact
              path="/flights/edit/:flightId"
              element={<FlightForm />}
            />
            <Route
              exact
              path="/planes/details/:planeId"
              element={<PlaneDetails />}
            />
            <Route exact path="/planes/add" element={<PlaneForm />} />
            <Route exact path="/planes/edit/:planeId" element={<PlaneForm />} />

            <Route exact path="/users" element={<UserList />} />
            <Route
              exact
              path="/users/details/:userId"
              element={<UserDetails />}
            />
            <Route exact path="/users/add" element={<UserForm />} />
            <Route exact path="/users/edit/:userId" element={<UserForm />} />
          </Route>
        </Routes>
        <Footer />
      </>
    </Router>
  );
};
