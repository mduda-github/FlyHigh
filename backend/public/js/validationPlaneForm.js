function validateForm() {
  const nameInput = document.getElementById("name");
  const seatsInput = document.getElementById("seats");

  const errorName = document.getElementById("errorName");
  const errorSeats = document.getElementById("errorSeats");
  const errorsSummary = document.getElementById("errorsSummary");

  resetErrors([nameInput, seatsInput], [errorName, errorSeats], errorsSummary);

  const reqMessage = document.getElementById('errorMessage-required').innerText;
  const charLimit260Message = document.getElementById('errorMessage-charLimit260').innerText;
  const formMessage = document.getElementById('errorMessage-form').innerText;

  let valid = true;

  if (!checkRequired(nameInput.value)) {
    valid = false;
    nameInput.classList.add("error-input");
    errorName.innerText = reqMessage;
  } else if (!checkTextLengthRange(nameInput.value, 2, 60)) {
    valid = false;
    nameInput.classList.add("error-input");
    errorName.innerText = charLimit260Message;
  }

  if (!checkRequired(seatsInput.value)) {
    valid = false;
    seatsInput.classList.add("error-input");
    errorSeats.innerText = reqMessage;
  }

  if (!valid) {
    errorsSummary.innerText = formMessage;
  }

  return valid;
}
