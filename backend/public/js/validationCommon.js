function resetErrors(inputs, errorTexts, errorInfo) {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].classList.remove("error-input");
  }
  for (let i = 0; i < errorTexts.length; i++) {
    errorTexts[i].innerText = "";
  }
  errorInfo.innerText = "";
}

function checkRequired(value) {
  if (!value) {
    return false;
  }

  value = value.toString().trim();

  if (value === "" || value === "none") {
    return false;
  }

  return true;
}

function checkTextLengthRange(value, min, max) {
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
}

function checkDate(value) {
  if (!value) {
    return false;
  }
  const pattern = /(\d{4})-(\d{2})-(\d{2})/;
  return pattern.test(value);
}

function checkDateIfBefore(value, compareTo) {
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
}

function getNowString() {
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
}

function checkEmail(value) {
  if (!value) {
    return false;
  }
  value = value.toString().trim();
  const regex =
  /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regex.test(value);
}
