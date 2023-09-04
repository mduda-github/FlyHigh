import * as React from "react";
import { useTranslation } from "react-i18next";
import { getFormattedDate } from "../../helpers/dateHelper";

export const FlightDetailsData = (props) => {
  const { flight } = props;
  const { t } = useTranslation();

  return (
    <>
      <p>
        {t("flight.fields.number")}: {flight.number}
      </p>
      <p>
        {t("flight.fields.date")}: {getFormattedDate(flight.date)}
      </p>
      {flight.city ? (
        <p>
          {t("city.fields.name")}: {flight.city.name}
        </p>
      ) : null}
      {flight.plane ? (
        <p>
          {t("plane.fields.name")}: {flight.plane.name}
        </p>
      ) : null}
      {flight.comment ? (
        <p>
          {t("flight.fields.comment")}: {flight.comment}
        </p>
      ) : null}
    </>
  );
};
