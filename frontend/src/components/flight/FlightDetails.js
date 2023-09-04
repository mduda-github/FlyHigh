import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { getFlightByIdApiCall } from "../../apiCalls/flightApiCalls";
import { FlightDetailsData } from "./FlightDetailsData";

export const FlightDetails = () => {
  const [state, setState] = React.useState({
    error: null,
    isLoaded: false,
    flight: null,
    message: null,
  });
  const { flightId } = useParams();
  const { t } = useTranslation();

  React.useEffect(() => {
    getFlightByIdApiCall(parseInt(flightId))
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setState({
            ...state,
            message: data.message,
            isLoaded: true,
          });
        } else {
          setState({
            ...state,
            flight: data,
            isLoaded: true,
          });
        }
      })
      .catch((error) =>
        setState({
          ...state,
          isLoaded: true,
          error,
        })
      );
    // eslint-disable-next-line
  }, []);

  const { flight, error, isLoaded, message } = state;

  let content;

  if (error) {
    content = (
      <p>
        {t("flight.list.error")}: {error.message}
      </p>
    );
  } else if (!isLoaded) {
    content = <p>{t("flight.list.loading")}</p>;
  } else if (message) {
    content = <p>{message}</p>;
  } else {
    content = <FlightDetailsData flight={flight} />;
  }

  return (
    <main>
      <h2>{t("flight.form.details.pageTitle")}</h2>
      {content}
      <Link to="/flights" className="button-back">
        {t("flight.form.details.backBtnLabel")}
      </Link>
    </main>
  );
};
