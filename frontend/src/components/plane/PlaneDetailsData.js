import * as React from "react";
import { useTranslation } from "react-i18next";
import { PlaneDetailsDataRow } from "./PlaneDetailsDataRow";

export const PlaneDetailsData = (props) => {
  const { plane } = props;
  const { t } = useTranslation();

  return (
    <>
      <p>
        {t("plane.fields.name")}: {plane.name}
      </p>
      <p>
        {t("plane.fields.seats")}: {plane.seats}
      </p>
      {plane.flights?.length ? (
        <>
          <h2>{t("plane.form.flights")}</h2>
          <table className="table-list">
            <thead>
              <tr>
                <th>{t("flight.fields.number")}</th>
                <th>{t("flight.fields.date")}</th>
                <th>{t("flight.fields.comment")}</th>
              </tr>
            </thead>
            <tbody>
              {plane.flights.map((flight) => (
                <PlaneDetailsDataRow key={flight._id} flight={flight} />
              ))}
            </tbody>
          </table>
        </>
      ) : null}
    </>
  );
};
