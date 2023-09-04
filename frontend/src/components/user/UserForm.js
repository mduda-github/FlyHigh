import * as React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  addUserApiCall,
  getUserByIdApiCall,
  updateUserApiCall,
} from "../../apiCalls/userApiCalls";
import {
  formMode,
  formValidationKeys,
  getValidationErrorKey,
} from "../../helpers/formHelper";
import {
  checkRequired,
  checkTextLengthRange,
  checkEmail,
} from "../../helpers/validationCommon";
import { FormButtons } from "../form/FormButtons";
import { FormInput } from "../form/FormInput";

export const UserForm = () => {
  const navigate = useNavigate();
  const { userId } = useParams();
  const { t } = useTranslation();
  const currentFormMode = userId ? formMode.EDIT : formMode.NEW;

  const [state, setState] = React.useState({
    user: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    error: null,
    errors: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    formMode: currentFormMode,
    redirect: false,
  });

  const fetchUserDetails = () => {
    getUserByIdApiCall(parseInt(userId))
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setState({
            ...state,
            user: null,
            message: data.message,
            isLoaded: true,
          });
        } else {
          setState({
            ...state,
            user: {
              firstName: data.firstName,
              lastName: data.lastName,
              email: data.email,
              password: "",
            },
            isLoaded: true,
          });
        }
      })
      .catch((error) =>
        setState({
          ...state,
          isLoaded: true,
          error,
        })
      );
  };

  const validateField = (fieldName, fieldValue) => {
    let errorMessage = "";
    if (fieldName === "firstName") {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
        errorMessage = formValidationKeys.len_2_60;
      }
    }
    if (fieldName === "lastName") {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
        errorMessage = formValidationKeys.len_2_60;
      }
    }
    if (fieldName === "email") {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      } else if (!checkEmail(fieldValue)) {
        errorMessage = formValidationKeys.email;
      }
    }
    if (fieldName === "password") {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      } else if (!checkTextLengthRange(fieldValue, 5, 60)) {
        errorMessage = formValidationKeys.len_5_60;
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
      user,
      errors,
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
      errors,
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
      const currentFormMode = state.formMode;

      let promise;
      let response;

      if (currentFormMode === formMode.NEW) {
        promise = addUserApiCall(user);
      } else if (currentFormMode === formMode.EDIT) {
        promise = updateUserApiCall(userId, user);
      }

      if (promise) {
        promise
          .then((data) => {
            response = data;
            if (response.status === 201 || response.status === 500) {
              return data.json();
            }
          })
          .then((data) => {
            if (!response.ok && response.status === 500) {
              for (const i in data.errors) {
                const errorItem = data.errors[i];
                const errorMessage = errorItem.message;
                const fieldName = errorItem.path;
                const errors = { ...state.errors };
                errors[fieldName] = errorMessage;
                setState({
                  ...state,
                  errors: errors,
                  error: null,
                });
              }
            } else {
              setState({
                ...state,
                redirect: true,
              });
            }
          })
          .catch((error) =>
            setState({
              ...state,
              error,
            })
          );
      }
    }
  };

  React.useEffect(() => {
    const currentFormMode = state.formMode;
    if (currentFormMode === formMode.EDIT) {
      fetchUserDetails();
    }
    // eslint-disable-next-line
  }, []);

  if (state.redirect) {
    const currentFormMode = state.formMode;
    const notice =
      currentFormMode === formMode.NEW
        ? t("user.list.userCreated")
        : t("user.list.userUpdated");

    return navigate("/users/", { state: { notice } });
  }

  const errorsSummary = hasErrors()
    ? t(getValidationErrorKey(formValidationKeys.form))
    : "";
  const fetchError = state.error
    ? `${t("user.list.error")}: ${state.error.message}`
    : "";
  const pageTitle =
    state.formMode === formMode.NEW
      ? t("user.form.add.pageTitle")
      : t("user.form.edit.pageTitle");

  const globalErrorMessage = errorsSummary || fetchError || state.message;

  return (
    <main>
      <h2>{pageTitle}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          label={t("user.fields.firstName")}
          required
          error={state.errors.firstName}
          name="firstName"
          placeholder={t("user.fields.firstNamePlaceholder")}
          onChange={handleChange}
          value={state.user.firstName}
        />
        <FormInput
          type="text"
          label={t("user.fields.lastName")}
          required
          error={state.errors.lastName}
          name="lastName"
          placeholder={t("user.fields.lastNamePlaceholder")}
          onChange={handleChange}
          value={state.user.lastName}
        />
        <FormInput
          type="text"
          label={t("user.fields.email")}
          required
          error={state.errors.email}
          name="email"
          placeholder={t("user.fields.emailPlaceholder")}
          onChange={handleChange}
          value={state.user.email}
        />
        <FormInput
          type="password"
          label={t("user.fields.password")}
          required
          error={state.errors.password}
          name="password"
          placeholder={t("user.fields.passwordPlaceholder")}
          onChange={handleChange}
          value={state.user.password}
        />
        <FormButtons
          currentFormMode={state.formMode}
          error={globalErrorMessage}
          cancelPath="/users"
        />
      </form>
    </main>
  );
};
