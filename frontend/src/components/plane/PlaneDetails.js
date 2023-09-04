import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { getPlaneByIdApiCall } from "../../apiCalls/planeApiCalls";
import { PlaneDetailsData } from "./PlaneDetailsData";

export const PlaneDetails = () => {
  const [state, setState] = React.useState({
    error: null,
    isLoaded: false,
    plane: [],
    message: null,
  });
  const { planeId } = useParams();
  const { t } = useTranslation();

  React.useEffect(() => {
    getPlaneByIdApiCall(parseInt(planeId))
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setState({
            ...state,
            plane: null,
            message: data.message,
            isLoaded: true,
          });
        } else {
          setState({
            ...state,
            plane: data,
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

  const { plane, error, isLoaded, message } = state;

  let content;

  if (error) {
    content = (
      <p>
        {t("plane.list.error")}: {error.message}
      </p>
    );
  } else if (!isLoaded) {
    content = <p>{t("plane.list.loading")}</p>;
  } else if (message) {
    content = <p>{message}</p>;
  } else {
    content = <PlaneDetailsData plane={plane} />;
  }

  return (
    <main>
      <h2>{t("plane.form.details.pageTitle")}</h2>
      {content}
      <Link to="/planes" className="button-back">
        {t("plane.form.details.backBtnLabel")}
      </Link>
    </main>
  );
};
