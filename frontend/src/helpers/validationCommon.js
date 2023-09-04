/* eslint-disable no-useless-escape */
export const checkRequired = (value) => {
  if (!value) {
    return false;
  }

  value = value.toString().trim();

  if (value === "" || value === "none") {
    return false;
  }

  return true;
};

export const checkTextLengthRange = (value, min, max) => {
  if (!value) {
    return false;
  }
  value = value.toString().trim();
  const length = value.length;

  if (max && length > max) {
    return false;
  }

  if (min && length < min) {
    return false;
  }

  return true;
};

export const checkDateIfBefore = (value, compareTo) => {
  if (!value || !compareTo) {
    return false;
  }
  const pattern = /(\d{4})-(\d{2})-(\d{2})/;
  if (!pattern.test(value) || !pattern.test(compareTo)) {
    return false;
  }
  const valueDate = new Date(value);
  const compareToDate = new Date(compareTo);
  if (valueDate.getTime() >= compareToDate.getTime()) {
    return false;
  }
  return true;
};

export const checkEmail = (value) => {
  if (!value) {
    return false;
  }
  value = value.toString().trim();
  const regex =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regex.test(value);
};

export const getNowString = () => {
  let nowDate = new Date(),
    month = "" + (nowDate.getMonth() + 1),
    day = "" + nowDate.getDate(),
    year = nowDate.getFullYear();

  if (month.length < 2) {
    month = "0" + month;
  }
  if (day.length < 2) {
    day = "0" + day;
  }

  return [year, month, day].join("-");
};
