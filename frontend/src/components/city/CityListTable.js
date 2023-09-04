import * as React from "react";
import { useTranslation } from "react-i18next";
import { isAuthenticated } from "../../helpers/authHelper";
import { CityListTableRow } from "./CityListTableRow";

export const CityListTable = (props) => {
  const { cities, onDelete } = props;
  const { t } = useTranslation();

  return (
    <table className="table-list">
      <thead>
        <tr>
          <th>{t("city.fields.name")}</th>
          <th>{t("city.fields.code")}</th>
          {isAuthenticated() ? <th>{t("listActions.title")}</th> : null}
        </tr>
      </thead>
      <tbody>
        {cities.map((city) => (
          <CityListTableRow city={city} key={city._id} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
};
