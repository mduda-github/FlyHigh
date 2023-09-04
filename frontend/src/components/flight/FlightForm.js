import * as React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { getCitiesApiCall } from "../../apiCalls/cityApiCalls";
import { getPlanesApiCall } from "../../apiCalls/planeApiCalls";
import {
  addFlightApiCall,
  getFlightByIdApiCall,
  updateFlightApiCall,
} from "../../apiCalls/flightApiCalls";
import {
  formMode,
  formValidationKeys,
  getValidationErrorKey,
} from "../../helpers/formHelper";
import { FormInput } from "../form/FormInput";
import { FormSelect } from "../form/FormSelect";
import { FormTextarea } from "../form/FormTextarea";
import { FormButtons } from "../form/FormButtons";
import {
  checkDateIfBefore,
  checkRequired,
  checkTextLengthRange,
  getNowString,
} from "../../helpers/validationCommon";

export const FlightForm = () => {
  const navigate = useNavigate();
  const { flightId } = useParams();
  const { t } = useTranslation();
  const currentFormMode = flightId ? formMode.EDIT : formMode.NEW;
  const nowString = getNowString();

  const [state, setState] = React.useState({
    flight: {
      number: "",
      date: "",
      city_id: null,
      plane_id: null,
      comment: "",
    },
    error: null,
    errors: {
      number: "",
      date: "",
      city_id: "",
      plane_id: "",
      comment: "",
    },
    message: null,
    formMode: currentFormMode,
    redirect: false,
  });

  const [citiesState, setCitiesState] = React.useState({
    error: null,
    isLoaded: false,
    allCities: [],
  });

  const [planesState, setPlanesState] = React.useState({
    error: null,
    isLoaded: false,
    allPlanes: [],
  });

  const fetchFlightDetails = () => {
    getFlightByIdApiCall(parseInt(flightId))
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setState({
            ...state,
            flight: null,
            message: data.message,
            isLoaded: true,
          });
        } else {
          setState({
            ...state,
            flight: data,
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

  const fetchCitiesAndPlanesDetails = () => {
    getCitiesApiCall()
      .then((res) => res.json())
      .then((data) =>
        setCitiesState({
          ...citiesState,
          isLoaded: true,
          allCities: data,
        })
      )
      .catch((error) =>
        setCitiesState({ ...citiesState, isLoaded: true, error })
      )
      .then(() => getPlanesApiCall())
      .then((res) => res.json())
      .then((data) =>
        setPlanesState({
          ...planesState,
          isLoaded: true,
          allPlanes: data,
        })
      )
      .catch((error) =>
        setPlanesState({ ...planesState, isLoaded: true, error })
      );
  };

  const validateField = (fieldName, fieldValue) => {
    let errorMessage = "";
    if (fieldName === "number") {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      } else if (!checkTextLengthRange(fieldValue, 6, 6)) {
        errorMessage = formValidationKeys.len_6;
      }
    }
    if (fieldName === "date") {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      } else if (checkDateIfBefore(fieldValue, nowString)) {
        errorMessage = formValidationKeys.date;
      }
    }
    if (fieldName === "city_id" || fieldName === "plane_id") {
      if (!checkRequired(fieldValue)) {
        errorMessage = formValidationKeys.notEmpty;
      }
    }
    return errorMessage;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const flight = { ...state.flight };
    flight[name] = value;

    const errorMessage = validateField(name, value);
    const errors = { ...state.errors };
    errors[name] = errorMessage;

    setState({
      ...state,
      flight,
      errors,
    });
  };

  const validateForm = () => {
    const flight = state.flight;
    const errors = state.errors;
    for (const fieldName in flight) {
      const fieldValue = flight[fieldName];
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
      const flight = state.flight;
      const currentFormMode = state.formMode;

      let promise;
      let response;

      if (currentFormMode === formMode.NEW) {
        promise = addFlightApiCall(flight);
      } else if (currentFormMode === formMode.EDIT) {
        promise = updateFlightApiCall(flightId, flight);
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
      fetchFlightDetails();
    }
    fetchCitiesAndPlanesDetails();
    // eslint-disable-next-line
  }, []);

  if (state.redirect) {
    const currentFormMode = state.formMode;
    const notice =
      currentFormMode === formMode.NEW
        ? t("flight.list.flightCreated")
        : t("flight.list.flightUpdated");

    return navigate("/flights/", { state: { notice } });
  }

  const { allCities = [] } = citiesState;
  const { allPlanes = [] } = planesState;
  const errorsSummary = hasErrors()
    ? t(getValidationErrorKey(formValidationKeys.form))
    : "";
  const fetchError = state.error
    ? `${t("flight.list.error")}: ${state.error.message}`
    : "";
  const pageTitle =
    state.formMode === formMode.NEW
      ? t("flight.form.add.pageTitle")
      : t("flight.form.edit.pageTitle");

  const globalErrorMessage = errorsSummary || fetchError || state.message;
  const formattedDate =
    currentFormMode === formMode.EDIT
      ? state.flight.date.slice(0, -8)
      : state.flight.date;
  return (
    <main>
      <h2>{pageTitle}</h2>
      <form className="form" onSubmit={handleSubmit}>
        <FormInput
          type="text"
          label={t("flight.fields.number")}
          required
          error={state.errors.number}
          name="number"
          placeholder={t("flight.fields.numberPlaceholder")}
          onChange={handleChange}
          value={state.flight.number}
        />
        <FormInput
          type="datetime-local"
          label={t("flight.fields.date")}
          required
          error={state.errors.date}
          name="date"
          onChange={handleChange}
          value={formattedDate}
        />

        <FormSelect
          name="city_id"
          label={t("flight.fields.city")}
          required
          options={allCities}
          value={state.flight?.city_id}
          error={state.errors.city_id}
          onChange={handleChange}
        />

        <FormSelect
          name="plane_id"
          label={t("flight.fields.plane")}
          required
          options={allPlanes}
          value={state.flight?.plane_id}
          error={state.errors.plane_id}
          onChange={handleChange}
        />

        <FormTextarea
          name="comment"
          label={t("flight.fields.comment")}
          value={state.flight.comment}
          onChange={handleChange}
        />

        <FormButtons
          currentFormMode={state.formMode}
          error={globalErrorMessage}
          cancelPath="/flights"
        />
      </form>
    </main>
  );
};
