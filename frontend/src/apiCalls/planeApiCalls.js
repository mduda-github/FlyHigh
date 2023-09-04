import { getCurrentUser } from "../helpers/authHelper";
const planesBaseUrl = "http://localhost:3000/api/planes";

export const getPlanesApiCall = () => {
  const promise = fetch(planesBaseUrl);
  return promise;
};

export const getPlaneByIdApiCall = (planeId) => {
  const url = `${planesBaseUrl}/${planeId}`;
  const promise = fetch(url);
  return promise;
};

export const addPlaneApiCall = (plane) => {
  const user = getCurrentUser();
  const planeString = JSON.stringify(plane);
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
    body: planeString,
  };
  const promise = fetch(planesBaseUrl, options);
  return promise;
};

export const updatePlaneApiCall = (planeId, plane) => {
  const user = getCurrentUser();
  const url = `${planesBaseUrl}/${planeId}`;
  const planeString = JSON.stringify(plane);
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
    body: planeString,
  };
  const promise = fetch(url, options);
  return promise;
};

export const deletePlaneApiCall = (planeId) => {
  const user = getCurrentUser();
  const url = `${planesBaseUrl}/${planeId}`;
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
