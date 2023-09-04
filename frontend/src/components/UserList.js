import * as React from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { deleteUserApiCall, getUsersApiCall } from "../apiCalls/userApiCalls";
import { UserListTable } from "./user/UserListTable";

export const UserList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [state, setState] = React.useState({
    error: null,
    isLoaded: false,
    users: [],
  });

  const fetchUserList = () => {
    getUsersApiCall()
      .then((res) => res.json())
      .then((data) =>
        setState({
          isLoaded: true,
          users: data,
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
    deleteUserApiCall(id)
      .then(() => {
        navigate("/users/", {
          state: { notice: t("user.list.userRemoved") },
        });
      })
      .then(() => fetchUserList());
  };

  React.useEffect(() => {
    fetchUserList();
  }, []);

  const { error, isLoaded, users } = state;

  let content;

  if (error) {
    content = (
      <p>
        {t("user.list.error")}: {error.message}
      </p>
    );
  } else if (!isLoaded) {
    content = <p>{t("user.list.loading")}</p>;
  } else if (users.length) {
    content = <UserListTable users={users} onDelete={onDelete} />;
  }

  return (
    <main>
      <h2>{t("user.list.pageTitle")}</h2>
      {content}
      <p className="section-buttons">
        <Link to="/users/add" className="button-add">
          {t("user.list.addNew")}
        </Link>
      </p>
      <p className={location.state?.notice ? "alert alert-in" : "alert"}>
        {location.state?.notice}
      </p>
    </main>
  );
};
