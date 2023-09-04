export const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const isAuthenticated = () => {
  const user = getCurrentUser();
  if (user) {
    return true;
  } else {
    return false;
  }
};
