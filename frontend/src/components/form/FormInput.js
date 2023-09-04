import * as React from "react";
import { useTranslation } from "react-i18next";
import { getValidationErrorKey } from "../../helpers/formHelper";

export const FormInput = (props) => {
  const { error, name, label, required, type, placeholder, value, onChange } =
    props;
  const { t } = useTranslation();
  const className = error !== "" ? "error-input" : "";
  const errorSpanId = "error" + name[0].toUpperCase() + name.slice(1);
  const translatedErrorMessage = error ? t(getValidationErrorKey(error)) : "";

  return (
    <>
      <label htmlFor={name}>
        {label}:
        {required && (
          <span className="symbol-required" aria-label="required">
            *
          </span>
        )}
      </label>
      <input
        type={type}
        className={className}
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <span id={errorSpanId} className="errors-text">
        {translatedErrorMessage}
      </span>
    </>
  );
};
