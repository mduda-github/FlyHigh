import * as React from "react";
import { useTranslation } from "react-i18next";
import { isAuthenticated } from "../../helpers/authHelper";
import { PlaneListTableRow } from "./PlaneListTableRow";

export const PlaneListTable = (props) => {
  const { planes = [], onDelete } = props;
  const { t } = useTranslation();

  return (
    <table className="table-list">
      <thead>
        <tr>
          <th>{t("plane.fields.name")}</th>
          <th>{t("plane.fields.seats")}</th>
          {isAuthenticated() ? <th>{t("listActions.title")}</th> : null}
        </tr>
      </thead>
      <tbody>
        {planes.map((plane) => (
          <PlaneListTableRow
            plane={plane}
            key={plane._id}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};
