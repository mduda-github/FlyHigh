import * as React from "react";
import { useTranslation } from "react-i18next";
import { isAuthenticated } from "../../helpers/authHelper";
import { FlightListTableRow } from "./FlightListTableRow";

export const FlightListTable = (props) => {
  const { flights, onDelete } = props;
  const { t } = useTranslation();

  return (
    <table className="table-list">
      <thead>
        <tr>
          <th>{t("flight.fields.number")}</th>
          <th>{t("flight.fields.date")}</th>
          <th>{t("flight.fields.comment")}</th>
          {isAuthenticated() ? <th>{t("listActions.title")}</th> : null}
        </tr>
      </thead>
      <tbody>
        {flights.map((flight) => (
          <FlightListTableRow
            flight={flight}
            key={flight._id}
            onDelete={onDelete}
          />
        ))}
      </tbody>
    </table>
  );
};
