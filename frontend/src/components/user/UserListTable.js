import * as React from "react";
import { useTranslation } from "react-i18next";
import { UserListTableRow } from "./UserListTableRow";

export const UserListTable = (props) => {
  const { users = [], onDelete } = props;
  const { t } = useTranslation();

  return (
    <table className="table-list">
      <thead>
        <tr>
          <th>{t("user.fields.firstName")}</th>
          <th>{t("user.fields.lastName")}</th>
          <th>{t("user.fields.email")}</th>
          <th>{t("listActions.title")}</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <UserListTableRow user={user} key={user._id} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
};
