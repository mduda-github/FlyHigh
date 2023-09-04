import * as React from "react";
import { getFormattedDate } from "../../helpers/dateHelper";

export const PlaneDetailsDataRow = (props) => {
  const { flight } = props;

  return (
    <tr>
      <td>{flight.number}</td>
      <td>{getFormattedDate(flight.date)}</td>
      <td>{flight.comment}</td>
    </tr>
  );
};
