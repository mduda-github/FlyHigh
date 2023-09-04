import { getCurrentUser } from "../helpers/authHelper";

const citiesBaseUrl = "http://localhost:3000/api/cities";

export const getCitiesApiCall = () => {
  const promise = fetch(citiesBaseUrl);
  return promise;
};

export const getCityByIdApiCall = (cityId) => {
  const url = `${citiesBaseUrl}/${cityId}`;
  const promise = fetch(url);
  return promise;
};

export const addCityApiCall = (city) => {
  const user = getCurrentUser();
  const cityString = JSON.stringify(city);
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
    body: cityString,
  };
  const promise = fetch(citiesBaseUrl, options);
  return promise;
};

export const updateCityApiCall = (cityId, city) => {
  const user = getCurrentUser();
  const url = `${citiesBaseUrl}/${cityId}`;
  const cityString = JSON.stringify(city);
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
    body: cityString,
  };
  const promise = fetch(url, options);
  return promise;
};

export const deleteCityApiCall = (cityId) => {
  const user = getCurrentUser();
  const url = `${citiesBaseUrl}/${cityId}`;
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
