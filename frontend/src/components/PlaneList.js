import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  deletePlaneApiCall,
  getPlanesApiCall,
} from "../apiCalls/planeApiCalls";
import { isAuthenticated } from "../helpers/authHelper";
import { PlaneListTable } from "./plane/PlaneListTable";

export const PlaneList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [state, setState] = React.useState({
    error: null,
    isLoaded: false,
    planes: [],
  });

  const fetchPlaneList = () => {
    getPlanesApiCall()
      .then((res) => res.json())
      .then((data) =>
        setState({
          isLoaded: true,
          planes: data,
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
    deletePlaneApiCall(id)
      .then(() => {
        navigate("/planes/", {
          state: { notice: t("plane.list.planeRemoved") },
        });
      })
      .then(() => fetchPlaneList());
  };

  React.useEffect(() => {
    fetchPlaneList();
  }, []);

  const { error, isLoaded, planes } = state;

  let content;

  if (error) {
    content = (
      <p>
        {t("plane.list.error")}: {error.message}
      </p>
    );
  } else if (!isLoaded) {
    content = <p>{t("plane.list.loading")}</p>;
  } else if (planes.length) {
    content = <PlaneListTable planes={planes} onDelete={onDelete} />;
  }

  return (
    <main>
      <h2>{t("plane.list.pageTitle")}</h2>
      {content}
      {isAuthenticated() ? (
        <>
          <p className="section-buttons">
            <Link to="/planes/add" className="button-add">
              {t("plane.list.addNew")}
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
