import * as React from "react";
import { useTranslation } from "react-i18next";
import { CityDetailsDataRow } from "./CityDetailsDataRow";

export const CityDetailsData = (props) => {
  const { t } = useTranslation();
  const { city } = props;

  return (
    <>
      <p>
        {t("city.fields.name")}: {city.name}
      </p>
      <p>
        {t("city.fields.code")}: {city.code}
      </p>
      {city.flights?.length ? (
        <>
          <h2>{t("city.form.flights")}</h2>
          <table className="table-list">
            <thead>
              <tr>
                <th>{t("flight.fields.number")}</th>
                <th>{t("flight.fields.date")}</th>
                <th>{t("flight.fields.comment")}</th>
              </tr>
            </thead>
            <tbody>
              {city.flights.map((flight) => (
                <CityDetailsDataRow key={flight._id} flight={flight} />
              ))}
            </tbody>
          </table>
        </>
      ) : null}
    </>
  );
};
