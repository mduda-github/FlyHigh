import * as React from "react";
import { useTranslation } from "react-i18next";
import { getValidationErrorKey } from "../../helpers/formHelper";

export const FormSelect = (props) => {
  const { error, name, label, required, options = [], value, onChange } = props;
  const { t } = useTranslation();
  const className = error !== "" ? "error-input" : "";
  const errorSpanId = "error" + name[0].toUpperCase() + name.slice(1);
  const translatedErrorMessage = error ? t(getValidationErrorKey(error)) : "";

  return (
    <>
      <label htmlFor={name}>
        {label}: {required && <span className="symbol-required">*</span>}
      </label>
      <select
        name={name}
        id={name}
        className={className}
        value={value}
        onChange={onChange}
      >
        <option value="none" key="none">
          -- {label} --
        </option>
        {options.map((option) => (
          <option
            value={option._id}
            label={option.name}
            key={option._id}
          ></option>
        ))}
      </select>
      <span id={errorSpanId} className="errors-text">
        {translatedErrorMessage}
      </span>
    </>
  );
};
