import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  deleteFlightApiCall,
  getFlightsApiCall,
} from "../apiCalls/flightApiCalls";
import { FlightListTable } from "./flight/FlightListTable";
import { isAuthenticated } from "../helpers/authHelper";

export const FlightList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [state, setState] = React.useState({
    error: null,
    isLoaded: false,
    flights: [],
  });

  const fetchFlightList = () => {
    getFlightsApiCall()
      .then((res) => res.json())
      .then((data) =>
        setState({
          isLoaded: true,
          flights: data,
        })
      )
      .catch((error) =>
        setState({
          isLoaded: true,
          error,
        })
      );
  };

  const onDelete = (id) => {
    deleteFlightApiCall(id)
      .then(() => {
        navigate("/flights/", {
          state: { notice: t("flight.list.flightRemoved") },
        });
      })
      .then(() => fetchFlightList());
  };

  React.useEffect(() => {
    fetchFlightList();
  }, []);

  const { error, isLoaded, flights } = state;

  let content;

  if (error) {
    content = (
      <p>
        {t("flight.list.error")}: {error.message}
      </p>
    );
  } else if (!isLoaded) {
    content = <p>{t("flight.list.loading")}</p>;
  } else if (flights.length) {
    content = <FlightListTable flights={flights} onDelete={onDelete} />;
  }

  return (
    <main>
      <h2>{t("flight.list.pageTitle")}</h2>
      {content}
      {isAuthenticated() ? (
        <>
          <p className="section-buttons">
            <Link to="/flights/add" className="button-add">
              {t("flight.list.addNew")}
            </Link>
          </p>
          <p className={location.state?.notice ? "alert alert-in" : "alert"}>
            {location.state?.notice}
          </p>
        </>
      ) : null}
    </main>
  );
};
