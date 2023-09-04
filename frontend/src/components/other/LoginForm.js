import * as React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  formValidationKeys,
  getValidationErrorKey,
} from "../../helpers/formHelper";
import { checkRequired } from "../../helpers/validationCommon";
import { FormButtons } from "../form/FormButtons";
import { FormInput } from "../form/FormInput";
import { loginApiCall } from "../../apiCalls/authApiCalls";

export const LoginForm = (props) => {
  const { handleLogin } = props;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    user: {
      email: "",
      password: "",
    },
    errors: {
      email: "",
      password: "",
    },
    error: "",
    message: "",
    prevPath: "",
  });

  const validateField = (fieldName, fieldValue) => {
    let errorMessage = "";
    if (fieldName === "email") {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      }
    }
    if (fieldName === "password") {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      }
    }
    return errorMessage;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const user = { ...state.user };
    user[name] = value;

    const errorMessage = validateField(name, value);
    const errors = { ...state.errors };
    errors[name] = errorMessage;

    setState({
      ...state,
      user: user,
      errors: errors,
    });
  };

  const validateForm = () => {
    const user = state.user;
    const errors = state.errors;
    for (const fieldName in user) {
      const fieldValue = user[fieldName];
      const errorMessage = validateField(fieldName, fieldValue);
      errors[fieldName] = errorMessage;
    }
    setState({
      ...state,
      errors: errors,
    });

    return !hasErrors();
  };

  const hasErrors = () => {
    const errors = state.errors;

    for (const errorsField in state.errors) {
      if (errors[errorsField].length > 0) {
        return true;
      }
    }
    return false;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      const user = state.user;
      let response;

      loginApiCall(user)
        .then((res) => {
          response = res;
          return res.json();
        })
        .then((data) => {
          if (response.status === 200) {
            if (data.token) {
              const userString = JSON.stringify(data);
              handleLogin(userString);
              navigate("/");
            }
          } else if (response.status === 401) {
            setState({ ...state, message: data.message });
          }
        })
        .catch((error) =>
          setState({
            ...state,
            error: error,
          })
        );
    }
  };

  const errorsSummary = hasErrors()
    ? t(getValidationErrorKey(formValidationKeys.form))
    : "";
  const fetchError = state.error
    ? `${t("user.list.error")}: ${state.error.message}`
    : "";

  const globalErrorMessage =
    errorsSummary || fetchError || t(getValidationErrorKey(state.message));

  return (
    <main>
      <h2>{t("auth.pageTitle")}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="text"
          label={t("user.fields.email")}
          value={state.user.email}
          error={state.errors.email}
          onChange={handleChange}
        />
        <FormInput
          name="password"
          type="password"
          label={t("user.fields.password")}
          value={state.user.password}
          error={state.errors.password}
          onChange={handleChange}
        />
        <FormButtons
          cancelPath={state.prevPath}
          error={globalErrorMessage}
          submitButtonLabel={t("auth.loginBtnLabel")}
        />
      </form>
    </main>
  );
};
