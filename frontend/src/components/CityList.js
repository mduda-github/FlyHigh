import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { deleteCityApiCall, getCitiesApiCall } from "../apiCalls/cityApiCalls";
import { isAuthenticated } from "../helpers/authHelper";
import { CityListTable } from "./city/CityListTable";

export const CityList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [state, setState] = React.useState({
    error: null,
    isLoaded: false,
    cities: [],
  });

  const fetchCityList = () => {
    getCitiesApiCall()
      .then((res) => res.json())
      .then((data) =>
        setState({
          isLoaded: true,
          cities: data,
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
    deleteCityApiCall(id)
      .then(() => {
        navigate("/cities/", {
          state: { notice: t("city.list.cityRemoved") },
        });
      })
      .then(() => fetchCityList());
  };

  React.useEffect(() => {
    fetchCityList();
  }, []);

  const { error, isLoaded, cities } = state;

  let content;

  if (error) {
    content = (
      <p>
        {t("city.list.error")}: {error.message}
      </p>
    );
  } else if (!isLoaded) {
    content = <p>{t("city.list.loading")}</p>;
  } else if (cities.length) {
    content = <CityListTable cities={cities} onDelete={onDelete} />;
  }

  return (
    <main>
      <h2>{t("city.list.pageTitle")}</h2>
      {content}
      {isAuthenticated() ? (
        <>
          <p className="section-buttons">
            <Link to="/cities/add" className="button-add">
              {t("city.list.addNew")}
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
