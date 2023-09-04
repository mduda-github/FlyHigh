import { getCurrentUser } from "../helpers/authHelper";

const flightsBaseUrl = "http://localhost:3000/api/flights";

export const getFlightsApiCall = () => {
  const promise = fetch(flightsBaseUrl);
  return promise;
};

export const getFlightByIdApiCall = (flightId) => {
  const url = `${flightsBaseUrl}/${flightId}`;
  const promise = fetch(url);
  return promise;
};

export const addFlightApiCall = (flight) => {
  const user = getCurrentUser();
  const flightString = JSON.stringify(flight);
  let token;

  if (user && user.token) {
    token = user.token;
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: flightString,
  };
  const promise = fetch(flightsBaseUrl, options);
  return promise;
};

export const updateFlightApiCall = (flightId, flight) => {
  const user = getCurrentUser();
  const url = `${flightsBaseUrl}/${flightId}`;
  const flightString = JSON.stringify(flight);
  let token;

  if (user && user.token) {
    token = user.token;
  }
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: flightString,
  };
  const promise = fetch(url, options);
  return promise;
};

export const deleteFlightApiCall = (flightId) => {
  const user = getCurrentUser();
  const url = `${flightsBaseUrl}/${flightId}`;
  let token;

  if (user && user.token) {
    token = user.token;
  }
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  const promise = fetch(url, options);
  return promise;
};
