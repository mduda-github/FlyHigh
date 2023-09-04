function validateForm() {
    const firstNameInput = document.getElementById("firstName");
    const lastNameInput = document.getElementById("lastName");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
  
    const errorFirstName = document.getElementById("errorFirstName");
    const errorLastName = document.getElementById("errorLastName");
    const errorEmail = document.getElementById("errorEmail");
    const errorPassword = document.getElementById("errorPassword");
    const errorsSummary = document.getElementById("errorsSummary");
  
    resetErrors([firstNameInput, lastNameInput, emailInput, passwordInput], [errorFirstName, errorLastName, errorEmail, errorPassword], errorsSummary);

    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const charLimit260Message = document.getElementById('errorMessage-charLimit260').innerText;
    const charLimit560Message = document.getElementById('errorMessage-charLimit560').innerText;
    const emailMessage = document.getElementById('errorMessage-email').innerText;
    const formMessage = document.getElementById('errorMessage-form').innerText;

    let valid = true;
  
    if (!checkRequired(firstNameInput.value)) {
      valid = false;
      firstNameInput.classList.add("error-input");
      errorFirstName.innerText = reqMessage;
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
      valid = false;
      firstNameInput.classList.add("error-input");
      errorFirstName.innerText = charLimit260Message;
    }

    if (!checkRequired(lastNameInput.value)) {
      valid = false;
      lastNameInput.classList.add("error-input");
      errorLastName.innerText = reqMessage;
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
      valid = false;
      lastNameInput.classList.add("error-input");
      errorLastName.innerText = charLimit260Message;
    }

    if (!checkRequired(emailInput.value)) {
      valid = false;
      emailInput.classList.add("error-input");
      errorEmail.innerText = reqMessage;
    } else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
      valid = false;
      emailInput.classList.add("error-input");
      errorEmail.innerText = charLimit560Message;
    } else if (!checkEmail(emailInput.value)) {
      valid = false;
      emailInput.classList.add("error-input");
      errorEmail.innerText = emailMessage;
    }
  
    if (!checkRequired(passwordInput.value)) {
      valid = false;
      passwordInput.classList.add("error-input");
      errorPassword.innerText = reqMessage;
    } else if (!checkTextLengthRange(passwordInput.value, 5, 60)) {
      valid = false;
      passwordInput.classList.add("error-input");
      errorPassword.innerText = charLimit560Message;
    }
  
    if (!valid) {
      errorsSummary.innerText = formMessage;
    }
  
    return valid;
  }
  