import * as React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import {
  addPlaneApiCall,
  getPlaneByIdApiCall,
  updatePlaneApiCall,
} from "../../apiCalls/planeApiCalls";
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

export const PlaneForm = () => {
  const navigate = useNavigate();
  const { planeId } = useParams();
  const { t } = useTranslation();
  const currentFormMode = planeId ? formMode.EDIT : formMode.NEW;

  const [state, setState] = React.useState({
    plane: {
      name: "",
      seats: "",
    },
    error: null,
    errors: {
      name: "",
      seats: "",
    },
    formMode: currentFormMode,
    redirect: false,
  });

  const fetchPlaneDetails = () => {
    getPlaneByIdApiCall(parseInt(planeId))
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setState({
            ...state,
            plane: null,
            message: data.message,
            isLoaded: true,
          });
        } else {
          setState({
            ...state,
            plane: data,
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
    if (fieldName === "seats") {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      }
    }
    return errorMessage;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const plane = { ...state.plane };
    plane[name] = value;

    const errorMessage = validateField(name, value);
    const errors = { ...state.errors };
    errors[name] = errorMessage;

    setState({
      ...state,
      plane,
      errors,
    });
  };

  const validateForm = () => {
    const plane = state.plane;
    const errors = state.errors;
    for (const fieldName in plane) {
      const fieldValue = plane[fieldName];
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
      const plane = state.plane;
      const currentFormMode = state.formMode;

      let promise;
      let response;

      if (currentFormMode === formMode.NEW) {
        promise = addPlaneApiCall(plane);
      } else if (currentFormMode === formMode.EDIT) {
        promise = updatePlaneApiCall(planeId, plane);
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
      fetchPlaneDetails();
    }
    // eslint-disable-next-line
  }, []);

  if (state.redirect) {
    const currentFormMode = state.formMode;
    const notice =
      currentFormMode === formMode.NEW
        ? t("plane.list.planeCreated")
        : t("plane.list.planeUpdated");

    return navigate("/planes/", { state: { notice } });
  }

  const errorsSummary = hasErrors()
    ? t(getValidationErrorKey(formValidationKeys.form))
    : "";
  const fetchError = state.error
    ? `${t("plane.list.error")}: ${state.error.message}`
    : "";
  const pageTitle =
    state.formMode === formMode.NEW
      ? t("plane.form.add.pageTitle")
      : t("plane.form.edit.pageTitle");

  const globalErrorMessage = errorsSummary || fetchError || state.message;
  return (
    <main>
      <h2>{pageTitle}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          label={t("plane.fields.name")}
          required
          error={state.errors.name}
          name="name"
          placeholder={t("plane.fields.namePlaceholder")}
          onChange={handleChange}
          value={state.plane.name}
        />
        <FormInput
          type="number"
          label={t("plane.fields.seats")}
          required
          error={state.errors.seats}
          name="seats"
          onChange={handleChange}
          value={state.plane.seats}
        />

        <FormButtons
          currentFormMode={state.formMode}
          error={globalErrorMessage}
          cancelPath="/planes"
        />
      </form>
    </main>
  );
};
