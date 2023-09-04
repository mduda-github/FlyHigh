import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  addCityApiCall,
  getCityByIdApiCall,
  updateCityApiCall,
} from "../../apiCalls/cityApiCalls";
import {
  formMode,
  formValidationKeys,
  getValidationErrorKey,
} from "../../helpers/formHelper";
import {
  checkRequired,
  checkTextLengthRange,
} from "../../helpers/validationCommon";
import { FormButtons } from "../form/FormButtons";
import { FormInput } from "../form/FormInput";

export const CityForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { cityId } = useParams();
  const currentFormMode = cityId ? formMode.EDIT : formMode.NEW;

  const [state, setState] = React.useState({
    city: {
      name: "",
      code: "",
    },
    error: null,
    errors: {
      name: "",
      code: "",
    },
    formMode: currentFormMode,
    redirect: false,
  });

  const fetchCityDetails = () => {
    getCityByIdApiCall(parseInt(cityId))
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setState({
            ...state,
            city: null,
            message: data.message,
            isLoaded: true,
          });
        } else {
          setState({
            ...state,
            city: data,
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
    if (fieldName === "name") {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      } else if (!checkTextLengthRange(fieldValue, 2, 60)) {
        errorMessage = formValidationKeys.len_2_60;
      }
    }
    if (fieldName === "code") {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      } else if (!checkTextLengthRange(fieldValue, 3, 3)) {
        errorMessage = formValidationKeys.len_3;
      }
    }
    return errorMessage;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const city = { ...state.city };
    city[name] = value;

    const errorMessage = validateField(name, value);
    const errors = { ...state.errors };
    errors[name] = errorMessage;

    setState({
      ...state,
      city,
      errors,
    });
  };

  const validateForm = () => {
    const city = state.city;
    const errors = state.errors;
    for (const fieldName in city) {
      const fieldValue = city[fieldName];
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
      const city = state.city;
      const currentFormMode = state.formMode;

      let promise;
      let response;

      if (currentFormMode === formMode.NEW) {
        promise = addCityApiCall(city);
      } else if (currentFormMode === formMode.EDIT) {
        promise = updateCityApiCall(cityId, city);
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
      fetchCityDetails();
    }
    // eslint-disable-next-line
  }, []);

  if (state.redirect) {
    const currentFormMode = state.formMode;
    const notice =
      currentFormMode === formMode.NEW
        ? t("city.list.cityCreated")
        : t("city.list.cityUpdated");

    return navigate("/cities/", { state: { notice } });
  }

  const errorsSummary = hasErrors()
    ? t(getValidationErrorKey(formValidationKeys.form))
    : "";
  const fetchError = state.error
    ? `${t("city.list.error")} : ${state.error.message}`
    : "";
  const pageTitle =
    state.formMode === formMode.NEW
      ? t("city.form.add.pageTitle")
      : t("city.form.edit.pageTitle");

  const globalErrorMessage =
    errorsSummary ||
    fetchError ||
    (state.message ? t(getValidationErrorKey(state.message)) : "");
  return (
    <main>
      <h2>{pageTitle}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          label={t("city.fields.name")}
          required
          error={state.errors.name}
          name="name"
          placeholder={t("city.fields.namePlaceholder")}
          onChange={handleChange}
          value={state.city.name}
        />
        <FormInput
          type="text"
          label={t("city.fields.code")}
          required
          error={state.errors.code}
          name="code"
          placeholder={t("city.fields.codePlaceholder")}
          onChange={handleChange}
          value={state.city.code}
        />

        <FormButtons
          currentFormMode={state.formMode}
          error={globalErrorMessage}
          cancelPath="/cities"
        />
      </form>
    </main>
  );
};
