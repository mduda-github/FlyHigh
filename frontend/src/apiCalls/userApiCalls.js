import { getCurrentUser } from "../helpers/authHelper";
const usersBaseUrl = "http://localhost:3000/api/users";

export const getUsersApiCall = () => {
  const promise = fetch(usersBaseUrl);
  return promise;
};

export const getUserByIdApiCall = (userId) => {
  const url = `${usersBaseUrl}/${userId}`;
  const promise = fetch(url);
  return promise;
};

export const addUserApiCall = (user) => {
  const currentUser = getCurrentUser();
  const userString = JSON.stringify(user);
  let token;

  if (currentUser && currentUser.token) {
    token = currentUser.token;
  }
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: userString,
  };
  const promise = fetch(usersBaseUrl, options);
  return promise;
};

export const updateUserApiCall = (userId, user) => {
  const currentUser = getCurrentUser();
  const url = `${usersBaseUrl}/${userId}`;
  const userString = JSON.stringify(user);
  let token;

  if (currentUser && currentUser.token) {
    token = currentUser.token;
  }
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: userString,
  };
  const promise = fetch(url, options);
  return promise;
};

export const deleteUserApiCall = (userId) => {
  const currentUser = getCurrentUser();
  const url = `${usersBaseUrl}/${userId}`;
  let token;

  if (currentUser && currentUser.token) {
    token = currentUser.token;
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
