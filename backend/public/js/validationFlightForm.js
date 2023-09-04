function validateForm() {
  const numberInput = document.getElementById("number");
  const dateInput = document.getElementById("date");
  const cityInput = document.getElementById("city_id");
  const planeInput = document.getElementById("plane_id");
  const commentInput = document.getElementById("comment");

  const errorNumber = document.getElementById("errorNumber");
  const errorDate = document.getElementById("errorDate");
  const errorCity = document.getElementById("errorCity");
  const errorPlane = document.getElementById("errorPlane");
  const errorComment = document.getElementById("errorComment");
  const errorsSummary = document.getElementById("errorsSummary");

  resetErrors(
    [numberInput, dateInput, cityInput, planeInput, commentInput],
    [errorNumber, errorDate, errorCity, errorPlane, errorComment],
    errorsSummary
  );

  const reqMessage = document.getElementById("errorMessage-required").innerText;
  const charLimit6Message = document.getElementById(
    "errorMessage-charLimit6"
  ).innerText;
  const dateFormatMessage = document.getElementById(
    "errorMessage-dateFormat"
  ).innerText;
  const dateMessage = document.getElementById("errorMessage-date").innerText;
  const formMessage = document.getElementById("errorMessage-form").innerText;

  let valid = true;

  if (!checkRequired(numberInput.value)) {
    valid = false;
    numberInput.classList.add("error-input");
    errorNumber.innerText = reqMessage;
  } else if (!checkTextLengthRange(numberInput.value, 6, 6)) {
    valid = false;
    numberInput.classList.add("error-input");
    errorNumber.innerText = charLimit6Message;
  }

  const nowString = getNowString();

  if (!checkRequired(dateInput.value)) {
    valid = false;
    dateInput.classList.add("error-input");
    errorDate.innerText = reqMessage;
  } else if (!checkDate(dateInput.value)) {
    valid = false;
    dateInput.classList.add("error-input");
    errorDate.innerText = dateFormatMessage;
  } else if (checkDateIfBefore(dateInput.value, nowString)) {
    valid = false;
    dateInput.classList.add("error-input");
    errorDate.innerText = dateMessage;
  }

  if (!checkRequired(cityInput.value)) {
    valid = false;
    cityInput.classList.add("error-input");
    errorCity.innerText = reqMessage;
  }

  if (!checkRequired(planeInput.value)) {
    valid = false;
    planeInput.classList.add("error-input");
    errorPlane.innerText = reqMessage;
  }

  if (!valid) {
    errorsSummary.innerText = formMessage;
  }

  return valid;
}
