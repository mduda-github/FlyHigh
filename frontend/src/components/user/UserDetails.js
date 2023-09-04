import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useParams } from "react-router-dom";
import { getUserByIdApiCall } from "../../apiCalls/userApiCalls";
import { UserDetailsData } from "./UserDetailsData";

export const UserDetails = () => {
  const [state, setState] = React.useState({
    error: null,
    isLoaded: false,
    user: [],
    message: null,
  });
  const { userId } = useParams();
  const { t } = useTranslation();

  React.useEffect(() => {
    getUserByIdApiCall(parseInt(userId))
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setState({
            ...state,
            user: null,
            message: data.message,
            isLoaded: true,
          });
        } else {
          setState({
            ...state,
            user: data,
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

  const { user, error, isLoaded, message } = state;

  let content;

  if (error) {
    content = (
      <p>
        {t("user.list.error")}: {error.message}
      </p>
    );
  } else if (!isLoaded) {
    content = <p>{t("user.list.loading")}</p>;
  } else if (message) {
    content = <p>{message}</p>;
  } else {
    content = <UserDetailsData user={user} />;
  }

  return (
    <main>
      <h2>{t("user.form.details.pageTitle")}</h2>
      {content}
      <Link to="/users" className="button-back">
        {t("user.form.details.backBtnLabel")}
      </Link>
    </main>
  );
};
