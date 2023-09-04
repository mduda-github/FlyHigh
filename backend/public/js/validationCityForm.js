function validateForm() {
  const nameInput = document.getElementById("name");
  const codeInput = document.getElementById("code");

  const errorName = document.getElementById("errorName");
  const errorCode = document.getElementById("errorCode");
  const errorsSummary = document.getElementById("errorsSummary");

  resetErrors([nameInput, codeInput], [errorName, errorCode], errorsSummary);

  const reqMessage = document.getElementById('errorMessage-required').innerText;
  const charLimit260Message = document.getElementById('errorMessage-charLimit260').innerText;
  const charLimit3Message = document.getElementById('errorMessage-charLimit3').innerText;
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

  if (!checkRequired(codeInput.value)) {
    valid = false;
    codeInput.classList.add("error-input");
    errorCode.innerText = reqMessage;
  } else if (!checkTextLengthRange(codeInput.value, 3, 3)) {
    valid = false;
    codeInput.classList.add("error-input");
    errorCode.innerText = charLimit3Message;
  }

  if (!valid) {
    errorsSummary.innerText = formMessage;
  }

  return valid;
}
