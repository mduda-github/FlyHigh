import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { getCityByIdApiCall } from "../../apiCalls/cityApiCalls";
import { CityDetailsData } from "./CityDetailsData";

export const CityDetails = () => {
  const { t } = useTranslation();
  const [state, setState] = React.useState({
    error: null,
    isLoaded: false,
    city: [],
    message: null,
  });
  const { cityId } = useParams();

  React.useEffect(() => {
    getCityByIdApiCall(parseInt(cityId))
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setState({
            ...state,
            city: null,
            message: data.message,
            isLoaded: true,
          });
        } else {
          setState({
            ...state,
            city: data,
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

  const { city, error, isLoaded, message } = state;

  let content;

  if (error) {
    content = (
      <p>
        {t("city.list.error")}: {error.message}
      </p>
    );
  } else if (!isLoaded) {
    content = <p>{t("city.list.loading")}</p>;
  } else if (message) {
    content = <p>{message}</p>;
  } else {
    content = <CityDetailsData city={city} />;
  }

  return (
    <main>
      <h2>{t("city.form.details.pageTitle")}</h2>
      {content}
      <Link to="/cities" className="button-back">
        {t("city.form.details.backBtnLabel")}
      </Link>
    </main>
  );
};
